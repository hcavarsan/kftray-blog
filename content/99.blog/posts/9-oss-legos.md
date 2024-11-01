---
layout: post
title: Open Source Licenses and Lego Blocks
description:  A bit about OSS licenses using LEGO analogy
image: /img/lego-blog.png
timestamp: 1730425701
author: Henrique Cavarsan
position: Maintainer
avatar: https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1243406%2F70a23663-0e74-428f-9f28-9e83c6178188.jpeg
avatarLink: https://github.com/hcavarsan

published: true
---

<br>


>**Note:** This article was heavily inspired by a video called [What is Open Source explained in LEGO](https://www.youtube.com/watch?v=a8fHgx9mE5U) from 10 years ago which is very well explained. The video used LEGO to explain open source in a simple way. I wanted to build on that idea by using LEGO to explain the different types of open source licenses.

<br>

So, imagine you have a giant box of Lego bricks. You love creating all sorts of things—spaceships, castles, robots—and you often invite your friends over to build together.
Sometimes, you come up with an amazing creation and want others to enjoy it too. But you also want to make sure everyone plays fair and knows how they can use your designs. That's where open source licenses come into play.

### Permissive vs Copyleft Licenses

Just like you might have different rules for sharing your Lego creations, open source licenses come in two main types: **permissive** and **copyleft**.

- **Permissive licenses** Allow others to use, modify, and distribute your work with minimal restrictions.
- **Copyleft licenses**  Ensures that all future versions remain free and open.


### Permissive Licenses - The "Do What You Want" and "No Warranty" Rule

>Your friend Alex, takes your Lego castle and transforms it into a futuristic fortress. He decides to display it at a local event without mentioning you. While you might wish he gave you credit, your "do what you want" rule means he's allowed to do that. Your castle idea has inspired new creations, even if you don't see the direct benefits.

Suppose you tell your friends, `Here's my Lego castle. You can do whatever you like with it—even keep it, change it completely, or sell it at the school fair. But if anything goes wrong—like the blocks breaking—it's not my fault.`  This gives your friends complete freedom over what they do with your creation while also letting them know that you're not responsible for any problems.

This is like a permissive license, such as the [MIT License](https://opensource.org/licenses/MIT) or the [BSD License](https://opensource.org/licenses/BSD-3-Clause). People can use the code in any way they want, even in their own projects that they might sell or keep private. The "no warranty" part is a common clause in these licenses, stating that the software is provided "as is," without any guarantees.

Some think that permissive licenses require giving credit to the original creator. While it's good manners to do so, not all permissive licenses require attribution. Always check the specific license terms to be sure.



### Copyleft Licenses - The "Share Alike" Rule

>Alex takes your Lego spaceship, adds a cool warp drive, and improves the laser cannon. Thanks to your "share alike" rule, Alex shares the enhanced spaceship with everyone, and now all your friends can enjoy an even better version. This continuous sharing leads to amazing creations none of you could have built alone.

Imagine you build an awesome Lego spaceship with unique features—a rotating laser cannon and hidden compartments. You tell your friends, `You can add more pieces or change it, but if you do, you have to share your new creation with everyone else too, and make sure you keep the same rules I have.` This way, any improvements your friends make are shared with the whole group under the same conditions.

In software, this is similar to a copyleft license like the [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html). If someone uses code licensed under the GPL and makes it better, they must also share their improved code with others under the same license. This encourages ongoing sharing and ensures that the software and its enhancements remain available to everyone.

Some people think that using GPL-licensed code means they can't sell their software, but that's not true ([GPL FAQ on selling software](https://www.gnu.org/licenses/gpl-faq.en.html#DoesTheGPLAllowMoney)). You can sell your software, but you must also provide the source code under the same GPL license. This approach fosters a community where everyone benefits from each other's contributions.


### Strong Copyleft for Network Software - The Affero GPL

>Alex takes your online Lego guide, adds new sections, and hosts it on her website. Because of your rule, she shares her improved guide with everyone, ensuring that all users benefit from the enhancements.

Imagine you create an online guide to building Lego models and say, `You can use and change my guide, but if you make it better and share it with others, even online, you need to share your changes with everyone.` This ensures that improvements are shared, no matter how they are distributed.

This is like the [GNU Affero General Public License (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html). It's similar to the GPL but adds that if you use the software over a network (like a web server), you must make the source code available to users interacting with it.

Some think the AGPL restricts the use of software in web applications. While it does require sharing modifications when the software is used over a network, it doesn't prevent its use in web services ([AGPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html#AGPLv3RequireSourceOnline)). It ensures that all users, even those accessing the software remotely, benefit from improvements.


### Lesser Copyleft Licenses - Sharing Core Components

>Alex uses your Lego gears in a complex clock he builds. He doesn't have to share the design of his clock, but when he improves the gears to be more efficient, he shares those improvements with you. Everyone benefits from better gears, while Liam's clock design remains his own.

Suppose you build a special set of Lego gears and say,
`You can use my gears in your creations, and if you improve the gears themselves, please share those improvements. But you don't have to share your entire creation.` This encourages others to use and enhance the gears while allowing them to keep their own designs private.

This is like the [GNU Lesser General Public License (LGPL)](https://www.gnu.org/licenses/lgpl-3.0.html). It's often used for software libraries. If someone modifies the library, they must share those changes under the LGPL, but they can use the library in their own software without having to release their entire program's source code.

People sometimes think the LGPL allows them to ignore copyleft requirements entirely. However, any modifications to the LGPL-licensed components must still be shared under the same license ([LGPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html#WhatDoesLGPLPermit)).


### Middle Ground Licenses - Balancing Sharing and Privacy

>Alex uses your Lego engine in her custom car model. She tweaks the engine for better performance and shares those improvements with you. However, she keeps her car design private. This way, the core engine gets better for everyone, while Emma's unique work remains hers.

Consider if you say, `You can use my special Lego engine in your own creations, but if you change the engine itself, you need to share those changes with everyone. However, you can keep the rest of your creation to yourself.` This way, the core part stays open, but your friends can keep their own creations private.

This is like the [Mozilla Public License (MPL)](https://www.mozilla.org/en-US/MPL/2.0/). It's a compromise between copyleft and permissive licenses. It requires that any changes to the original code are shared under the same license but allows new code that is added to remain under a different license.

Some think the MPL forces them to open source their entire project. In fact, only modifications to MPL-licensed code need to be shared, not your entire codebase ([MPL FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/)). This allows for collaboration on core components while protecting proprietary elements.


### Licenses Focusing on Collaboration and Protection

>Alex enhances your Lego robot with voice control. She shares her improvements and includes a note about her changes. Because of your agreement, everyone feels safe using and modifying the robot without fear of legal issues, leading to more innovation.

Imagine you say, `You can use my Lego robot and change it if you like, but let's agree not to argue over who built which part. Also, please tell others about any big changes you make, and don't sue anyone over ideas used in this robot.` This helps prevent disagreements and encourages transparency and cooperation.

This is similar to the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Others can use and modify the code, but there are rules to prevent disputes, like not suing each other over patents (which are like ideas or inventions).

Some believe the Apache License is too restrictive because of its patent clauses. In reality, these clauses are there to protect users from patent litigation, making it safer to use the software ([Apache License FAQ](https://www.apache.org/foundation/license-faq.html)).

### Adding Some Fun

Sometimes, people create licenses that are a bit humorous to make a point or just for fun. Imagine you just tell your friends, `Do whatever you want with my Lego` That's it—no rules at all.

This is like the **Do What the Fuck You Want to Public License** ([WTFPL](http://www.wtfpl.net/about/)). It's a very permissive license that allows anyone to do anything with the code. While it's humorous, it's important to note that such licenses may not be legally robust in all jurisdictions. Because it's so informal, some think the WTFPL isn't a real license. However, it is recognized by the Open Source Initiative, though its legal enforceability can be questionable.


### What Happens If You Switch Licenses Mid-Game

Imagine you've been sharing your Lego creations under one set of rules, and partway through, you decide to change them. Perhaps you initially said, `Do whatever you want` but now you want everyone to share their improvements. After seeing amazing things your friends have done with your Lego creations without sharing back, you decide to change your rules to require sharing improvements. For future creations, everyone now knows they need to share changes. But for the creations already shared, the old rules still apply, and friends can keep their modifications private if they wish.

I actually went through this experience with my open-source project, [KFTray](https://github.com/hcavarsan/kftray). When I first started building it, I was like someone who just wanted to share their Lego creation with friends—I chose the MIT license because it was simple and permissive. It was like saying, "Here's my Lego set, do whatever you want with it!"

But as the project grew and I saw how others were using it, I realized I wanted to ensure that improvements would be shared back with the community. It's like noticing that while friends were making amazing modifications to your Lego creation, those improvements weren't being shared with everyone else who might benefit from them. So, I decided to switch to the GPL 3.0 license through [this pull request](https://github.com/hcavarsan/kftray/pull/322) — essentially changing the rules to say, "You can still play with and modify these Lego pieces, but now you need to share your improvements with everyone."

In software, changing the license of your project is possible but can be complicated. If you're the sole owner of the code, you can relicense it as you wish. However, if others have contributed, you'll need their permission to change the license on their contributions.

Some think they can unilaterally change the license without affecting existing users. While you can change the license for future versions, the old versions remain under the original license, and users can continue to use them under those terms ([Changing a License](https://opensource.stackexchange.com/questions/1435/can-i-change-the-license-of-a-project-after-its-been-released)).


### Mixing and Matching - License Compatibility

Sometimes, you want to combine your Lego spaceship with a friend's Lego castle to make an even bigger creation. But if you have different rules for sharing, it might get complicated. You want to merge your GPL-licensed Lego spaceship with your friend's permissively licensed castle. To share the combined creation, you both need to agree on a license that respects both sets of rules. Otherwise, you might not be able to share the new creation with others.

In software, combining code with different licenses can be tricky. Some licenses are compatible, meaning the code can be combined without issues. Others are incompatible, and combining them could lead to legal problems.

Many think that all open source licenses are compatible. In reality, licenses like the GPL are not compatible with some permissive licenses when it comes to distributing combined works ([GPL Compatibility](https://www.gnu.org/licenses/gpl-faq.en.html#WhatIsCompatible)). It's important to understand the licenses involved to avoid accidental misuse.

### Why Licenses Matter - Fair Play and Collaboration

Licenses help protect creators and guide users. They set clear expectations, fostering an environment where everyone knows how they can use, modify, and share creations.

Some people think licenses are unnecessary or just legal jargon. But without clear licenses, users might unknowingly break laws, and creators might not have their rights respected ([The Importance of Open Source Licenses](https://opensource.guide/legal/)).

By understanding these licenses, we can choose how we want to share our work and collaborate with others. Whether we're like Alex, deciding how to share our Lego spaceship, or someone using others' creations, knowing the rules helps us contribute to a community where everyone can create, improve, and enjoy together.

### Both Lego and Code

Licenses are like the rules we agree on when sharing our Lego creations. They help us play fairly, encourage sharing, and protect each other. Remember, just like sharing your Lego creations can lead to new and exciting builds you might not have imagined, sharing software under open source licenses can lead to amazing collaborations that benefit everyone.

### Building Together

Open source is all about collaboration and shared growth. By respecting the licenses and the intentions behind them, we foster an environment where creativity thrives. It's like a big playground where everyone brings their toys, and together, we build something greater than any one of us could alone.

So next time you're using or creating open source software, think of it as sharing your Lego creations. Set the rules that feel right to you, understand others' rules, and enjoy the process of building something amazing together.
