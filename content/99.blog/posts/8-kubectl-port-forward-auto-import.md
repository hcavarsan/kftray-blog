---
layout: post
title:  Local Kubernetes Cluster with Automatic kubectl port-forward configurations
description: Learn how to dynamically create kubectl port forwarding configurations based on Kubernetes service annotations using Terraform and Kind.
image:  https://cdn.hashnode.com/res/hashnode/image/upload/v1727747211110/30b8b4ff-38f5-4f56-a3e6-ef5df4766c7f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp
timestamp: 1727821428

author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---


Hello. In this post, I'll show you how to set up a local Kubernetes cluster using Kind, Terraform, and Kftray. We'll keep all services inside the cluster, avoiding the need for ingress controllers or exposing services like NodePort or LoadBalancer. I'll also walk you through the Terraform code used in this setup.

Terraform code used in this Blog Post: https://github.com/hcavarsan/kftray-k8s-tf-example



<br/>

<br/>

<div style="text-align: center; margin-top: 20px">
<img src="https://raw.githubusercontent.com/hcavarsan/kftray-blog/175ab7b009619f33dd5224f10e110bd5d55c0504/public/img/auto-import.gif" alt="Kftray Image"alt="Kftray Image" style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.8); border-radius: 10px " />
</div>


<br/>

<br/>

## Why Keep Services Inside the Cluster?

Exposing services externally can add complexity and potential security risks. For local development or secure environments, it's often better to keep everything internal. By using `kubectl port-forward` and automating it with Kftray, we can access services running inside the cluster without exposing them to the outside world.

## Tools You'll Need

Before starting, make sure you have the following installed:

* [Docker](https://www.docker.com/get-started)

* [Terraform (v1.9.5)](https://www.terraform.io/downloads.html)

* [Kftray](https://github.com/hcavarsan/kftray) (you can choose between the GUI or TUI version)


## Cloning the Repository

First, clone the repository that contains the Terraform code:

```bash
git clone https://github.com/hcavarsan/kftray-k8s-tf-example
cd kftray-k8s-tf-example/terraform
```

## Understanding the Terraform Code

The Terraform code in this repository automates the following:

* Creates a Kind Kubernetes cluster.

* Deploys Helm charts for Argo CD, Prometheus, Alertmanager, Grafana, and Jaeger.

* Sets up service annotations for Kftray to auto-import port-forward configurations.


### Project Structure

Here's how the project is organized:

```
kftray-k8s-tf-example
├── terraform
│   ├── helm.tf
│   ├── outputs.tf
│   ├── locals.tf
│   ├── providers.tf
│   ├── variables.tf
│   ├── templates
│   │   ├── argocd-values.yaml.tpl
│   │   ├── grafana-values.yaml.tpl
│   │   ├── jaeger-values.yaml.tpl
│   │   └── prometheus-values.yaml.tpl
│   └── kind.tf
├── Makefile
├── docs
│   ├── kftray.gif
│   └── kftui.gif
└── README.md
```

### providers.tf

This file specifies the Terraform providers we'll use:

```hcl
terraform {
  required_version = ">= 1.0.0"

  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "0.4.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
    template = {
      source  = "hashicorp/template"
      version = ">= 2.0.0"
    }
  }
}

provider "kind" {
}

provider "kubernetes" {
  config_path = kind_cluster.default.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = kind_cluster.default.kubeconfig_path
  }
}
```

* **kind**: Manages Kind clusters.

* **kubernetes**: Interacts with the Kubernetes cluster.

* **helm**: Deploys Helm charts.

* **template**: Processes template files.


### variables.tf

Defines variables used in the Terraform configuration:

```hcl
variable "cluster_name" {
  description = "Name of the Kind cluster"
  type        = string
  default     = "kftray-cluster"
}

variable "kubernetes_version" {
  description = "Version of the Kind node image"
  type        = string
  default     = "v1.30.4"
}

variable "kubeconfig_dir" {
  description = "Directory to store the kubeconfig file"
  type        = string
  default     = "~/.kube"
}

# Chart versions
variable "argocd_chart_version" {
  description = "Version of the Argo CD Helm chart"
  type        = string
  default     = "5.19.12"
}

variable "prometheus_chart_version" {
  description = "The version of the Prometheus chart to deploy."
  type        = string
  default     = "25.27.0"
}

variable "grafana_chart_version" {
  description = "The version of the Grafana chart to deploy."
  type        = string
  default     = "8.5.0"
}

variable "jaeger_chart_version" {
  description = "The version of the Jaeger chart to deploy."
  type        = string
  default     = "3.3.1"
}
```

### kind.tf

Creates the Kind cluster:

```hcl
resource "kind_cluster" "default" {
  name            = var.cluster_name
  node_image      = "kindest/node:${var.kubernetes_version}"
  kubeconfig_path = pathexpand("${var.kubeconfig_dir}/kind-config-${var.cluster_name}")
  wait_for_ready  = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"

      extra_port_mappings {
        container_port = 80
        host_port      = 80
        protocol       = "TCP"
      }
    }

    node {
      role = "worker"
    }
  }
}
```

* **name**: Cluster name.

* **node\_image**: Kubernetes version.

* **kubeconfig\_path**: Where to store the kubeconfig file.

* **wait\_for\_ready**: Wait until the cluster is ready.

* **kind\_config**: Custom Kind configuration.


### locals.tf

Defines local variables and service configurations:

```hcl
locals {
  services = {
    argocd = {
      namespace  = "argocd"
      repository = "https://argoproj.github.io/argo-helm"
      chart      = "argo-cd"
      version    = var.argocd_chart_version
      kftray = {
        server = {
          alias       = "argocd"
          local_port  = "16080"
          target_port = "http"
        }
      }
    }
    # ... other services ...
  }

  services_values = {
    for service_name, service in local.services :
    service_name => templatefile("${path.module}/templates/${service_name}-values.yaml.tpl", {
      kftray = service.kftray
    })
  }
}
```

* **services**: A map of services to deploy.

* **kftray**: Port-forward configurations for Kftray.

* **services\_values**: Processes Helm values templates for each service.


### helm.tf

Deploys the services using Helm:

```hcl
resource "helm_release" "services" {
  depends_on = [kind_cluster.default]
  for_each         = local.services
  name             = each.key
  namespace        = each.value.namespace
  create_namespace = true
  repository       = each.value.repository
  chart            = each.value.chart
  version          = each.value.version

  values = [
    local.services_values[each.key]
  ]
}
```

* **for\_each**: Iterates over each service.

* **name**: Release name.

* **namespace**: Kubernetes namespace.

* **repository**: Helm chart repository.

* **chart**: Helm chart name.

* **version**: Chart version.

* **values**: Custom values for the Helm chart.


### templates/

Contains Helm values templates for each service (e.g., `argocd-values.yaml.tpl`). These templates inject the Kftray annotations into the service definitions.

### outputs.tf

Defines outputs for the Terraform run:

```hcl
output "endpoint" {
  description = "API endpoint for the Kind cluster."
  value       = kind_cluster.default.endpoint
}

output "kubeconfig" {
  description = "Kubeconfig file for the Kind cluster."
  value       = kind_cluster.default.kubeconfig
  sensitive   = true
}

output "credentials" {
  description = "Credentials for authenticating with the Kind cluster."
  value = {
    client_certificate     = kind_cluster.default.client_certificate
    client_key             = kind_cluster.default.client_key
    cluster_ca_certificate = kind_cluster.default.cluster_ca_certificate
  }
  sensitive = true
}
```

## Applying the Terraform Configuration

To apply the Terraform configuration and set up the cluster, run:

```bash
make apply
```

This will:

* Initialize Terraform.

* Create the Kind cluster.

* Deploy the Helm charts.

* Set up the service annotations.


## Installing Kftray

Go to the [Kftray GitHub page](https://github.com/hcavarsan/kftray) and follow the installation instructions for your operating system.

## Importing Port-Forward Configurations into Kftray

### Using Kftray GUI

1. Open Kftray and click the tray icon to open the main window.

2. Click the menu icon at the bottom left corner.

3. Select "Auto Import."

4. Click "Set kubeconfig" and choose the kubeconfig file created by Terraform (usually `~/.kube/kind-config-kftray-cluster`).

5. Select the context `kftray-cluster` from the dropdown menu.

6. Click "Import" to load the port-forward settings.


![Kftray Banner](https://raw.githubusercontent.com/hcavarsan/kftray-k8s-tf-example/refs/heads/main/docs/kftray.gif align="left")

After importing, you can start port forwarding by toggling the switch next to each service or by clicking "Start All."

### Using Kftui (Terminal Interface)

1. Set the `KUBECONFIG` environment variable:

    ```bash
    export KUBECONFIG="~/.kube/kind-config-kftray-cluster"
    ```

2. Start Kftui:

    ```bash
    kftui
    ```

3. Press `Tab` to access the top menu and select "Auto Import."

4. Press `Ctrl+A` to select all configurations.

5. Press `F` to start all port forwards.


![kftui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pj66296vgfaalg960mkk.gif align="left")

## Accessing Your Services Locally

With port forwarding set up, you can access your services on your local machine:

* **Argo CD**: [http://localhost:16080](http://localhost:16080)

* **Prometheus**: [http://localhost:19090](http://localhost:19090)

* **Alertmanager**: [http://localhost:19093](http://localhost:19093)

* **Grafana**: [http://localhost:13080](http://localhost:13080)

* **Jaeger**: [http://localhost:15090](http://localhost:15090)


## Custom Kftray Settings

### Adjusting Kftray Port Forwarding Settings

To customize how Kftray forwards ports, edit the `locals.tf` file:

```hcl
locals {
  services = {
    argocd = {
      kftray = {
        server = {
          alias       = "argocd"
          local_port  = "16080"
          target_port = "http"
        }
      }
    }
    # Other services...
  }
}
```

* **alias**: The name displayed in Kftray.

* **local\_port**: The port on your machine to access the service.

* **target\_port**: The service's port or port name inside the cluster.


## Cleaning Up

If you want to destroy the cluster and remove all resources, run:

```bash
make destroy
```

This will tear down the cluster and delete all the resources created by Terraform.

## Conclusion

By keeping all services inside the cluster and using Kftray for port forwarding, we create a simpler and more secure environment. This setup is useful for local development and situations where you want to avoid exposing services externally.

Feel free to explore and modify the Terraform code to suit your needs. If you have any questions or need help, feel free to reach out.

Thanks for reading. You can find more of my work or get in touch on [GitHub](https://github.com/hcavarsan).
