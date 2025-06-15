---
outline: deep
---

# Linux

Linux-based systems have the tendency to diverge quite a bit. This makes it a
non-trivial task to provide documentation that works for every system and 
variation. [Ubuntu](https://ubuntu.com/) provides a consistent and reliable
desktop experience, based on the [GNOME](https://www.gnome.org/) desktop 
environment and the Linux kernel. We will assume a Ubuntu-based system 
throughout this document.

## Browser

Chromium defaults to using XWayland instead of using Wayland
natively. We will set the `CHROMIUM_FLAGS` environment variable
in order to change that behavior.

Make sure that the directory `~/.config/environment.d/` exists.

```sh
mkdir -p "$HOME"/.config/environment.d/
```

Create the file `~/.config/environment.d/envvars.conf` and 
add this line to it.

```sh
CHROMIUM_FLAGS="--ozone-platform-hint=auto --enable-features=TouchpadOverscrollHistoryNavigation"
```

Restart the Wayland session. Open `chrome://gpu` in Chromium and 
look for *Ozone platform*, to confirm that the browser is running
natively on Wayland.

## Desktop

Enable dark mode.

```sh
gsettings set org.gnome.desktop.interface color-scheme prefer-dark
```

Disable the desktop icons extension.

```sh
gnome-extensions disable ding@rastersoft.com
```

Disable the app app indicators extension.

```sh
gnome-extensions disable ubuntu-appindicators@ubuntu.com
```

## Dock

Restrict the height of the dock.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock extend-height false
```

Do not make the dock fixed.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
```

Move the dock to the bottom.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock dock-position 'BOTTOM'
```

Move the *Show Apps* button to the left.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock show-apps-at-top true
```

Disable shortcuts for Dash to Dock extension.

```sh
gsettings set org.gnome.shell.extensions.dash-to-dock hot-keys false
```

Disable `<Super><Number>` shortcuts for GNOME shell.

```sh
for i in $(seq 1 9); do 
    gsettings set org.gnome.shell.keybindings switch-to-application-$i []
done
```

## Editor

### Installation

Install the `vim-nox` package.

```sh
sudo apt install vim-nox
```

### Configuration

Download the `~/.vimrc` file.

```sh
wget -O "$HOME"/.vimrc "https://raw.githubusercontent.com/notfirefox/vim-config/main/.vimrc"
```

## Keyboard

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

Allow us to use the `<Super>q` shortcut for closing windows.

```sh
gsettings set org.gnome.desktop.wm.keybindings close "['<Super>q']"
```

Allow us to use the `<Super><Control>q` shortcut for locking the screen.

```sh
gsettings set org.gnome.settings-daemon.plugins.media-keys screensaver "['<Control><Super>q']"
```

If the `Super` key is on the right side of your keyboard, use this command.

```sh
gsettings set org.gnome.mutter overlay-key Super_R
```

## Pasteboard

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

## Shell

Linux systems typically use `bash`, i.e. *Bourne Again Shell*, by default.
It is an enhancement of the original `sh`, i.e. *Bourne Shell*, and also
incorporates parts of `ksh`, i.e. the *KornShell*. macOS nowadays defaults
to `zsh`, i.e. the Z shell. This is also what we will use, as it provides
every feature we need and comes with completions out of the box.

### Installation

The following command will install the `zsh` shell.

```sh
sudo apt install zsh
```

Change the default shell using the following command.

```sh
chsh -s /bin/zsh && exec zsh
```

### Configuration

::: info INFO
Our configuration enables the Korn shell emulation and takes care of the 
completion initialization by itself, therefore we will disable the global 
initialization, that is provided by default.

```sh
echo 'skip_global_compinit=1' > "$HOME"/.zshenv
```
:::

Download the `~/.zshrc` file.

```sh
wget -O "$HOME"/.zshrc "https://raw.githubusercontent.com/notfirefox/zsh-config/main/.zshrc"
```

Source the `~/.zshrc` file for the changes to become effective.

```sh
. "$HOME"/.zshrc
```

## Userland

The user space tools on typical Linux-based systems have non-standard 
extensions such as long option flags. Such non-standard extensions may or
may not be available on other Unix-like operating systems. Therefore it is
advised to not become dependant on such non-standard behavior. This is why
we prefer user space tools from [Chimera Linux](https://chimera-linux.org/).

### Dependencies

Install the required packages to compile the user space tools from source.

```sh
sudo apt install autoconf automake bison build-essential cmake flex \
    libacl1-dev libbz2-dev libedit-dev liblzma-dev libncurses5-dev \
    libssl-dev libzstd-dev libtool meson ninja-build pkg-config zlib1g-dev
```

### Preparation

We will first need to download and install the `libxo` library.

```sh
wget "https://github.com/Juniper/libxo/releases/download/1.7.5/libxo-1.7.5.tar.gz"
```

Extract the archive and change the directory.

```sh
tar xzvf libxo-1.7.5.tar.gz && cd libxo-1.7.5/
```

Configure the build environment, by running the `configure` script.

```sh
./configure --prefix="$HOME"/.local/
```

Compile and install the library.

```sh
make && make install
```

### Installation

Now we can download and install the `chimerautils` userland tools.

```sh
wget "https://github.com/chimera-linux/chimerautils/archive/refs/tags/v14.2.2.tar.gz"
```

Extract the archive and change the directory.

```sh
tar xzvf v14.2.2.tar.gz && cd chimerautils-14.2.2/
```

Do not compile and install the `nvi` program.

```sh
sed -i "/subdir('nvi')/d" src.freebsd/meson.build
```

Configure the build environment, by running `meson setup`.

```sh
PKG_CONFIG_PATH="$HOME"/.local/lib/pkgconfig meson setup \
    -Dc_link_args='-Wl,--rpath $ORIGIN/../lib' \
    --prefix="$HOME"/.local/ build/
```

Compile and install the tools.

```sh
meson compile -C build/ && meson install -C build/
```
