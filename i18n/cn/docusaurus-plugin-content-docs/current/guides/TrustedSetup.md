# 🔗 可信设置

请参阅[这里](../concepts/TrustedSetup.md) ，了解可信设置及其在 Manta Network 中的作用。 请继续阅读了解参与说明。

<div style={{textAlign: 'center'}}>
<img alt="Trusted Setup" src="/img/guides/trusted-setup-stages.svg" width="70%"/>
</div>

可信设置共分为两个阶段：
- 第一阶段：注册
- 第二阶段：Contribution

## 求助
如果您在此过程中遇到任何问题，请在[Discord](https://discord.gg/AZTZvK7X) 上联系我们。

您还可以查看[视频教程](https://www.youtube.com/watch?v=libknEDADHY&ab_channel=MantaNetwork)获得帮助。

## 下载客户端
:::note
快速安装目前支持以下操作系统：`macOS`、`Windows`、`Ubuntu` 和 `Fedora 36`。

而其他系统系统用户，可查看这个[**文档**](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup)
:::

### Mac、Linux安装
为了快速安装，请打开“终端”应用程序，应运行下列命令。
```sh
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/Manta-Network/manta-rs/main/tools/install.sh | sh
```

然后输入

```sh
source ~/.profile
```

快速安装完成后，输入
```sh
manta-trusted-setup register
```

安装完成后，请翻到后文的“注册”。

### Linux备选方案
上面的代码可能在Linux系统内无法运行。如果你安装了rust环境，可以运行下列代码。

```sh
sudo apt update
```

```sh
sudo apt install pkg-config build-essential libssl-dev curl jq
```

```sh
curl https://sh.rustup.rs/ -sSf | sh -s -- -y
```

```sh
source $HOME/.cargo/env
```

```sh
git clone https://github.com/Manta-Network/manta-rs.git
```

```sh
cd manta-rs
```

```sh
cargo run --release --package manta-trusted-setup --all-features --bin groth16_phase2_client register
```

如果你没安装rust，可下载该[**文件**](https://github.com/Manta-Network/manta-rs/releases/download/v0.5.5/manta-trusted-setup-x86_64-unknown-linux-gnu)，选择安装目录（例如输入 cd Downloads，意为将rust安装到Downloads目录下）

```sh
chmod +x manta-trusted-setup-x86_64-unknown-linux-gnu
```

```sh
./manta-trusted-setup-x86_64-unknown-linux-gnu register
```

上述代码可能不适用全部的Linux系统，若不适配，你可以从源代码来构建自己的客户端，请参考[这里](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup) 的指引。

### Windows安装

可直接在[**这里**](https://github.com/Manta-Network/manta-rs/releases/download/v0.5.5/manta-trusted-setup-x86_64-pc-windows-msvc.exe)下载`.exe`安装包。

如果你不想直接下载，可查看该链接下的[**源代码**](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup)

切换到你刚刚的下载目录(比如 `cd Downloads`)，然后执行下面这条命令
```sh
manta-trusted-setup-x86_64-pc-windows-msvc register
```

如果是Powershell环境里执行，则需要输入下列命令行

```sh
./manta-trusted-setup-x86_64-pc-windows-msvc register
```

安装完成后，请查看后文的**注册**。

### 使用源代码安装

如果你想利用源代码构建自己的客户端，请查看该[**链接**](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup)
## 注册

您将使用 Ed25519 签名签署您的贡献。 只有预先在 Manta Network 注册公钥的参与者才能参与，因此您必须按照以下步骤生成并注册公钥：

1. **生成签名密钥对**: 之前下载的客户端将为您生成您的隐私/公共签名密钥对。 打开一个终端并运行：
    ```sh
    manta-trusted-setup register
    ```

    您将被要求提供电子邮件地址和 Twitter 帐户。 在提供这些信息后，您将看到如下所示的提示：
    ![registration prompt](../../../../../docs/guides/resources/ts_guide_register.png)

2. **通过表单注册**: 将上一步中的信息复制到[此表格](https://mantanetwork.typeform.com/TrustedSetup)。 不包括助记词！ 请务必使用与上述相同的 Twitter 用户名和电子邮件地址，否则签名无效。

3. **存储秘钥**: 在安全的地方写下你的助记词（红色，见上图），不要与任何人分享。 如果没有这些，您将无法参加仪式！

## 贡献

注册的参与者可以在仪式进行期间随时贡献，只需使用以下命令执行此操作：

```sh
manta-trusted-setup contribute
```

当您输入该命令时，系统将提示您输入您在注册阶段保存的助记词（见上文）：

![提示输入密码](../../../../../docs/guides/resources/ts_guide_secret_prompt.png)

您需要做的就是输入您的秘码，其余的将自动运行。 有可能会显示您在贡献队列中，如下所示：

![排队中](../../../../../docs/guides/resources/ts_guide_queue.png)

此时您无需执行任何操作； 只需等待此过程运行，轮到您时您将自动做出贡献。 请注意，如果您关闭此任务，那么您将失去在队列中的位置！ 您仍然可以稍后重新启动任务来进行贡献，但将从队列的末尾重新排队。

当你到达队列的前面时，客户端将自动开始你的贡献，贡献过程可能需要5分钟，你什么也不需要做，当你的贡献完成后，它将被发送到我们的服务器进行验证。 你会看到这个：

![等待验证](../../../../../docs/guides/resources/ts_guide_awaiting_confirmation.png)

一旦服务器验证了你的贡献，你会收到一条确认信息：![success](../../../../../docs/guides/resources/ts_guide_success.png)

## 声明贡献

请在 Twitter （或其它公共论坛）上发布我们提供的消息来完成贡献最后一步。 虽然严格意义上这并非必须，但是可以通过公共记录来增强仪式本身的安全性。

最后，再次感谢您的参与！
