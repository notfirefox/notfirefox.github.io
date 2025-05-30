---
outline: deep
---

# Linux

Configuration for Linux-based systems. To ensure some level of uniformity,
an Ubuntu-based system will be assumed throughout this document.

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

Hide the home folder on the desktop.

```sh
gsettings set org.gnome.shell.extensions.ding show-home false
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

Disable intelligent hide.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock intellihide false
```

Move the *Show Apps* button to the left.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock show-apps-at-top true
```

Apply the custom theme.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock apply-custom-theme true
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

Disable the global `compinit` on Debian-based systems.

```sh
echo 'skip_global_compinit=1' > ~/.zshenv
```

Use `wget` to download the `$HOME/.zshrc` file.

```sh
wget -O "$HOME/.zshrc" "https://raw.githubusercontent.com/notfirefox/zsh-config/main/.zshrc"
```

Source the `.zshrc` file for the changes to become effective.

```sh
. "$HOME/.zshrc"
```

### Userland

The user space tools on typical Linux-based systems have non-standard 
extensions such as long option flags. Such non-standard extensions may or
may not be available on other Unix-like operating systems. Therefore it is
advised to not become dependant on such non-standard behavior. This is why
we prefer user space tools from [Chimera Linux](https://chimera-linux.org/).

#### Dependencies

Install the required packages to compile the user space tools from source.

```sh
sudo apt install autoconf automake bison build-essential cmake flex \
    libacl1-dev libbz2-dev libedit-dev liblzma-dev libncurses5-dev \
    libssl-dev libzstd-dev libtool meson ninja-build pkg-config zlib1g-dev
```

#### Preparation

We will first need to download and install the `libxo` library.

```sh
curl -LO "https://github.com/Juniper/libxo/releases/download/1.7.5/libxo-1.7.5.tar.gz"
```

Extract the archive and change the directory.

```sh
tar xzvf libxo-1.7.5.tar.gz && cd libxo-1.7.5/
```

Configure the build environment, by running the `configure` script.

```sh
./configure --prefix=$HOME/.local/
```

Compile and install the library.

```sh
make && make install
```

#### Installation

Now we can download and install the `chimerautils` userland tools.

```sh
curl -LO "https://github.com/chimera-linux/chimerautils/archive/refs/tags/v14.2.2.tar.gz"
```

Extract the archive and change the directory.

```sh
tar xzvf v14.2.2.tar.gz && cd chimerautils-14.2.2/
```

Configure the build environment, by running `meson setup`.

```sh
PKG_CONFIG_PATH=$HOME/.local/lib/pkgconfig meson setup \
    -Dc_link_args='-Wl,--rpath $ORIGIN/../lib' \
    --prefix=$HOME/.local/ build/
```

Compile and install the tools.

```sh
meson compile -C build/ && meson install -C build/
```
