---
outline: deep
---

# Linux

Configuration for Linux-based systems. To ensure some level of uniformity,
an Ubuntu-based system will be assumed at some places.

## Configuration

Configuring Linux-based desktop systems through various means.
Some of the desktop-related options can be easily customized using
the `gsettings` utility.

### Browser

Chromium defaults to using XWayland instead of using Wayland
natively. We will set the `CHROMIUM_FLAGS` environment variable
in order to change that behavior.

Make sure that the directory `~/.config/environment.d/` exists.

```sh
mkdir -p ~/.config/environment.d/
```

Create the file `~/.config/environment.d/envvars.conf` and 
add this line to it.

```sh
CHROMIUM_FLAGS="--ozone-platform-hint=auto --enable-features=TouchpadOverscrollHistoryNavigation"
```

Restart the Wayland session. Open `chrome://gpu` in Chromium and 
look for *Ozone platform*, to confirm that the browser is running
natively on Wayland.

### Desktop

Enable dark mode.

```sh
gsettings set org.gnome.desktop.interface color-scheme prefer-dark
```

### Dock

Show the dock at the bottom.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock dock-position BOTTOM
```

Use a dock instead of a panel.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock extend-height false
```

Automatically hide the dock.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
```

Move the *Show Apps* button to the left.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock show-apps-at-top true
```

Disable shortcuts for Dash to Dock extension.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock hot-keys false
```

Disable `<Super>+Num` shortcuts for Gnome shell.

```sh
for i in $(seq 1 9); do 
    gsettings set org.gnome.shell.keybindings switch-to-application-$i []
done
```

### Editor

For those who want a simple modal editor, `nvi` is an excellent choice.

```sh
sudo apt install nvi
```

Prefer the `nvi` binary when running the `vi` command.

```sh
sudo update-alternatives \
    --install /usr/bin/vi vi /usr/bin/nvi 90 \
    --slave /usr/share/man/man1/vi.1.gz vi.1.gz /usr/share/man/man1/nvi.1.gz
```

Prefer the `nex` binary when running the `ex` command.

```sh
sudo update-alternatives \
    --install /usr/bin/ex ex /usr/bin/nex 90 \
    --slave /usr/share/man/man1/ex.1.gz ex.1.gz /usr/share/man/man1/nex.1.gz
```

Prefer the `nview` binary when running the `view` command.

```sh
sudo update-alternatives \
    --install /usr/bin/view view /usr/bin/nview 90 \
    --slave /usr/share/man/man1/view.1.gz view.1.gz /usr/share/man/man1/nview.1.gz
```

### Keyboard

Enable the additional keyboard layouts.

```sh
gsettings set org.gnome.desktop.input-sources show-all-sources true
```

Change the keyboard layout to the `EurKEY` layout.

```sh
gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'eu')]"
```

Use the following command to remap `Caps Lock` to the `Escape` key.

```sh
gsettings set org.gnome.desktop.input-sources xkb-options "['caps:escape']"
```

Allow us to use the `<Super>+Q` shortcut for closing windows.

```sh
gsettings set org.gnome.desktop.wm.keybindings close "['<Super>q']"
```

Allow us to use the `<Super>+<Control>+Q` shortcut for locking the screen.

```sh
gsettings set org.gnome.settings-daemon.plugins.media-keys screensaver "['<Control><Super>q']"
```

If the `Super` key is on the right side of your keyboard, use this command.

```sh
gsettings set org.gnome.mutter overlay-key Super_R
```

### Pasteboard

macOS has the `pbcopy` and `pbpaste` commands to copy and paste from
the clipboard. On Linux-based systems, you would use `wl-copy` and 
`wl-paste` instead. To make our life easier, we will create aliases,
that make the interface to those basic commands uniform.
Install the alias for the `pbcopy` command.

```sh
sudo update-alternatives \
    --install /usr/bin/pbcopy pbcopy /usr/bin/wl-copy 90 \
    --slave /usr/share/man/man1/pbcopy.1.gz pbcopy.1.gz /usr/share/man/man1/wl-copy.1.gz
```

Install the alias for the `pbpaste` command.

```sh
sudo update-alternatives \
    --install /usr/bin/pbpaste pbpaste /usr/bin/wl-paste 90 \
    --slave /usr/share/man/man1/pbpaste.1.gz pbpaste.1.gz /usr/share/man/man1/wl-paste.1.gz
```

This allows us to use the `pbcopy` and `pbpaste` commands on Linux too.

### Shell

Linux systems typically use `bash`, i.e. *Bourne Again Shell*, by default.
It is an enhancement of the original `sh`, i.e. *Bourne Shell*, and also
incorporates parts of `ksh`, i.e. the *KornShell*. macOS nowadays defaults
to `zsh`, i.e. the Z shell. This is also what we will use, as it provides
every feature we need and comes with completions out of the box.

The following command will install the `zsh` shell.

```sh
sudo apt install zsh
```

Change the default shell using the following command.

```sh
chsh -s /bin/zsh
```

Use `wget` to download the `$HOME/.zshrc` file.

```sh
wget -O "$HOME/.zshrc" "https://raw.githubusercontent.com/notfirefox/zsh-config/main/.zshrc"
```

Run the following command for the changes to become effective immediately.
```sh
. "$HOME/.zshrc"
```

### Userland

**TODO:** Write section about custom user space tools.
