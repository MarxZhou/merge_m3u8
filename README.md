[English](./README.md) | [简体中文](./README.zh-CN.md)

# m3u8 to mp4

## Introduction

The function of this package is to convert the local m3u8 files to mp4 files for any form of storage.

### Reason for development

I often use the UC browser to watch videos on mobile phones, and I frequently use the UC video player for caching.

After I wanted to store these files elsewhere, I found the m3u8 file, so this package appeared.

## Environmental requirements

You need to install FFmpeg and it has been configured with environment variables.

### Usage

1. First, you should store the m3u8 file cached by UC browser on your computer hard disk properly.
2. Fill in the correct information in the configuration file `./config/index.js`.
3. Then start the current package through node.

### How to start

Can be launched via built-in script

```shell
npm start;
```

You can also start the entry file directly through node

```shell
node ./src/index;
```

## Special attention

As the m3u8 file is associated with a large number of other files, you must ensure the following points to be able to convert normally.

- Please make sure that you have placed all files in the correct, easy-to-read, all-English (excluding special characters) path.
- The output path is also processed in accordance with this requirement.

## New features

## Development Plan

The following plans have large uncertainties. If there are special requirements, you can submit an issue.

1. Rewrite project using TS.
2. Add complete lint hints and test cases.
3. Provide internationalized command line instruction prompt text.
4. Added the ability to load m3u8 files directly from the network, convert them, and then store them locally.
5. Add a website dedicated to conversion functions.
6. Add a desktop program dedicated to handling conversion functions.

## Appreciate

If your package is helpful to you and you are willing, you can support me in the following ways, thank you very much.

<div style='position:relative;'>
<img src="./assets/ali.jpg" alt="支付宝" style="zoom:35%;display:inline;float: left" />
<img src="./assets/wechat.png" alt="微信" style="zoom:26%;display:inline;flex: 1;float:left;" />
<div style='clear: both' />
</div>
