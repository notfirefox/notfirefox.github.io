---
title: "How to Download Music for Free"
date: 2023-02-04T22:01:45+01:00
tags: ["Linux", "Shell"]
---
So I have written a new script. It wraps
around [yt-dlp](https://github.com/yt-dlp/yt-dlp)
and it's called [mdl](https://github.com/notfirefox/mdl).
It downloads songs and albums from 
[YouTube Music](https://music.youtube.com/) including
album artwork and audio metadata. 

Here is an example demonstrating how trivial the usage of this script is.
```sh
mdl "https://music.youtube.com/playlist?list=OLAK5uy_kwSFpSgVWClQPCf-wK6Q1J8m8fDr4SrKM"
```

To install it just put the script into your `~/.local/bin` directory.
```sh
wget "https://raw.githubusercontent.com/notfirefox/mdl/main/mdl" -O ~/.local/bin/mdl
```
Then make the script executable.
```sh
chmod +x "$HOME/.local/bin/mdl"
```
