---
title: "Getting Rid of Sim Toolkit"
date: 2023-02-19T01:04:53+01:00
---
I installed [GrapheneOS](https://grapheneos.org/) on my phone 
and was slightly  bothered by a sim toolkit app. Here is how to uninstall it.
Go to your phone's settings and locate the build number.
Tap seven times on it. Developer mode should now be enabled.
Then enable USB debugging.
Connect your phone to a computer where `adb` is installed and run:
```sh
adb shell pm uninstall --user 0 com.android.stk
```
Disable USB debugging and then also disable developer mode.
