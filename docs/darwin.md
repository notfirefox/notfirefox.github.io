---
outline: deep
---

# macOS

Documenting useful configuration options for macOS. Some of these 
customizations will involve the `defaults` command. See 
[macos-defaults.com](https://macos-defaults.com/) for more information.

## Dock

Automatically hide the dock to save some vertical space.

```sh
defaults write com.apple.dock "autohide" -bool "true"
```

Reduce the time it takes for the dock to show up.

```sh
defaults write com.apple.dock "autohide-delay" -float "0"
```

Hide the recent applications and documents in the dock.

```sh
defaults write com.apple.dock "show-recents" -bool "false"
```

Run the following command for the changes to become effective.

```sh
killall Dock
```

## Editor

Download the `~/.vimrc` file.

```sh
curl -o "$HOME"/.vimrc "https://raw.githubusercontent.com/notfirefox/vim-config/main/.vimrc"
```

## Finder

Enable the path bar for Finder.

```sh
defaults write com.apple.finder "ShowPathbar" -bool "true"
```

Show folders first in Finder.

```sh
defaults write com.apple.finder "_FXSortFoldersFirst" -bool "true"
```

Always show all file extensions.

```sh
defaults write NSGlobalDomain "AppleShowAllExtensions" -bool "true"
```

Run the following command for the changes to become effective.

```sh
killall Finder
```

## Git

macOS automatically creates `.DS_Store` files all around the file system.
This can be annoying, when sharing code with others using a version 
control system like Git. We can utilize a global `.gitignore` file, 
in order to avoid that problem.

Create a global `~/.gitignore` file.

```sh
echo ".DS_Store" > "$HOME"/.gitignore
```

Tell Git about the `~/.gitignore` file.

```sh
git config --global core.excludesfile "$HOME"/.gitignore
```

## Homebrew

Unlike popular Linux-based systems, macOS does not ship with a package
manager out of the box. The de facto default package manager for macOS is 
[Homebrew](https://brew.sh/), which can be installed using the following 
command.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Your `~/.zshrc` file should also contain this to properly 
load `brew` at shell startup:

```sh
eval "$(/opt/homebrew/bin/brew shellenv)"
```

See the [Shell](./darwin.md#shell) section below, which already takes care of this.

## Shell

On macOS the default shell is `zsh`. In order to have some niceties, such
as colored output for some commands and Homebrew integration, we will 
install my custom configuration.

Download the `~/.zshrc` file.

```sh
curl -o "$HOME"/.zshrc "https://raw.githubusercontent.com/notfirefox/zsh-config/main/.zshrc"
```

Source the `~/.zshrc` file for the changes to become effective.

```sh
. "$HOME"/.zshrc
```

## Terminal

On macOS a message is being printed when opening a new terminal window 
or tab. This message can be suppressed, by creating a `.hushlogin` file 
inside of the home directory.

```sh
touch "$HOME"/.hushlogin
```
