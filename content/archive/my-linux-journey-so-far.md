---
title: "My Linux Journey So Far"
date: 2023-02-09T22:36:01+01:00
---
My Linux journey began somewhere with [Ubuntu](https://ubuntu.com). That
was back then when Ubuntu was very popular. Later on
I made my first experiences with KDE on [Kubuntu](https://kubuntu.org). Since
then I have mostly been using [KDE](https://kde.org) as my main desktop environment.
There were times when I tried out [Gnome](https://www.gnome.org) and 
also window managers like [i3](https://i3wm.org) or 
[Sway](https://swaywm.org). But they never stuck.

At some point I was fascinated by rolling release distributions like
[Arch Linux](https://archlinux.org). But of course back then there was 
no [archinstall](https://wiki.archlinux.org/title/archinstall) 
and therefore I had my troubles getting it installed properly. 
So I tried out [Manjaro](https://manjaro.org) and the experience wasn't that bad at all. 

And then there was a time where I was using [macOS](https://www.apple.com/macos). 
Yes, I'm being serious. It wasn't horrible. But it wasn't good either. I felt so 
lost on macOS and tried to adopt the macOS way of doing things.
The good old window management I have been used to since 
[Windows 7](https://en.wikipedia.org/wiki/Windows_7) or 
[Windows XP](https://en.wikipedia.org/wiki/Windows_XP) days is not available on macOS. 
There is no native alt tabbing on macOS. You swipe up with three 
fingers on your touchpad and suddenly all of your applications appear 
[in a unorganized way on your screen](https://support.apple.com/en-us/HT204100).
If you have multiple instances of a program open and click on the icon in the dock 
it opens up all of them. No way to select which one you want right now. 
Window management was downright bad for my preferred way of using a computer. 
And the macOS way of doing things did not feel efficient in any way compared to 
my old ways of doing things. Therefore I switched again.

Enter Arch Linux. I have been very happy on Arch. But I wanted
to try out [openSUSE Tumbleweed](https://get.opensuse.org/tumbleweed). 
So I did. And openSUSE Tumbleweed is amazing. I am still not sure which 
of both I like better. But it's probably Tumbleweed. Though I have to say 
[pacman](https://wiki.archlinux.org/title/pacman) is so
much faster than [zypper](https://en.opensuse.org/Portal:Zypper). 
But the experience on Arch is generally
so much more DIY. I liked that. But I also like the fact that
the Tumbleweed installation by itself felt more stable for no apparent
reason. It just feels like a polished product. Whereas Arch always
feels incomplete to me. 

With the switch to Tumbleweed yet another transition took place.
I got into the [openSUSE](https://www.opensuse.org/) ecosystem. 
I also thought about using openSUSE Leap. 
But I stayed with the [rolling release](https://en.wikipedia.org/wiki/Rolling_release) 
philosophy. My last transition should introduce something completely new.
And that is called an immutable OS. I am certainly not an expert
on that topic so don't quote me on the following. What differentiates 
it from regular distributions is that the root filesystem is mounted
as read only. This prevents malicious or accidental modifications
to the operating system. Changes to the running operating system
are not permitted. Changes are applied to a snapshot that will
be booted on next the next boot. Automatic checks are applied
to determine if the snapshot is functional, otherwise the previous
snapshot will be loaded. Thus the host OS is able to update
in an automated fashion and rollback by itself if something 
goes wrong. The host system is separated and supposed
to stay small. Applications are preferably installed using
[Flatpak](https://flatpak.org). Development environments 
can be set up using [Distrobox](https://github.com/89luca89/distrobox).

It's been a long way. But I'm finally fairly happy where I'm at 
currently. I want to use technology that I can also recommend
to other people. And I would generally not recommend anything 
based on [Debian](https://www.debian.org) such as Ubuntu or Kubuntu. 
Manjaro has its own issues. Arch Linux is not usable for most people. 
Tumbleweed is awesome. But I don't know if I would recommend Tumbleweed 
to regular people. Managing packages is not something regular people 
want to do. And graphical frontends more often than not failed for me when trying
to update the system. This is due to the fact that e.g. packages might
change vendor when you have the packman repo enabled. This currently
cannot be handled by Discover, which is the graphical frontend for KDE.
[MicroOS](https://microos.opensuse.org) can update itself. 
Not only that it can also determine by itself if the update has been successful.
If the checks consider the update faulty they will automatically rollback 
to the previous snapshot. Programs like web browsers and user focused programs 
can simply be installed as Flatpaks using Discover and that works reliably.

Advanced features are available using containers. I am running
Arch Linux inside of my MicroOS installation using Distrobox.
So every time I run `nvim`, `hugo` or other cli applications
it actually utilizes the applications installed inside of my Distrobox.
Why is that useful? Arch Linux has a lot of development packages
available directly in the official repositories such as `bash-language-server`,
`gopls`, `lua-language-server`. This saves me the hassle of trying to
figure out how to install a language server I need. On Arch I just 
know it works. Also those packages are installed inside of as a user Distrobox.
That means that they are not part of the host OS. And to me
it kind of makes sense to put those cli applications inside
of a separate development environment. They don't need to be part
of the core OS.

Lets wrap it up. I think that MicroOS is a promising attempt
to make Linux more accessible to more people. But it also makes
the process of managing a system less of a hassle. Updates are
going to work. I know that. If they don't the system will rollback
for me. Applications are installed via Flatpak. The development
environment sits inside of an Arch Linux container. I am surprised
how easy the transition from Tumbleweed to MicroOS actually was.
And although the MicroOS Desktop KDE variant is currently officially
still in alpha state, it feels just as solid if not even more so than
Tumbleweed. But it's not quite polished yet, e.g. I expected `kcm_sddm` 
to be preinstalled on KDE. Going on forward I am convinced that 
immutable operating systems and especially MicroOS are the way to go!
