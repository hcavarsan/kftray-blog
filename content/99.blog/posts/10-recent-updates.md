---
layout: post
title: Better github sync and new refactored frontend in kftray
description: A look at recent updates ~ github sync and new frontend ~ in kftray, an open source tool that helps developers manage kubectl port-forwards through a simple system tray app
image: /img/github-post.png
timestamp: 1732233947
author: Henrique Cavarsan
position: Maintainer
avatar: https://avatars.githubusercontent.com/u/30353685?v=4
avatarLink: https://github.com/hcavarsan
published: true
---

<br/>

<br/>

<div style="text-align: center; margin-top: 20px">
<img src="/img/kftray-head.png" alt="Kftray github" style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.8); border-radius: 10px " />
</div>




kftray is an open source tool that helps developers manage kubectl port-forwards through a simple system tray app. In this post, I'll share some recent improvements that make configuration management and team collaboration easier.



### Configuration Management

>You're working on a project that requires specific port-forward setups. You've got it all configured perfectly on your machine, but now your teammate needs the same setup. Without a proper way to share these configurations, they'd need to manually recreate everything.

This was one of the most common pain points I heard from users. Sure, you could share your config file through Slack or email, but that gets messy quickly. What happens when configurations change? How do you keep everyone in sync?

### Why Another Port-Forward Tool?

We've all been there - multiple terminal windows open, trying to remember which port maps to which service, and then everything breaks when your laptop goes to sleep. That's exactly why I built kftray. It sits quietly in your system tray, managing all your port-forwards and automatically reconnecting them when needed.

Here's a common scenario where kftray makes a difference with github sync feature:

>Your team is working on a microservices architecture with services spread across multiple kubernetes clusters. Each developer needs to connect to various services locally. With the new git integration, you can:

1. Store your team's common configurations in a private repository
2. Let developers sync these configs using their existing git credentials
3. Automatically share updates when new services are added or ports change
4. Keep personal modifications in separate config files if needed


### Github Sync Integration

The previous version of kftray had basic GitHub integration, but it was limited. You could only use public repositories or manage separate access tokens. This worked for some cases, but it wasn't ideal for many real-world scenarios. Here's what the old workflow looked like:

- Create a public repo or generate a GitHub token
- Configure kftray with the token
- Hope you don't accidentally share the token with others
- Manually sync when configs changed

### The New Approach - Using Your Existing Git Setup

>Think about how you normally interact with Git repositories. You probably have SSH keys or credentials already configured. Why not use those same credentials for kftray?

That's exactly what the new version does. Now you've got three flexible ways to backup and share your configs:

1. **Public Repository**: Just provide the URL and path - perfect for open source projects or personal use
2. **System Git Credentials**: Uses your existing git setup - the same one you use for `git clone`
3. **GitHub Token**: Stored securely in your system keyring - still available if you prefer this method

This means no more separate credential management. If you can clone a repository, you can sync your kftray configs.

>This is a simple example of the new github sync feature using this configuration file [configs.json](https://github.com/hcavarsan/kftray/blob/main/examples/configs.json):

<div style="text-align: center; margin-top: 20px">
<img src="/img/github.gif" alt="Kftray github" style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.8); border-radius: 10px " />
</div>



### Performance Matters - The UI Overhaul

While working on the git integration, we noticed another issue. The UI would sometimes get sluggish, especially when running multiple port-forwards. This wasn't just about aesthetics - it impacted the usability of the tool.

The solution was a complete frontend refactor, moving from Chakra UI v2 to v3. The new interface brings significant performance improvements, especially when managing multiple port-forwards simultaneously. Not only does it use less memory overall, but the interface stays responsive even as you add more configurations. You'll also notice better visual feedback for connection states, making it clearer what's happening with your port-forwards.


<div style="text-align: center; margin-top: 20px">
<img src="/img/logo.gif" alt="Kftray demo" style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.8); border-radius: 10px " />
</div>



### Core Improvements

Beyond the UI changes, we've made substantial improvements to how kftray handles connections. The port-forward operations are now more reliable, with smarter error recovery for network issues and better handling of system sleep/wake cycles. One of the most requested improvements was better background operation - kftray now maintains connections more reliably when minimized, so you don't have to worry about losing your port-forwards when your system goes to sleep.



### Getting Started

If you're interested in trying out kftray, you can find it on [GitHub](https://github.com/hcavarsan/kftray). The new features are available in the latest release [v0.15.2](https://github.com/hcavarsan/kftray/releases/tag/v0.15.2), and the documentation includes examples for different setup scenarios.

### Community Feedback

I built kftray to scratch my own itch, but it's grown through feedback and suggestions from users. These recent changes came directly from user feedback, and I'm always looking to hear how people are using the tool and what could make it better.

Would love to hear your thoughts, especially if you're managing multiple port-forwards setups. How do you handle port-forward management in your team? What challenges have you faced? Let me know in the comments or open an issue on [GitHub](https://github.com/hcavarsan/kftray/issues).

if you find this tool useful, please consider giving it a star on [GitHub](https://github.com/hcavarsan/kftray) 🙃🌟

<br>

