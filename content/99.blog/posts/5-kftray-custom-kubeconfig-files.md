---
layout: post
title: KFtray now supports multiple kubeconfig files!
description: We're pleased to share the release of KFTray v0.10.0. With this update, we've focused on making it easier for users to manage port-forward configurations across various kubeconfig files. We've also dedicated efforts to improve error handling for a more intuitive user experience.
image: /img/cover.png
timestamp: 1715044662

author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---

# Introducing KFTray v0.10.0 🚀

kftray is a cross-platform system tray app made with Tauri (Rust and TypeScript) for Kubernetes users. It simplifies setting up multiple kubectl port forward configurations through a user-friendly interface. Easily store and manage all configurations from local files or GitHub repositories.


We're pleased to share the release of KFTray v0.10.0. With this update, we've focused on making it easier for users to manage port-forward configurations across various kubeconfig files. We've also dedicated efforts to improve error handling for a more intuitive user experience.




## What's New in Kftray v0.10.0?

### New Feature
- **Custom Kubeconfig Path**: This update allows users to set a custom path for their kubeconfig files. It's a handy feature for those working with multiple files and clusters, facilitating easier transitions between them.

### Enhancements
- **Better Error Handling**: We've worked on providing clearer feedback during the start or stop of port forwarding processes, aiming for a smoother interaction.
- **Code Quality Enhancements**: Through new linting and formatting rules, as well as thoughtful refactoring of our backend code, we've made strides in improving our code's quality and organization.
- **Updated Rust Version**: Keeping up with the latest developments, we've upgraded to Rust 1.78, ensuring our application benefits from the latest language improvements.

[Check it out KFTray v0.10.0 Release](https://lnkd.in/d6QuFffQ)

### If you don't know about KFTray, we have an article that provides a good overview of the app

[Kubernetes Debugging - How to Handle Multiple kubectl port-forward from Your Tray](https://kftray.app/blog/posts/3-kubernetes-debugging-handling)

### Thats all

I hope you find Kftray helpful. If you do, please consider giving us a star on GitHub at [Kftray](https://github.com/hcavarsan/kftray). It would be greatly appreciated. 🌟


### Check the Kubeconfig feature Demo Here

::card-grid
  :video-player{src="https://www.youtube.com/watch?v=H6UJCfUr8yE"}
::
