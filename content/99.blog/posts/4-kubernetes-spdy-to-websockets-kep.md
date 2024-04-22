---
layout: post
title: Port Forward Transition from SPDY to WebSockets in Kubernetes 1.30
description: One of the changes in the latest Kubernetes version, 1.30 (Uwubnetes) is the migration from SPDY to websocket for some of the `kubectl` commands. Most of the updates get most of the attention, but this is no less important.
image: /img/4-kubernetes-to-websockets-kep.webp
timestamp: 1713829843

author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---

## Introduction

One of the changes in the latest Kubernetes version, 1.30 (Uwubnetes) is the migration from SPDY to websocket for some of the `kubectl` commands. Most of the updates get most of the attention, but this is no less important.


## Understanding SPDY:

Google created SPDY to improve HTTP by speeding up webpage load times and enhancing security with a session layer. It allowed multiple data streams to be sent simultaneously, prioritized request values, and optimized communication by compressing headers. However, SPDY was deprecated in 2016 and replaced by HTTP/2, which is more advanced. Therefore, for technologies like Kubernetes that require better and standards communication methods, SPDY is no longer relevant.

## Why WebSockets?

WebSockets use a bidirectional communication protocol over a single TCP connection, widely supported in web servers, proxies, and network gateways. This increases compatibility and communication performance for `kubectl` commands. Here are some points about WebSockets:

-  WebSockets allow for full-duplex communication, so it's very efficient to send and receive data. It requires no multiple connections, that would require handshakes.
-  This technology reduces overhead and allows for high-speed data exchanges, which is especially interesting for Kubernetes-related tasks.
-  WebSockets are protocol-independent so they may be used for communication over any full-duplex single-connection protocol, which will reduce latency and help in real-time command execution.
-  WebSockets keep a persistent connection and thus use resources more efficiently and cut the number of TCP connections used, in turn reducing the amount of network overhead.
-  The use of WebSockets fix issues that older protocols like SPDY had, and it's more compatible with modern web technologies.

The migration from SPDY to WebSockets in Kubernetes makes it much easier to communicate control messages, which will allow for better cluster management and stability.


## Kep 4006

The SPDY protocol was deprecated in 2016. In 2023, a proposal was opened in the Kubernetes community to change the protocol for commands like port-forward, attach, exec, and portforward that use upgraded connections.

[Link to proposal](https://github.com/kubernetes/enhancements/issues/4006)
[Link to issue](https://opengraph.githubassets.com/1/kubernetes/enhancements/issues/4006)

### Implementation Overview:

WebSocket support in Kubernetes and kubectl starts with an HTTP handshake that upgrades the connection to a WebSocket, like as the SPDY. The WebSocket framing method provides improved technique for data framing for streams such as stdin, stdout, and stderr through framing with a channel identifier. This is an extension of the technique once used by SPDY through binary data framing.

As a fallback mechanism in case WebSocket support is not available on the server, a fallback to SPDY is utilized. The initial performance assessments demonstrated that WebSocket is as efficient as, or even a little better than, SPDY for standard kubectl operations, and continuing performance testing is intended to better performance across multiple use cases. There are many implications from this transition, including greater network compatibility in settings where strong proxy and firewall policies are in place, and better integration with external tools.

### API server changes:
The API server now supports the WebSocket protocol by replacing SPDY with explicit headers to enable bidirectional streams. Additionally, the `StreamTranslatorProxy` has been added to help create WebSocket connections from clients to internal SPDY connections in Kubernetes.

The management of WebSocket frames is critical, especially for the occasional use of the ping/pong frames to keep the WebSocket connection alive. This feature was first introduced in an alpha version that one could use through the feature gate for port forwarding Websockets within the API server and a corresponding flag in `kubectl`.

### Client (`kubectl`) Changes:

On the client side, it added an upgrade to WebSocket for port forwarding, along with signing, response processing, and  data serialization and deserialization over the WebSocket. This gives the user the ability to enable WebSocket port forwarding  through environment variables. To make this transition easy, kubectl has also introduced mechanisms to handle errors and reliability, with error handling during its alpha and beta phases, along with a fallback to SPDY in case the WebSocket connection fails to ensure that service continuity is not lost.



## Websockets in `kubectl port-forward` with Kind


### Setup Env

Before creating my environment, Docker, Kind, and Go have to be installed on the machine. All of these are needed for developing and deploying our Kubernetes cluster on our local machines. Let's set up the environment with Kubernetes 1.30.

Let's start by setting up the necessary environment variables and dependencies:

```bash
# Set Go environment variables
export GOPATH=$HOME/go
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

# Create a directory for Kubernetes source
mkdir -p $GOPATH/src/k8s.io
cd $GOPATH/src/k8s.io

# Clone the Kubernetes repository
git clone https://github.com/kubernetes/kubernetes.git
cd kubernetes
```

#### Install Dependencies on Mac M1

For those uses Mac with an M1 chip:

```bash
brew install bash
brew install gnu-tar
```

#### Building the kubernetes and kubectl 1.30 image

To build the images and kubectl, we need to have Go 1.22 or later. Then, execute some commands:

```bash
# Checkout to the Kubernetes 1.30 release
git checkout release-1.30

# Build a node image using Kind
kind build node-image

# Build the kubectl in this version
make kubectl KUBE_BUILD_PLATFORMS=darwin/arm64

# kubectl artifact output path : $GOPATH/kubernetes/_output/dockerized/bin/darwin/arm64/kubectl
chmod +x $GOPATH/kubernetes/_output/dockerized/bin/darwin/arm64/kubectl
```

#### Kind Cluster Configs

First, set up the kind cluster with 1.30 images by creating a `config.yaml` file with featureGates `PortForwardWebsockets` enabled:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
featureGates:
  "PortForwardWebsockets": true
nodes:
- role: control-plane
  image: kindest/node:latest
- role: worker
  image: kindest/node:latest
- role: worker
  image: kindest/node:latest
```
#### Create the cluster

When you have your configuration file set up you can add the cluster with the following command:

```bash
# Change default kubeconfig path to have only with kind test cluster
export KUBECONFIG=~/.kube/kind-kind
kind create cluster --name kind-1-30 --config config.yaml
```

### Deploy a sample app

You can test your new WebSocket capability by deploying a simple application and using the cluster to connect by port forwarding:

```bash
git clone https://github.com/digitalocean/kubernetes-sample-apps.git
cd kubernetes-sample-apps
kubectl apply -k bookinfo-example/kustomize
```

#### Forward the Port Using WebSockets

Enable the WebSocket port forwarding :

```bash
export KUBECTL_PORT_FORWARD_WEBSOCKETS="true"
$GOPATH/kubernetes/_output/dockerized/bin/darwin/arm64/kubectl -v6 port-forward svc/productpage -n bookinfo 9080:9080
```

Now, open `http://localhost:9080/` in your browser. You should get responses from the echoserver.

### Verifying WebSocket Port Forwarding

To confirm if WebSocket port forwarding is active, review the kubectl logs:


**This is the log with SDPY (default):**

```
I0422 17:32:50.963059   11299 round_trippers.go:466] curl -v -XPOST  -H "X-Stream-Protocol-Version: portforward.k8s.io" -H "User-Agent: kubectl/v1.31.0 (darwin/arm64) kubernetes/cae35db" 'https://192.168.68.109:6443/api/v1/namespaces/bookinfo/pods/productpage-v1-64c658687d-5bhsg/portforward'
I0422 17:32:50.965663   11299 round_trippers.go:510] HTTP Trace: Dial to tcp:192.168.68.109:6443 succeed
I0422 17:32:50.978422   11299 round_trippers.go:553] POST https://192.168.68.109:6443/api/v1/namespaces/bookinfo/pods/productpage-v1-64c658687d-5bhsg/portforward 101 Switching Protocols in 15 milliseconds
I0422 17:32:50.978440   11299 round_trippers.go:570] HTTP Statistics: DNSLookup 0 ms Dial 2 ms TLSHandshake 0 ms Duration 15 ms
I0422 17:32:50.978444   11299 round_trippers.go:577] Response Headers:
I0422 17:32:50.978448   11299 round_trippers.go:580]     Upgrade: SPDY/3.1
I0422 17:32:50.978450   11299 round_trippers.go:580]     X-Stream-Protocol-Version: portforward.k8s.io
I0422 17:32:50.978453   11299 round_trippers.go:580]     Connection: Upgrade
```

**This is the logs with Websocket enabled:**

```
17:29:21.504179    7561 tunneling_dialer.go:75] Before WebSocket Upgrade Connection...
I0422 17:29:21.504194    7561 round_trippers.go:466] curl -v -XGET  -H "Sec-Websocket-Protocol: SPDY/3.1+portforward.k8s.io" -H "User-Agent: kubectl/v1.31.0 (darwin/arm64) kubernetes/cae35db" 'https://192.168.68.109:6443/api/v1/namespaces/bookinfo/pods/productpage-v1-64c658687d-5bhsg/portforward'
I0422 17:29:21.506351    7561 round_trippers.go:510] HTTP Trace: Dial to tcp:192.168.68.109:6443 succeed
I0422 17:29:21.519936    7561 round_trippers.go:553] GET https://192.168.68.109:6443/api/v1/namespaces/bookinfo/pods/productpage-v1-64c658687d-5bhsg/portforward 101 Switching Protocols in 15 milliseconds
I0422 17:29:21.519954    7561 round_trippers.go:570] HTTP Statistics: DNSLookup 0 ms Dial 2 ms TLSHandshake 4 ms ServerProcessing 8 ms Duration 15 ms
I0422 17:29:21.519958    7561 round_trippers.go:577] Response Headers:
I0422 17:29:21.519962    7561 round_trippers.go:580]     Sec-Websocket-Accept: +AqmlgtoGPP/Rlfw6oAZMCN34SY=
I0422 17:29:21.519964    7561 round_trippers.go:580]     Sec-Websocket-Protocol: SPDY/3.1+portforward.k8s.io
I0422 17:29:21.519966    7561 round_trippers.go:580]     Upgrade: websocket
I0422 17:29:21.519968    7561 round_trippers.go:580]     Connection: Upgrade
I0422 17:29:21.519973    7561 tunneling_dialer.go:85] negotiated protocol: portforward.k8s.io
```

The logs show that the protocol upgrade to SPDY via WebSocket was successful in Kubernetes 1.30

### KEP Roadmap Port Forward over Websockets

**Alpha Release (Kubernetes 1.30):**

WebSocket support added. Feature enabled via the `KUBECTL_PORT_FORWARD_WEBSOCKETS=true` env var on the client side and  `PortForwardWebsockets` alpha feature flag should be enabled on the API Server,.

Focus in the alpha phase would be testing from all perspectives, user feedback, and updating developer and user documentation for this alpha feature.

**Beta Release(Target 1.31):**

More extensive testing for performance fine-tuning, user feedback, and updated documentation, the documentation will be updated regularly with the changes during the beta phase improvements.

User community feedback will be the basis in making the feature stable and usable.

**Stable Release (Target 1.32):**

Ensure WebSocket support transitions from beta to stable with alpha feature flags removed and publish a deprecation notice to officially mark the transition away from SPDY-based port forwarding.


### KEP Roadmap RemoteCommand over websockets (exec, cp, attach)

**Beta release (Kubernetes 1.30):**

WebSocket for `RemoteCommand` (exec, cp, attach) will be on by default. The feature gates to the client and server are expected to ensure that the SPDY replacement has as little impact on the user as possible.

The biggest emphasis here is on making the changes transparent to the user and, for those who are wary of this new implementation, will always have the choice to disable it.

**Path to Stability:**

Post 1.30 and leading up to the 1.32 release, the focus will be on refinement in WebSocket functionality, all aimed at reaching zero known critical bugs.


## Conclusion

And thats all, folks. This hopefully explains the important protocol communication change in Kubernetes. I've had too many issues due to SPDY and lack of compatibility with new load balancers, proxies, etc., which was so complicated that I found myself at work. Now I see this migration from SPDY to WebSockets, so I'm a bit excited.

Looking forward, I'll let you know if there are any updates about this KEP

Also, maybe there'll be errors or misinformation in this post; I'm just human after all. Feel free to let me know if you find anything off on social media or post a comment here at the blog. Thanks!
