---
layout: post
title: Side Projects - when solving your own problem leads to unexpected growth
description: Thoughts on how building something to fix your own problems can grow your technical skills & perspective
image: /img/side-project.webp
timestamp: 1733153095
author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan
published: true
---


# How Building a Side Project Transformed My Engineering Journey

I've been working as an SRE managing `kubernetes` environments for several years now. After spending a year building and maintaining my own open-source tool [kftray](https://github.com/hcavarsan/kftray), I wanted to share some reflections about how side projects can unexpectedly transform your growth as an engineer.

## From Frustration to Creation

It started with a common frustration - managing multiple `kubectl port-forward` commands across different terminal windows was becoming a daily headache. Instead of just dealing with it, I decided to build something to make my life easier. What began as a simple tool to handle port forwarding evolved into an *unexpected journey of technical discovery and professional growth*.

Watching others struggle with the same problem made me realize this wasn't just a personal annoyance. Every SRE on our team had their own hacky solutions - scripts, aliases, terminal multiplexers. None of them quite solved the core issue.

## Into the Technical Rabbit Hole

I chose to build with **Rust** and **TypeScript** - technologies I rarely touched at work. This decision pushed me far outside my comfort zone. Debugging memory leaks, understanding ownership patterns, dealing with cross-platform issues - *these challenges taught me more about systems programming than years of production work*.

The learning curve was steep. The first couple of months felt like pushing through mud. `Rust`'s ownership model made me question everything I knew about memory management. Cross-platform development exposed me to system-level differences I never had to think about before.

> Networking became fascinating in a way I never expected. I spent countless nights with tcpdump running and analyzing packets, really understanding how Kubernetes port-forwarding works under the hood.

I discovered patterns in protocol behavior that now help me spot similar issues in production environments. The knowledge gained from building something from scratch gave me insights that wouldn't come from just using existing tools.

## From Theory to Practice: Real-world Impact

What surprised me most was how this learning looped back into my daily work:

- **Debugging production issues** became more intuitive. When someone reports a networking problem, I now understand the underlying protocols better.
- **Architecture discussions** got deeper. Making solo decisions about system design taught me to ask better questions during team reviews.
- **Code quality** improved naturally. Dealing with cross-platform edge cases and user feedback made me more thoughtful about error handling and user experience.

## Building in Public: Lessons Beyond Code

Building in public brought unexpected challenges and growth:

> Documentation became an ~boring~ but required skill (im really bad at it but still trying to get better). Explaining technical concepts clearly isn't just about being thorough - it's about understanding your users' context and needs.

Feedback handling evolved. Every `GitHub` issue, every feature request taught me something about listening and prioritizing. I learned to balance user needs with technical constraints, a skill that's invaluable in my day job.

*Community interaction changed everything*. Seeing how others use your code, watching them find edge cases you never considered - it's humbling and educational. The **Kubernetes** community especially showed me how collaborative problem-solving leads to better solutions.

## The Reality of Building Solo

Maintaining an open-source project while working full-time isn't easy. There were weeks where I barely touched the code, followed by weekend coding marathons when inspiration hit. *I learned to be okay with this irregular rhythm*.

> The impostor syndrome hits different when you're building solo. Every architectural decision feels heavy when you know others will judge your code.

## Unexpected Technical Discoveries

*The deeper you dive into a problem space, the more you discover how much there is to learn:*

- **System architecture** became an obsession, leading to exploration of IPC communication and process management
- **Error handling** got real with meaningful messages and graceful failure modes
- **Cross-platform testing** taught patience and deep OS understanding


## The Community Aspect

The most unexpected benefit was connecting with other developers facing similar challenges. Every issue filed, every feature request, every pull request review became a learning opportunity and a chance to grow.

## Moving Forward

A year later, I'm still learning. Every new feature request shows me something I hadn't considered. Every bug report teaches me about an edge case I missed. *The project keeps evolving, and with it, my understanding grows*.

If you're thinking about starting a side project, remember:
- Pick a problem you **actually** face
- Don't worry about whether it's been done before
- Be ready to learn things you didn't expect to learn
- Share your journey, it's a great way to keep motivated.
- Embrace the journey, including the mistakes

> The real value isn't in the end product - it's in who you become while building it. Every line of code, every bug fixed, every user interaction shapes you into a better engineer.

*Your side project might not change the world, but it will definitely change you. And sometimes, that's enough.*
