---
title: Info
---

[[TOC]]

# Info

## Our Mission

Our mission is to deliver high quality software for free, with potential payed services and APIs for developers.  As a nonprofit, we believe in donating money not needed by the company for costs that products may incur to charities.

## Omnipotence, Crucifix, and the WD_Bypass patch ecosystem

### Omnipotence

Omnipotence is the general use Python based patch. It was integrated into the main WD_Toolkit once the main toolkit was made.

```py:line-numbers {11}
import os
import subprocess

# Prompt the user to input the application name
appname = input("Choose the App you'd like to run (must be in same folder as Omnipotence.py)")

# Get the absolute path of the application
app_path = os.path.join(os.path.dirname(__file__), appname + ".exe")

# Construct the command to run the application 
command = f'cmd /min /C "set __COMPAT_LAYER=RUNASINVOKER && start "" "{app_path}""'

# Print the command for debugging
print(f"Executing command: {command}")

# Execute the command using subprocess.Popen
with subprocess.Popen(command, shell=True) as p:
    # Wait for the process to complete
    p.wait()
```

### Crucifix

Crucifix is the batch file/terminal command used in Omnipotence, but standalone. It has no plans of file-based distribution, but that may change.

```batch
cmd /min /C "set __COMPAT_LAYER=RUNASINVOKER && start "" "applicationfilenamehere.exe"
```

### Ecosystem

These are beta patches used for specific exe files. They weren't optimal or useful at all.

::: warning ⚠️ Deprecation Warning ⚠️
The Patches Ecosystem is deprecated now that a multi use file exists.
:::

## [KCSgate Combat Kit](/kcsgatecombatdata)

The KCSgate Combat Kit is a work in progress product that may be used to maliciously comply to the device policy, that may pertain to distribution of devices such as roatry phones, gramophones, etc.

[Back to Home](/)
