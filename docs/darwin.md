---
outline: deep
---

# macOS

Documenting useful configuration options for macOS.

## Homebrew

Unlike popular Linux-based systems, macOS does not ship with a package
manager out of the box. The de facto default package manager for macOS is 
[Homebrew](https://brew.sh/), which can be installed using the following 
command.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Your `$HOME/.zshrc` file should also contain this to properly 
load `brew` at shell startup:

```sh
eval "$(/opt/homebrew/bin/brew shellenv)"
```

See the [Shell](./darwin.md#shell) section below, which already takes care of this.

## Configuration

The system can be further customized using the `defaults` command, see 
[macos-defaults.com](https://macos-defaults.com/) for more information.

### Dock

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

### Editor

For those who want a simple modal editor, `nvi` is an excellent choice.

```sh
brew install nvi
```

### Finder

Configure the finder to show folders first.

```sh
defaults write com.apple.finder "_FXSortFoldersFirst" -bool "true"
```

Configure the finder to show all file extensions.

```sh
defaults write NSGlobalDomain "AppleShowAllExtensions" -bool "true"
```

Run the following command for the changes to become effective.

```sh
killall Finder
```

### Git

macOS automatically creates `.DS_Store` files all around the file system.
This can be annoying, when sharing code with others using a version 
control system like Git. We can utilize a global `.gitignore` file, 
in order to avoid that problem.

Create a global `.gitignore` file.

```sh
echo ".DS_Store" > "$HOME/.gitignore"
```

Tell Git about the `.gitignore` file.

```sh
git config --global core.excludesfile "$HOME/.gitignore"
```

### Shell

On macOS the default shell is `zsh`. In order to have some niceties, such
as colored output for some commands and Homebrew integration, we will 
install my custom configuration.

Use `curl` to download the `$HOME/.zshrc` file.

```sh
curl -o "$HOME/.zshrc" "https://raw.githubusercontent.com/notfirefox/zsh-config/main/.zshrc"
```

Source the `.zshrc` file for the changes to become effective.

```sh
. "$HOME/.zshrc"
```

### Terminal

Instead of using Apple Terminal, it is recommended to use something like
[iTerm2](https://iterm2.com/) instead.

```sh
brew install --cask iterm2
```
