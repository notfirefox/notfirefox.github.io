---
title: "Bulk Renaming Files Using Vim"
date: 2023-01-25T20:16:02+01:00
tags: ["Linux", "Shell", "Vim"]
---
Bulk renaming files is a really cool and especially useful
feature. It shows the real efficiency that is possible
when someone knows how to use a computer efficiently.

## Tutorial

First we are going to open a vim buffer containing all
of the files names.
```sh
ls | nvim -
```

Now we are creating `mv` commands in each line.
```
:%s/.*/mv -i "&" "&"/g
```

Next we can modify the commands accordingly. Lastly we 
execute each `mv` command.
```
:w !sh
```

## Conclusion

Bulk renaming files can be very useful. This simple
but yet efficient trick can become very useful
at times when memorized.
