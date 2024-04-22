---
layout: post
title: Kubernetes Debugging - How to Handle Multiple kubectl port-forward from Your Tray
description: KFTray is an open-source system tray application designed to simplify Kubernetes debugging by centralizing port forwards in an intuitive interface, improving developer productivity and workflow efficiency.
image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z0ukb3ufk23w8ik0k3xk.png
timestamp: 1713727759

author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---


As a developer working with Kubernetes, I often find myself with multiple port-forward open sessions to debug pods across namespaces. Keeping track of all those terminals can get chaotic quickly. To help streamline my debugging workflow, I created an open-source tool called KFTray that centralizes all your port forwards in a system tray. In this post, I demonstrate how can save developer time by comparing workflows with and without it.

##  The Pain of Kubernetes Debugging with Kubectl Port Forward

As an SRE, one of my primary responsibilities is debugging Kubernetes applications and infrastructure. The go-to tool for debugging pods in Kubernetes is kubectl port-forward. However, this utility has several limitations that often make the debugging process tedious and frustrating.

- **Lack of Auto-Reconnect for Unstable Connections**
The kubectl port-forward command does not automatically reconnect if the connection is interrupted for any reason. This means if there is an issue with the network or Kubernetes API server, the port forward will stop working, and I have to manually restart it. For debugging unstable applications, this missing feature results in a poor experience and loss of productivity.

- **No UDP Support**
Kubectl port-forward only supports TCP and does not natively support UDP. Many applications rely on UDP, so without support for UDP forwarding, debugging them is very difficult. We often have to modify applications to use TCP instead of UDP just for debugging purposes, which is far from ideal.

- **Single Pod Forwarding Only**
The kubectl port-forward command can only forward ports for a single pod at a time. When debugging complex, multi-pod applications, this means I frequently have to open multiple terminal tabs to port forward to each pod individually. This process is tedious, difficult to manage, and negatively impacts productivity during debugging sessions.

- **Difficulty Keeping Configurations in Sync**
On our team, we have port forwarding configurations defined in a shared Git repository so we can standardize them across projects. However, with kubectl, the only way to use these shared configurations is to manually download them and run them locally. This makes it difficult to keep everyone's configurations in sync and up-to-date.

## Introducing KFtray: A Developer Tool for Kubernetes
As a developer working with Kubernetes, managing multiple port forwards for debugging applications can quickly become tedious and time-consuming. To simplify this process, I created KFtray, an open-source system tray application that provides a user-friendly interface for handling Kubernetes port forwarding.

- **Simplified Port Forward Management**
KFtray allows developers to easily start, stop, and manage multiple port forwarding configurations simultaneously through an intuitive interface. Users can save configurations locally or sync them with a GitHub repository for team collaboration. KFtray automatically restarts pods as needed to maintain service continuity in the event of pod failure, improving reliability.

- **Customized Configuration**
Developers can customize KFtray to use a specified local IP address instead of the default localhost for port forwarding. They can also enable TCP/UDP proxy forwarding through Kubernetes for additional flexibility. KFtray uses each operating system's keyring to securely store confidential information like API keys.

- **Staying Up-to-Date with Git Synchronization**
For teams collaborating on Kubernetes applications, keeping port forwarding configurations in sync can be challenging. KFtray addresses this through an optional Git synchronization feature. Developers can connect KFtray to a GitHub repository containing their port forwarding configurations. KFtray will then automatically pull the latest configurations from that repository on an adjustable polling schedule.

- **Improved Productivity**
By simplifying the management of Kubernetes port forwarding, KFtray aims to make developers more productive. No longer do they have to manually restart pods or switch between multiple terminal windows to handle port forwarding. KFtray provides a single interface to control all their port forwarding needs.


- **Keep your configurations updated with Github Sync**
KFtray allows developers to easily store and manage port forward configurations from local files or GitHub repositories. This means users can save a configuration once and reload it whenever needed, reducing repetitive work. Developers can also share configurations with team members by committing them to a GitHub repo.

- **Simultaneous Port Forwards**
A key pain point KFtray solves is the ability to run multiple port forwards simultaneously. Without a tool like KFtray, developers have to manually run each port forward separately in their terminal. KFtray handles running all port forwards in the background, freeing up the developer’s terminal. This is especially useful when debugging microservice-based applications that have many component services.

- **Convenient System Tray**
KFtray runs in the system tray, providing an easy way to manage all port forwards in one place. From the system tray menu, developers can start, stop, restart or remove port forwards. KFtray also displays the status of each port forward, indicating if it is running or stopped. This convenient UI enhances productivity by giving developers quick access to manage and monitor their port forwards.




## A Case Study: Debugging Microservices With and Without KFtray

As a developer focused on building microservices, I found the debugging process to be tedious and time-consuming. Each microservice has its own deployment, necessitating a separate port forward for debugging. Without an efficient tool to manage multiple port forwards, significant time was lost setting up and keeping configurations up to date.

- **The Situation Before**

Prior to using KFtray, I had to manually run a `kubectl port-forward` command for each microservice I wanted to debug. If a pod restarted, the port forward would need to be re-established, causing further delays. When code was updated, the port forward configurations had to be manually updated to match, requiring diligent version control. Overall, managing the debugging infrastructure for microservices was inefficient and distracting.

- **A New Approach**

KFtray simplified the debugging workflow by allowing me to define port forward configurations for each microservice in a central repository. With a single click, KFtray establishes all required port forwards, freeing me to focus on debugging my code. KFtray automatically reconnects port forwards when pods restart, and stays up-to-date with configuration changes through Git version control.

## Get Started

### Installation

KFtray is available for macOS and Linux users via Homebrew, and directly from the GitHub releases page for other systems. Here's how you can get started:

**For macOS and Linux:**

```bash

brew tap hcavarsan/kftray

brew install --HEAD kftray
```

For other systems, visit the [GitHub releases page](https://github.com/hcavarsan/kftray/releases) for downloadable binaries.

## Configuring Your First Port Forward

In a few simple steps, you can configure your first port forward:

1.  **Launch the application**
2.  **Open the configuration panel from the tray icon**
3.  **Add a new configuration:**

    *   Give it a unique alias and set if you want to set the alias as domain to your forward
    *    Indicate if the configuration is for a port forward for a service (common use) or a proxy (port forward to an endpoint via a Kubernetes cluster).
    *   Specify the Kubernetes context
    *   Define the namespace housing your service
    *   Enter the service name
    *   Choose TCP or UDP
    *   Set the local and remote port numbers
    *   Configure a custom local IP address (optional)

4. **Activate Your Configuration**: With your configuration saved, simply click on the switch button in the main menu to start the port forward in a single por forward or in Start All to start all configurations at the same time .

Demonstration:

::card-grid
  :video-player{src="https://www.youtube.com/watch?v=nqEhmcKeCc4"}
::


## Export configurations to a JSON file

1.  Open the main menu in the footer
2.  Select the `Export Local File` option
3.  Choose a file name and location to save the JSON file
4.  The JSON file will contain all your current configurations

You can then import this JSON file at any time to restore your configurations.

Example Json configuration File:

```json
[
 {
  "service": "argocd-server",
  "namespace": "argocd",
  "local_port": 8888,
  "remote_port": 8080,
  "context": "test-cluster",
  "workload_type": "service",
  "protocol": "tcp",
  "remote_address": "",
  "local_address": "127.0.0.1",
  "alias": "argocd",
  "domain_enabled": true
 }
]
```



## Sharing the configurations through Git

now, with the local json saved, you can share your configurations with your team members by committing the JSON file to a Github repository. This allows for easy collaboration and synchronization of KFtray configurations across your team.

To import and sync your github configs in kftray:

1.  Open the application's main menu
2.  Select the button with github icon in the footer menu
4.  Enter the URL of your Git repository and path containing the JSON file
5.  If your GitHub repository is private, you will need to enter the private token. Credentials are securely saved in the SO keyring (Keychain on macOS). Kftray does not store or save credentials in any local file; they are only stored in the local keyring.
6.  Select the polling time for when Kftray will synchronize configurations and retrieve them from GitHub.

7.  KFtray will now sync with the Git repository to automatically import any new configurations or changes committed to the JSON file.

This allows you to quickly deploy any port forward changes to all team members. And if someone on your team adds a new configuration, it will be automatically synced to everyone else's KFtray.

::card-grid
  :video-player{src="https://www.youtube.com/watch?v=BAdL7IzaEh8"}
::



## Share Your Thoughts: Help Us Enhance KFtray with Your Feedback!

We hope our app makes your work easier. Any ideas for improvement? We’re all ears!

Star us on [Github](https://github.com/hcavarsan/kftray) ⭐

Kftray Website: [https://kftray.app](https://kftray.app)
