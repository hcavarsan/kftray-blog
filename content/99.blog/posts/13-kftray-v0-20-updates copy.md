---
layout: post
title: Auto-disconnect port-forward global timeouts and handle network interruptions in kftray v0.20.0
description: Network monitoring now works the same across both interfaces, context field is optional for imports, and reconnections work better after network issues
image: /img/v020post.png
timestamp: 1752360927
author: Henrique Cavarsan
position: Maintainer
avatar: https://avatars.githubusercontent.com/u/30353685?v=4
avatarLink: https://github.com/hcavarsan
published: true
---

Just released kftray 0.20.0 with some improvements that hopefully make things a bit easier. Mostly focused on fixing some issues between the kftray and kftui, plus making config imports work better.

![kftray-020](/img/v020post.png)

## Network monitoring works better now

So there was this weird thing where network monitoring worked differently between kftray (the gui) and kftui (the terminal version). They had separate code for the same stuff, which meant if we fixed something in one, the other would still have the old behavior.

The network monitor code was duplicated, so i moved it all into its own crate called kftray-network-monitor. Now both apps use exactly the same code, so they behave the same way when handling reconnections and network stuff.

It's one of those changes you probably won't notice directly, but things should just be more consistent now. Whether you're using the gui or ssh'ed into a server using kftui, the network handling works the same.

Also tried to improve how reconnections work after network interruptions. Network issues (like when your laptop goes to sleep, wifi drops, vpn connections etc.) would sometimes leave port forwards in a weird state. They'd look like they were running but wouldn't actually forward anything, and you'd have to manually restart them. It should now detect when connectivity comes back and automatically try to reconnect any forwards that got broken.

Hopefully this helps if you're on a laptop and switch networks a lot or put the machine to sleep frequently.


## Context field isn't required anymore

When importing configs, kftray would always require you to specify a context, even if you already had your KUBECONFIG set up with an active context. So imports would just fail if you didn't provide one, which is different from how kubectl and other tools work.

Made the context field optional. If you don't specify one, it'll just use whatever context is currently active in your kubeconfig. Pretty much how you'd expect it to work.

So now you can import configs without worrying about the context field, and it'll work more like other kubectl tools that just respect whatever context you have active.


## Auto-disconnect after timeout

One thing people kept asking for was a way to automatically close port forwards after some time. You know how it goes - you start a forward for testing, get distracted with other stuff, and forget to turn it off. Hours later you realize it's still running.

The new settings page includes a global timeout option that automatically stops all port forwards after a set amount of time. Just pick how many minutes you want, and all your forwards will automatically disconnect when that time is up.

It's disabled by default (set to 0 minutes), so it won't break existing workflows. But if you want to make sure you don't leave forwards running forever, you can set it to whatever makes sense for you.

## New settings page to control everything

Before, there wasn't really a way to configure kftray - things like network monitoring would just start automatically and you couldn't change much without restarting or editing config files. Kind of awkward if you wanted to tweak how the app behaves.

Added a new settings modal/page to both the gui and tui interfaces. Now you can control things like toggling network monitoring on/off and setting timeouts. Everything changes  without needing to restart kftray or kftui.

The settings are stored in a local database, so your preferences stick around between app restarts.


<video controls>
  <source src="/img/v020post.mp4" type="video/mp4">
</video>
## Other stuff

A few other smaller things in this release:

- Added some validation to catch config issues earlier
- Improved how logs work in kftui
- Better timeout handling for port forwards
- Cleaned up dependencies and workspace organization

## That's pretty much it

Having the network monitoring unified makes it easier to add new network features that work the same in both interfaces. The optional context thing should make working with different kubernetes setups smoother.

As usual, kftray is open source and built in spare time. If it's useful to you, giving the [github repo](https://github.com/hcavarsan/kftray)

You can get the latest version from [kftray.app](https://kftray.app) or the [Release v0.20.0](https://github.com/hcavarsan/kftray/releases/tag/v0.20.0).

thanks for using kftray!
