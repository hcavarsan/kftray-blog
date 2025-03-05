---
layout: post
title: Debugging Kubernetes Services with KFtray's HTTP Logs and VS Code REST Client Extension
description: Learn how to debug Kubernetes services using KFtray's HTTP logging with VS Code's REST Client extension to capture and replay requests.
image: img/blog-http-logs-vscode.png
timestamp: 1741196172
author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan
published: true
---


If you've worked with Kubernetes, you already know the debugging headaches it can cause. But what makes it particularly difficult?

First, there's the distributed architecture. Your applications run across multiple nodes and namespaces, with traffic flowing through various system layers.

Second, environments constantly change. Pods start, stop, and reschedule themselves. Configuration changes happen frequently.

And production environments? They add a whole new level of complexity. Issues often manifest differently in production due to scale, load, or configuration variations. Security policies typically restrict direct access to services.

Have you ever found a bug in development that behaves completely differently in production? You're not alone.

## Common Debugging Options for Kubernetes

Most developers rely on a few standard approaches when debugging Kubernetes services. Each has its strengths—and limitations.

### Manual Request Tools

Tools like Postman, Insomnia, and curl let you test endpoints directly. They're useful for simple tests, but they come with constraints:

* Each request must be manually created
* They can't capture live traffic patterns
* You often need multiple tools during a debugging session

These tools work well in controlled situations but may fall short when dealing with complex, real-world traffic patterns.

### Proxy-Based Solutions

Proxy tools like Charles Proxy and mitmproxy provide deeper traffic visibility. But there's more to it:

* Certificate management can be complex
* Workflow integration isn't always smooth
* They sometimes capture too much traffic

While useful, these tools often feel disconnected from your development environment, requiring constant context switching.

### Network Analysis Tools

Low-level tools like Wireshark offer comprehensive traffic inspection but generally provide more information than needed:

* They have a steep learning curve
* The level of detail can be overwhelming
* They lack application context

These tools are great at network-level debugging but can make application-level analysis more complex than necessary.

## An Alternative Approach with KFtray HTTP Logging

I've found that KFtray offers an approach to Kubernetes debugging by adding HTTP traffic logging capabilities to standard port-forwarding.

It functions as a proxy layer that:

* Records HTTP traffic through port-forwards
* Maintains standard port-forward functionality
* Integrates with existing development workflows

This approach provides additional visibility into service interactions while using familiar port-forwarding mechanics.

You might be asking yourself: "How does this actually work with VS Code?" That's what i'll explore next.

## How KFtray's HTTP Logging Works

When you enable HTTP logging for a port-forward configuration in KFtray, a series of events unfolds:


<Mermaid>
sequenceDiagram
    participant Client
    participant KFtray as KFtray
    participant Service as K8s Service
    Client->>KFtray: HTTP Request
    KFtray->>Service: Forward Request
    Note over KFtray: Log Request
    Service->>KFtray: HTTP Response
    Note over KFtray: Log Response
    KFtray->>Client: Return Response
</Mermaid>


1. Start a port forward with http logging option enabled
2. The app itself captures incoming HTTP requests
3. Requests are forwarded to your Kubernetes service
4. Responses are captured on their return journey
5. Complete request-response pairs are logged with correlation IDs

This process enables traffic capture without requiring application changes or additional debugging tools.

And these logs are formatted in a way that works seamlessly with VS Code.

## Setting Up HTTP Logging in KFtray

Setting up HTTP logging in KFtray is an simple process that begins with downloading and installing KFtray v0.16.1 or later from the [GitHub releases page](https://github.com/hcavarsan/kftray/releases). Once you have KFtray installed, you'll need to configure your port-forward settings.

![Adding Config](/img/adding-config.gif)

Start by launching KFtray and creating a new port-forward configuration. You'll need to specify your Kubernetes environment details, including your desired context and the namespace where your service runs. Make sure to enter the correct service name – this is the Kubernetes service you want to monitor.

Next, configure your port settings. The local port is where you'll access the service on your machine, while the remote port is where the service runs in your Kubernetes cluster. Give your configuration a descriptive name that helps you identify it easily later. This name will be particularly helpful when you're managing multiple port-forwards.

With your configuration in place, enable the port-forward by toggling the switch in the KFtray interface. Then, click the menu icon next to your port-forward configuration and enable HTTP logging. This simple step activates the logging feature for your selected port-forward.

![Enable HTTP Logging](/img/enable-http-logs.gif)

KFtray will now automatically capture all HTTP traffic flowing through your port-forward. The logs are saved to `$HOME/.kftray/http_logs/`, and each log file is named using your configuration ID and local port for easy reference.

Now that you have logging set up, let's explore what makes these logs particularly valuable for debugging and development.

## Understanding the HTTP Log Format

The HTTP logs generated by KFtray are structured in a specific format that's compatible with VS Code's REST Client extension. Each entry contains complete details about the HTTP interaction:

> curl 'http://127.0.0.1:8787/gzip' --compressed -H 'User-Agent: Test'

![HTTP Log Format Example](/img/http-logs.png)

```
# ----------------------------------------
# Trace ID: 651bc5a5-fb13-46ec-b471-473f08a1f828
# Request at: 2025-03-05T16:56:00.076606+00:00
GET /gzip HTTP/1.1
Host: 127.0.0.1:8787
Accept: */*
Accept-Encoding: deflate, gzip
User-Agent: Test

#<empty body>

###

# ----------------------------------------
# Trace ID: 651bc5a5-fb13-46ec-b471-473f08a1f828
# Response at: 2025-03-05T16:56:00.079206+00:00
# Took: 2 ms
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Encoding: gzip
Content-Length: 150
Content-Type: application/json; encoding=utf-8
Date: Wed, 05 Mar 2025 16:56:00 GMT


{
  "headers": {
    "Accept": [
      "*/*"
    ],
    "Accept-Encoding": [
      "deflate, gzip"
    ],
    "Host": [
      "127.0.0.1:8787"
    ],
    "User-Agent": [
      "Test"
    ]
  },
  "origin": "127.0.0.1:56846",
  "gzipped": true
}

```

The log format includes several key components:

* **Trace ID**: Each request-response pair shares a unique identifier
* **Timestamps and Duration**: Useful for identifying performance issues
* **Complete HTTP Details**: Includes headers, status codes, and body content

This format is what makes the logs directly usable with VS Code's REST Client.

## Integrating with VS Code REST Client

The REST Client extension for VS Code is a powerful tool for testing HTTP requests. When combined with KFtray's logs, it creates a workflow for debugging Kubernetes services.

![HTTP Log demo](/img/http-logs-vscode.gif)

To use this integration:

-  Install the REST Client extension from the VS Code marketplace
-  Open a KFtray-generated log file in VS Code
-  The extension automatically recognizes HTTP requests in the file
-  Use the "Send Request" button to replay any captured request

```
Note: You can modify parameters, headers, or body content before replaying a request,
making it easy to test different scenarios.
```

```
Note: This approach works alongside existing debugging tools rather than replacing them.
It can complement your current development workflow.
```

This integration allows you to conduct debugging within your code editor, potentially reducing the need to switch between multiple tools.

## How can it help?

Here are some common scenarios in which these tools can be useful.

### Diagnosing Intermittent API Errors

Production services sometimes experience sporadic errors that are difficult to reproduce. This approach can help:

-  Enable HTTP logging for the service's port-forward
-  Monitor the application until the error occurs
-  Review the HTTP logs for failing requests:

```
# ----------------------------------------
# Trace ID: 5525d312-5582-46ad-85d1-0fd3710f824e
# Response at: 2025-03-01T15:34:09.901304+00:00
# Took: 144 ms
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to connect to database",
  "code": "DB_CONNECTION_ERROR"
}
```

-  Use VS Code REST Client to replay the exact request to verify the error pattern

This method can help make intermittent failures more reproducible and easier to debug.

### Tracking Microservice Communication


Microservice architectures create complex communication patterns that can be difficult to visualize. HTTP logging helps by capturing traffic across multiple service port-forwards, recording complete request and response cycles, maintaining trace ID correlation across services, and providing timing data for each interaction. This visibility can help identify communication patterns and potential areas for optimization.

### Troubleshooting Authentication Flows

Authentication systems typically involve multiple steps of token exchange and validation. With HTTP logging, you can:

* Record complete authentication request sequences
* Preserve header information and token data
* Replay requests with modified parameters
* Maintain the full context of authentication flows

All that being said, the real value comes from how these tools fit into your existing development workflow.



## Conclusion

Combining KFtray's HTTP logging with VS Code's REST Client extension offers an additional option for debugging Kubernetes services. This approach provides a way to capture and replay HTTP traffic that can simplify some debugging scenarios.

The format compatibility between KFtray's logs and VS Code REST Client creates a workflow that includes:

* Capturing service interactions with context
* Documenting intermittent issues
* Providing request replay capabilities
* Supplementing existing debugging approaches

i believe this combination of tools could be helpful in certain Kubernetes debugging scenarios. i'm curious to see how you might apply this approach to your own debugging challenges.

If you're interested in exploring this further, you can find more information on the [KFtray GitHub repository](https://github.com/hcavarsan/kftray).

Feedback and contributions are welcome.

