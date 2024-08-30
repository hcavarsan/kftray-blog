---
layout: post
title: Introducing KFtui - a new terminal-based user interface for managing your port forwarding configurations.
description: the new terminal-based user interface for managing your port forwarding configurations.
image: /img/ss-blog.png
timestamp: 1723866843

author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---

Hi all! This blog post announces the release of KFtray v0.13.0, and with it, the new tool KFtui. It's a terminal user interface This allows easy configuration of your port-forwarding settings. Let's dive in to see what's all about.

![Complete Diagram](/img/ss-blog.png)


## Why a TUI?

Built KFtui for a resource-friendly and more accessible alternative to Graphical User Interfaces (GUIs). Compared to these, terminal user interfaces (TUIs)  consume fewer system resource . That's the reason they fit better in headless service requirements. Besides that, you can access TUIs via SSH, without the necessity of a monitor for this. Also, very often, maintaining a frontend codebase is more complex and time-consuming than having all of it in one language, which simplifies development and maintenance.

## Installation

Before you get started, make sure you have `curl` or `wget` installed. If you're on Windows, you'll need PowerShell.

For Unix-like systems (Linux, macOS, WSL), you can install KFtui using either `curl` or `wget`. Here's how:

Using `curl`:

```sh
bash <(curl -s https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)
```

Using `wget`:

```sh
bash <(wget -qO- https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.sh)
```

For Windows users, run this PowerShell command:

```powershell
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/hcavarsan/kftray/main/hacks/kftui_installer.ps1'))
```

After installing, restart your terminal and check if it worked by running:

```sh
kftui
```


## Usage Guide

To get started with KFtui, open your terminal and type `kftui` to launch the app.

Right now, KFtui doesn't support adding configurations directly from the TUI. We're working on it! For now, you can create a JSON file and import it using the `i` hotkey. Here's what the JSON file should look like:

```json
{
  "service": "productpage",
  "namespace": "bookinfo",
  "local_port": 9080,
  "remote_port": 9080,
  "context": "kind-kind-rc-version",
  "workload_type": "service",
  "protocol": "tcp",
  "alias": "bookinfo",
  "domain_enabled": true
}
```

also, you can open the Kftray app to add configurations through its interface or set up synchronization with GitHub. Any configurations added in Kftray will also be available in KFtui, as they share the same state base (sqllite).

Save your JSON file, open KFtui, and press `i` to import it.

Once your configuration is imported, navigate to the list of configurations. Select the ones you want to start by pressing the `space` key (you can also select all configurations by pressing `Ctrl + A`.), and then start the selected configurations by pressing `f`.

to stop them, follow the same steps but select them in the "Stopping Configs" window. You can switch between windows using the left and right arrow keys.

You can also export your current configurations to a JSON file. Open KFtui, press `e`, choose where to save the JSON file, and press `Enter`. Type the file name and you're good to go. The JSON file will have all your current configurations.

KFtui has a bunch of commands to help you manage your configurations:

| Command       | Description                          |
|---------------|--------------------------------------|
| `Ctrl+C`      | Quit the app                         |
| `↑/↓`         | Navigate through the list            |
| `←/→`         | Switch between tables                |
| `f`           | Start/stop configurations            |
| `Space`       | Select/deselect a configuration      |
| `Ctrl+A`      | Select/deselect all configurations   |
| `h`           | Show the help section                |
| `i`           | Import configurations from a JSON file |
| `e`           | Export configurations to a JSON file |
| `d`           | Delete selected configurations       |
| `Tab`         | Switch focus between menu and table  |
| `Enter`       | Select a menu item                   |
| `c`           | Clear the output                     |


## Feature Comparison

Here's a quick comparison of features between KFtray and KFtui:

| Feature                        | KFtray Desktop App | KFtui          |
|--------------------------------|--------------------|----------------|
| TCP/UDP Forwarding             | Yes                | Yes            |
| Proxy Forwarding               | Yes                | Yes            |
| Configuration Import/Export    | Yes                | Yes            |
| JSON Configuration File Support| Yes                | Yes            |
| SSH Accessibility              | No                 | Yes            |
| Real-time Logs                 | Yes                | Coming Soon         |
| Advanced UI Elements           | Yes                | No             |
| Direct Configuration Editing   | Yes                | Coming Soon    |

## Limitations and Missing Features

KFtui is still in beta (maybe even alpha), so there are some limitations and missing features compared to the full KFtray desktop app. Right now, you can't add or edit configurations directly from the TUI, but I'm working on it. Some elements and visualizations from the desktop app aren't in KFtui. Real-time log viewing and HTTP trace logging features are not implemented yet. I'm also refining the TUI for a better user experience.

I'm actively working on these features and improvements. Your feedback is super important to me, so please share your thoughts and suggestions. Every bit of feedback helps me make KFtui better! 🙃

## Conclusion

KFtui in KFtray v0.13.0 offers a simple and efficient way to manage your port forwarding configurations. Whether you're working on a remote server or a local machine, KFtui aims to provide the tools you need. Give it a try and let me know what you think!

## Video Demo

<video controls>
  <source src="/img/demo.mp4" type="video/mp4">
</video>

## Additional Resources

For more details, check the install guide:
[https://github.com/hcavarsan/kftray/blob/main/docs/kftui/INSTALL.md](https://github.com/hcavarsan/kftray/blob/main/docs/kftui/INSTALL.md)

And usage guide:
[https://github.com/hcavarsan/kftray/blob/main/docs/kftui/USAGE.md](https://github.com/hcavarsan/kftray/blob/main/docs/kftui/USAGE.md)

Also, check out the release:
[https://github.com/hcavarsan/kftray/releases/tag/v0.13.0](https://github.com/hcavarsan/kftray/releases/tag/v0.13.0)

---


If you find kftray or kftui useful, please support our work and *star us on [GitHub](https://github.com/hcavarsan/kftray) ⭐*


