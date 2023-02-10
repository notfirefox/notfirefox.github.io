---
title: "You Should Be Using Chromium"
date: 2023-01-26T22:30:46+01:00
tags: ["Chromium"]
---
This is going to be a hot take. Usually
under Linux enthusiasts it is common to 
recommend using Firefox. And while that 
makes sense under some circumstances I
am going to do the direct opposite.

Linux users vary a lot. But some of them
just hate Big Tech. It goes so far that
they only recommend Linux distributions
like Arch Linux and Debian. The even 
more extremists only recommend distributions
that don't include proprietary code at all.

But hating Big Tech in itself does not lead
anywhere in my opinion. If you are concerned
about security, there are several occasions
where you would want to choose proprietary
software over open source one. Here is 
an article comparing 
[Firefox and Chromium](https://madaidans-insecurities.github.io/firefox-chromium.html)
regarding their security. 

As it turns out when it comes to security,
Google is often not necessarily a bad choice.
They simply have more manpower than Mozilla
to create a functional and secure browser.
And it should be noted that Chromium is indeed
open source. 

Another controversial point that came up
multiple times is the switch to 
[Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/).
I understand that this might push a lot of Linux
people even more so over to Firefox. But I would
seriously try out the adapted variant of your
favorite content blocker and see how it goes.
It should also be noted that the new content blocking
API is also better when it comes to security,
as described in this article about
[Badness Enumeration](https://privsec.dev/posts/knowledge/badness-enumeration/).

After all the people insisting on using Firefox
are a small minority and I would assume some of them
try to avoid Big Tech at all costs and therefore limit
themselves so much that they are not able to consider alternatives.

Lastly I will show you how to fix the weird cursor fixes
apparent when using Chromium as a Flatpak.
```sh
flatpak override --user --env=XCURSOR_PATH=/run/host/user-share/icons:/run/host/share/icons
```
