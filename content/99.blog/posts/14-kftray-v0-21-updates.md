---
layout: post
title: Event-driven port forwarding with Kubernetes watchers in kftray v0.21.0
description: Port forwards now survive pod restarts, react instantly to changes, and actually know when they're dead
image: /img/v021post.png
timestamp: 1753000000
author: Henrique Cavarsan
position: Maintainer
avatar: https://avatars.githubusercontent.com/u/30353685?v=4
avatarLink: https://github.com/hcavarsan
published: true
---

![kftray-v021](/img/v021post.png)



Just released kftray 0.21.0 with a complete rewrite of the port forwarding engine. This one's mostly about making port forwards more reliable - they now handle pod restarts without dying and actually know their real state.

Yeah, using the controller pattern for port forwarding is probably overkill. But why not?


## Port forwarding engine rewrite

![kftray-mermaid](/img/mermaid.svg)

So the old version would check pods every 5 seconds to see if anything changed. Pretty straightforward, but it meant you could wait up to 5 seconds for things to happen, and it was constantly hitting the Kubernetes API even when nothing was happening.

Switched to using Kubernetes watchers - the same pattern controllers use. Instead of asking "what changed?" every few seconds, kftray now gets told when pods change. It keeps a single long-lived connection to the API server that receives events as they happen.

The technical bits: kftray now uses kube-rs's watcher API with an in-memory store. The watcher maintains that long-lived HTTP connection and gets events (Added, Modified, Deleted) when pods matching our selectors change. The local store stays synced through these events, so when you create a port forward, it reads from the cache instead of hitting the API.

## Port forwards that actually survive pod restarts

Made a quick demo video to show the difference. Same test for both tools - port forwarding to a service while running curl in a loop, then deleting all pods with `kubectl delete pods --all --force`.

With kubectl port-forward: The connection dies completely when pods go away, even though it's forwarding to a service (not a specific pod). All requests fail and you have to manually restart it.

With kftray: Loses maybe one request when pods get deleted. The watcher detects the changes immediately and reconnects to new pods as they come up. The curl loop just keeps going.

<video controls>
  <source src="/img/v021demo.mp4" type="video/mp4">
</video>

This is what the event-driven approach gets you - port forwards that don't fall over when your pods do.

## State management that actually works

One annoying thing was port forwards showing as running in the UI when they were actually dead. Or worse, the opposite - dead entries in the UI while the forward was still running in the background.

Fixed this by having each port forward track its process ID. If kftray crashes or gets killed, it cleans up its state on restart. No more zombie forwards or incorrect UI states.

This also fixes that issue some folks were having where connections would disappear from kftui's panel but keep running. The UI now stays synced with what's actually happening.

## Network handling got smarter

The network monitor now waits for things to settle before trying to reconnect. Before, it would try to reconnect immediately during network blips, which just created more problems.

Now when your network drops (sleep/wake, VPN disconnect, whatever), kftray waits for the connection to stabilize before attempting reconnection. Less thrashing, more reliable recovery.

## Performance stuff

A bunch of things got faster:

**Prewarmed connections** - Connections stay ready for incoming traffic instead of being created on demand. Makes the initial connection faster.

**Client caching** - Kubernetes client connections get reused instead of creating new ones each time. Less overhead, faster port forward creation.

**TCP tuning** - Set TCP_NODELAY and adjusted buffer sizes for forwarded connections. Better throughput, lower latency.

**Parallel health checks** - Status checks run concurrently now instead of one by one. The UI updates faster when you have multiple forwards.

## The reconnection issues should finally be fixed

For folks who've been dealing with reconnection problems (especially the office/home commute scenario), this version should handle it better. The combination of event-driven updates and smarter network handling means forwards should reconnect properly after network changes.

If you're still having issues after v0.21.0, definitely let me know. But the new architecture specifically addresses the race conditions and partial reconnection failures that were happening before.

## Other stuff

- Process isolation prevents fake running states
- Reduced API calls to your cluster by like 90%
- Better error recovery when things go wrong
- Works the same in both kftray and kftui

## That's about it

The whole rewrite was kind of a big change, but port forwarding should just work better now. Less manual restarting, better performance, accurate UI state.

As always, kftray is open source and built in spare time. If you find it useful, giving the [github repo](https://github.com/hcavarsan/kftray) a star helps a lot.

You can get v0.21.0 from [kftray.app](https://kftray.app) or the [Release v0.21.0](https://github.com/hcavarsan/kftray/releases/tag/v0.21.0).

thanks for using kftray!
