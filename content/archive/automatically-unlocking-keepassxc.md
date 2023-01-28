---
title: "Automatically Unlocking KeepassXC"
date: 2023-01-28T13:01:10+01:00
---
[KeePassXC](https://keepassxc.org/) is a wonderful
tool to manage passwords completely offline on
a local device. Furthermore it greatly integrates
into the KDE Desktop whereas one doesn't notice 
that it is a separate app. For added convenience 
there is a trick to make the whole
experience even more seamless.

First we store our KeePassXC password.
```sh
secret-tool store --label="KeePassXC" "keepass" "default"
```
Then we modify the autostart file.
```sh
nvim "$HOME/.config/autostart/org.keepassxc.KeePassXC.desktop"
```
Where it says `Exec` we want to put our custom command.
```sh
bash -c "secret-tool lookup 'keepass' 'default' | keepassxc --pw-stdin ~/passwords.kdbx"
```
To prevent programs from changing our file we make it immutable.
```sh
sudo chattr +i "$HOME/.config/autostart/org.keepassxc.KeePassXC.desktop"
```

Now our KeePassXC file gets automatically unlocked when
we log into our user account.
