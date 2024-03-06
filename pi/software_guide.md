---
title: Software setup for Whomane Pin
description: add description
layout: default
parent: How to Guides
---

# Raspberry Pi Zero W Setup Guide
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
This guide provides step-by-step instructions for setting up a Raspberry Pi Zero W with the necessary software and configurations for development purposes.

## Prerequisites

- Raspberry Pi Zero 2 W
- MicroSD card (8GB or larger recommended)
- Internet connection
- Access to a computer with an SD card reader


## Installation Instructions

### 1. Download Raspberry Pi Imager

Download the Raspberry Pi Imager from the official Raspberry Pi website:

[https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)

### 2. Download OS Image

Download the Raspberry Pi OS Lite (64-bit) image from the following link:

[https://downloads.raspberrypi.com/raspios_lite_arm64/images/raspios_lite_arm64-2023-05-03/2023-05-03-raspios-bullseye-arm64-lite.img.xz](https://downloads.raspberrypi.com/raspios_lite_arm64/images/raspios_lite_arm64-2023-05-03/2023-05-03-raspios-bullseye-arm64-lite.img.xz)

### 3. Prepare SD Card

- Unzip the downloaded OS image.
- Insert your SD card into the computer.
- Run the Raspberry Pi Imager and select the unzipped OS image by clicking "Operating System > Use custom".
- Make the device selection as prompted.
- Edit settings to:
  - Enable SSH(under Services).
  - Add a username and password.
  - Add WiFi settings.
- Write the image to the SD card.
- 
<img width="1046" alt="imagerMenu" src="https://github.com/BasedSocialCo/whomane/assets/43514161/4b2a6bb8-d22f-4532-8c64-844ccfee28f6">
<img width="949" alt="osSelect" src="https://github.com/BasedSocialCo/whomane/assets/43514161/b2e537ed-fbae-4cf7-a203-4f797a654aeb">
<img width="534" alt="enableSettings" src="https://github.com/BasedSocialCo/whomane/assets/43514161/5292e159-4d6c-4b63-970d-7b0f6dd1c559">
<img width="539" alt="enableSSH" src="https://github.com/BasedSocialCo/whomane/assets/43514161/c5e9e4f2-724b-468c-9bfa-8145a840766b">


### 4. Boot Raspberry Pi

- Insert the SD card into your Raspberry Pi Zero W.
- Power on the device.
- Wait for the device to boot up (the light will stop blinking).

### 5. Connect via SSH

Open a terminal on your computer and connect to your Raspberry Pi using SSH:

```
ssh <yourusername>@raspberrypi.local
```

Replace `username` with the username you set up earlier. Accept the prompt and enter your password when asked.

### 6. Transfer Project Files

From a terminal on your computer (not connected to your
Raspberry Pi), transfer the project that [you should have installed](https://github.com/BasedSocialCo/whomane.git) to your Raspberry Pi. For that:

Copy the path of the whomane/pi folder (how to copy on [Mac](https://support.apple.com/en-gb/guide/mac-help/mchlp1774/mac#:~:text=Copy%20a%20folder's%20pathname%3A%20Control,Copy%20%E2%80%9Cfolder%E2%80%9D%20as%20Pathname.) and [Windows](https://www.howtogeek.com/670447/how-to-copy-the-full-path-of-a-file-on-windows-10/#:~:text=To%20copy%20the%20full%20path%20of%20a%20file%20or%20folder,in%20the%20File%20Explorer%20toolbar.)
Then run:
```
scp -r <paste_your_copied_path> <your_username_you_provided_before>@raspberrypi:~/
```


### 7. Run the Application

fter the reboot, navigate back to the project directory, make the run script executable, and start the application:

```
cd pi
```

```
python start.py
```

### 8. Setup auto-run

Congratulations! You have successfully set up your Raspberry Pi Zero W for development with your project.


Thanks to Shaun for initial template for this guide
