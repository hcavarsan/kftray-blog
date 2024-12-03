---
layout: post
title: Side Projects - when solving your own problem leads to unexpected growth
description: Thoughts on how building something to fix your own problems can grow your technical skills & perspective
image: https://kftray.app/img/side-project.jpg
timestamp: 1733153095
author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan
published: true
---


# Growing as an Engineer Through Side Projects

I've been an SRE managing Kubernetes setups for a few years. After spending a year on my open-source tool, [kftray](https://github.com/hcavarsan/kftray), I want to share how side projects can really help you grow as an engineer.

## How It Started

I started with a common issue. managing multiple `kubectl port-forward` commands across different terminal windows was a daily pain. Instead of just putting up with it, I decided to create something that would simplify things. What was meant to be a small tool turned into a big learning experience.

Watching others struggle with the same problem made me realize this wasn't just a personal annoyance. Every SRE on our team had their own hacky solutions - scripts, aliases, terminal multiplexers. None of them quite solved the core issue.

## Going Deep

I chose Rust and TypeScript for the stack, not because they were the obvious choice, but because they would push me to learn. Cross-platform development showed me how many assumptions I was making about how computers work. Every bug became a lesson in systems design, every crash a deeper look into how computers handle resources.

## The Learning Curve

The funny thing about writing questionable code is how much it teaches you. My first attempt at network handling was interesting. But debugging at 2 AM has a way of teaching you things. Each refactor made me cringe at what I wrote before. Still does.

## Daily Impact

All those mistakes started paying off at work. Spotting bugs got easier because I'd probably made similar ones in my project. Design discussions became more interesting because I had real battle scars. Code reviews? Well, let's say I know what bad error handling looks like firsthand.

## Dev Solo

Building while working full-time is hard. The commit history tells a story of late-night coding sessions. Some parts of the code still make me cringe when I open them.

The hardest part? Knowing people can see your learning process. Every merged PR is a snapshot of "well, this is the best I could do at the time."

> The impostor syndrome hits different when you're building solo. Every architectural decision feels heavy when you know others will judge your code.

But the upside is that you get to learn things you might not have otherwise.

## Growing Pains

Each new feature reveals how much the old ones need work. The more I learn, the more I realize how much of the codebase needs rewriting. Users find new ways to break things weekly. Documentation? Still working on making it less confusing.

## Unexpected Technical Discoveries

*The deeper you dive into a problem space, the more you discover how much there is to learn:*

- **System architecture** became an obsession, leading to exploration of IPC communication and process management
- **Error handling** got real with meaningful messages and graceful failure modes
- **Cross-platform testing** taught patience and deep OS understanding

## The Community Aspect

The most unexpected benefit was connecting with other developers facing similar challenges. Every issue filed, every feature request, every pull request review became a learning opportunity and a chance to grow.

## Moving Forward

If you're thinking about building something: start simple, embrace the mess, and don't be afraid to share code you're not proud of. My first version was basically held together with print statements and hope.
Your early code will probably be terrible. Mine still is in places. But that's exactly how you learn.

This is what I'd recommend:
- Pick a problem you **actually** face
- Don't worry about whether it's been done before
- Be ready to learn things you didn't expect to learn
- Share your journey, it's a great way to keep motivated
- Embrace the journey, including the mistakes

*Your side project might not change the world, but it will definitely change you. And sometimes, that's enough.*
