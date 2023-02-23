# 🐬 通过 Dolphin 测试网体验 MantaPay

MantaPay 允许用户进行公开资产的隐私化、隐私资产的转账以及将隐私资产赎回为公开资产 (如下图所示)。

<div style={{textAlign: 'center'}}>
<img alt="MantaPay Overview" src="/img/guides/DolphinPay.svg" width="70%"/>
</div>

请注意: 公开资产和隐私资产有着不同的地址(公开地址 vs 隐私地址)，且公开地址和隐私地址之间没有关联性。

## **设置测试网账户**

### **安装 Polkadot.JS 浏览器插件并创建公开地址**

目前，V2 版本Dolphin 测试网支持用户使用 Polkadot. JS 插件来管理公开资产。

[下载 *polkadot.js* 浏览器钱包](https://polkadot.js.org/extension/)，安装并打开插件，创建一个新的账户。

### 安装 [Manta Signer](https://signer.manta.network/) **并创建隐私地址**

Manta Signer 是零知识证明生成器和隐私管理工具。目前已支持以下系统版本：
- macOS
- Ubuntu/Debian
- Windows

当你首次打开 Signer，按照下图所示创建新账户:
<br/>

<div style={{textAlign: 'center'}}>
<img alt="signer-init" src="/img/guides/signer-init.png" width="50%"/>
</div>

<br/>

### **获取测试币**

加入 [Manta & Calamari's Discord](https://t.co/5BacMMLSCW)，跳转到 `#dolphin-faucet` 频道并输入 `/gimme`。你将看到一系列的水龙头选项:

<div style={{textAlign: 'center'}}>
<img alt="faucet" src="/img/guides/faucet.png" width="70%"/>
</div>

首先，你需要领取一些 `DOL` 用于支付 gas 费用，然后可以领取你喜欢的其它测试币，如 `KSM`, `ROC`, `kBTC`等等。

<br/>

## **体验 MantaPay 测试网产品**

现在来一起体验 MantaPay 隐私支付产品吧 :)

### 运行 Signer

如果您尚未运行 Signer，请打开 Signer APP，输入密码登录:
<br/>

<div style={{textAlign: 'center'}}>
<img alt="signer-login" src="/img/guides/signer-login.png" width="50%"/>
</div>

访问 [Dolphin App](https://app.manta.network/dolphin/transact)。可以看到右上角 Signer 已连接的标志：
<br/>

<div style={{textAlign: 'center'}}>
<img alt="signer-connected" src="/img/guides/signer-connected.png" width="30%"/>
</div>
<br/>
<br/>

### **将代币转换成为隐私代币**

选择将要进行转账的公开地址，想要发送到隐私地址的代币种类和数量，点击 "To Private" 提交:
<br/>

<div style={{textAlign: 'center'}}>
<img alt="to-private" src="/img/guides/to-private.png" width="50%"/>
</div>

最好，Polkadot.js 将弹窗提醒您进行转账确认，并将交易发布至 Dolphin 测试网区块链上:
<br/>

<div style={{textAlign: 'center'}}>
<img alt="polkadot-js-sign" src="/img/guides/polkadot-js-sign.png" width="50%"/>
</div>
<br/>
<br/>

### **隐私资产转账**

点击界面上方的 Public 按钮切换至 Private，这样您就可以在隐私地址间发送隐私资产了。选择你想要发送的代币种类，输入发送数量以及目标隐私地址。

如果你只是想要体验隐私地址转账，可以先转给你自己（点击隐私地址旁边的复制图标），或者可以直接转给下面这个地址:

`3ZUgqc84wUeFzh2ioRh9yRAM7m8CqunGxsMHHLP6sLus76B3YoLHeQ7jggoV8N1grMv6qu9sLC8oNjHFe2CgJy9s`

(请注意：隐私地址和公开地址格式不同，并且不可以相互转换)

点击 "Private Transfer" 开始转账。
<br/>

<div style={{textAlign: 'center'}}>
<img alt="private-transfer" src="/img/guides/private-transfer.png" width="50%"/>
</div>

Signer 将会提示你输入密码来确认交易。一旦得到确认，Signer 就会生成一个零知识证明。
<br/>

<div style={{textAlign: 'center'}}>
<img alt="private-transfer-approve" src="/img/guides/private-transfer-approve.png" width="50%"/>
</div>

<br/>

最终，polkadot.js 将弹窗提醒您进行转账确认，并将交易发布至 Dolphin 测试网区块链上。
<br/>
<br/>

### **将隐私资产赎回为公开资产[](https://docs-l6ldq5g4v-manta-fullstack.vercel.app/docs/guides/MantaPay#convert-private-assets-to-public)**

点击图片下方的 Private 按钮，切换至 private-public 模式，这样你就可以从隐私地址将资产赎回到公开地址。选择你想发送的代币种类，输入发送数量并选择目标公开地址。

<br/>

<div style={{textAlign: 'center'}}>
<img alt="to-public" src="/img/guides/to-public.png" width="50%"/>
</div>

Signer 将会再次提示你输入密码来确认交易。一旦得到确认，Signer 就会生成一个零知识证明。

最终，polkadot.js 将弹窗提醒您进行转账确认，并将交易发布至 Dolphin 测试网区块链上。
<br/>
<br/>

## **如果您在使用中遇到问题**

- 请确认是否安装 polkadot.js 插件，以及是否有权限连接 Dolphin 网页端 app；
<br/>
    <div style={{textAlign: 'center'}}>
     <img alt="polkadot-js-allowed" src="/img/guides/polkadot-js-allowed.png" width="70%"/>
    </div>

- 请确认是否下载并安装了最新版 signer，Signer 是否成功运行以及出于登录状态；
<br/>
    <div style={{textAlign: 'center'}}>
    <img alt="signer-connected" src="/img/guides/signer-connected.png" width="30%"/>
    </div>

- Brave 浏览器用户请检查是否开启了屏蔽模式；
<br/>
    <div style={{textAlign: 'center'}}>
    <img alt="brave-shields" src="/img/guides/brave-shields.png" width="70%"/>
    </div>

- 请确认是否已连接到节点（默认节点 Ford）以及网络连接是否稳定；
<br/>
    <div style={{textAlign: 'center'}}>
    <img alt="node-connected" src="/img/guides/node-connected.png" width="30%"/>
    </div>

- 请确认您的账户中有领取 DOL 作为手续费；
<br/>
    <div style={{textAlign: 'center'}}>
    <img alt="fee-balance" src="/img/guides/fee-balance.png" width="70%"/>
    </div>


如果您确认以上所有都没有问题，但是依然无法完成转账，请在 discord 中#dolphin-testnet 频道向我们反馈。
<br/>
<br/>

## FAQ

1. 为什么需要 *Signer*? 我可以信任它吗?

    *Manta Signer 主要有两个目的: 保护你的支付隐私；使用原生代码来构建零知识证明。Signer 在本地运行，绝不会泄露你的隐私。Manta Signer 是 [全开源软件](https://github.com/Manta-Network/manta-signer) 并会进行第三方审计。*

2. *Signer* 中的隐私代币是安全的吗 ?

    *所有用于隐私代币的花费信息都安全地储存在你的电脑里，并使用 [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 进行加密，绝不会在线泄露你的隐私。*

3. 如果我忘记了 *Signer* 密码，如何恢复我的隐私资产？

    *我们将很快增加密码恢复功能，敬请期待。*

4. 隐私支付的原理是什么？

    *[请点击阅读](..//learn/PrivatePayment.md)*
