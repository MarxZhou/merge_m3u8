# m3u8 to mp4

## 简介

该软件包的功能是将本地 m3u8 文件转换为 mp4 文件，以便进行任意形式的存储

### 开发原因

我在手机端经常使用 UC 浏览器观看视频，并且频繁使用 UC 的视频播放器进行缓存

之后我想将这些文件存储到其他的地方时，发现了 m3u8 的文件，所以才会有这一个包的出现

## 环境要求

您需要安装FFmpeg，并且已经为其配置好了环境变量

## 特别注意

使用之前请务必备份所有meu8文件

## 使用方法

首先，您应该将 UC 浏览器缓存的 m3u8 文件正确地在电脑硬盘中进行存储

- 在配置文件 `./config/index.js` 中填入正确的信息，然后通过 node 启动当前程序包
- 通过命令行启动，并传递正确的参数信息

## 命令行启动方法

可以通过内置脚本启动

```shell
npm start -配置项 参数值
```

也可以通过 node 直接启动入口文件

```shell
ts-node ./src/index.ts -配置项 参数值
```

## 配置参数

注意：所有路径分隔符均为正斜杠

| 属性：类型                                   | 默认值                                  | 说明                                                         |
| -------------------------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| inputPath: string                            | E:/m3u8Resources                        | m3u8文件的资源路径。通过命令行参数使用时，若仅有inputPath这个配置项，则可以不用输入 `-inputPath` |
| outputPath: string                           | E:/FFMpegOutput/videoData               | 转换后的视频输出路径                                         |
| backupPath: string                           | E:/FFMpegOutput/backupM3u8Files         | 原有的m3u8文件备份路径。资源路径中的m3u8文件会被修复为资源路径 |
| relativeBackupPath: string                   | E:/FFMpegOutput/relativeBackupM3u8Files | 采用相对路径方案进行修正的备份m3u8文件保存路径               |
| saveBackupM3u8File: boolean                  | true                                    | 转换成功后，是否需要保存备份的m3u8文件。包括原始备份路径和采用相对路径方案备份的m3u8文件 |
| outputFileExtension: ‘mp4’ \| ‘mkv’ \| ‘aiv’ | mp4                                     | 转换后视频文件的扩展名                                       |
| enableConvert: boolean                       | true                                    | 是否需要进行格式转换，测试使用                               |
| needRelativeBackupM3u8File: boolean          | true                                    | 是否需要生成相对路径的备份m3u8文件                           |

## 特别注意

由于 m3u8 文件关联着大量的其他文件，您必须确保以下几点才能够正常进行转换

- 请确保已将所有文件放在正确的、易读的全英文（不包括特殊字符）路径中
- 输出路径同样按照此要求进行处理
- m3u8文件名只能是中英日文、下划线、点号、中横线，其他文字或者特殊符号（例如空格）可能导致异常错误
- 备份和输出文件夹中不能存在文件，否则会抛出异常

## 更新内容

1. 调整了命令行参数

## 开发计划

以下计划存在较大不确定性，如有特殊要求，可以提交issue。

1. 提供更加合理的配置项（正在进行中，长期）
2. 提供国际化的命令行使用方式（正在进行中）。
3. 增加changeLog功能
4. 搭建一个文档网站。
5. 增加一个专门用来处理转换功能的桌面程序。
6. 增加网页资源检测、下载功能

## 错误提示

如果在转换格式时，控制台中出现了 `error` 错误，一般原因为当前m3u8文件的资源目录和目录中文件已经丢失

## 赞赏

如果这个包对您有帮助，且您有意愿的话，您可以通过以下方式对我进行支持，非常感谢。

如果您能够进行大额打赏的话，我将会成为您的JS、NodeJS开发顾问。

您的任何提问我都会在24小时内进行回复，您可通过邮箱 `marxzhou@aliyun.com` 联系我获取我最新的联系方式。

<div style='position:relative;'>
<img src="./assets/ali.jpg" alt="支付宝" style="zoom:35%;display:inline;float: left" />
<img src="./assets/wechat.png" alt="微信" style="zoom:26%;display:inline;flex: 1;float:left;" />
<div style='clear: both' />
</div>
