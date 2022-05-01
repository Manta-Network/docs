# 🐬 DolphinPay

DolphinPay 实现了波卡生态内资产的隐私化，以下为 DolphinPay 概览:

![概览](./private-payment/DolphinPay.svg)

## 体验 Dolphin ( Boto 版本)

1. [下载 **Signer**](https://github.com/Manta-Network/manta-signer/releases/tag/0.5.1), Manta、Calamari 和 Dolphin 的原生零知识证明生成器和隐私管理工具。
    * macOS
    * Ubuntu/Debian
    * Windows

    macOS 用户需要在 `系统偏好设置 -> 安全和隐私 -> 通用` 中设置来使用 **Signer** (我们正在努力得到苹果系统的认可，这需要一段时间)

    ![signer-security](./private-payment/allow-signer.png)

    当你首次打开  **Signer**，它会让你创建一个密码，并记住12位助记词。

2. 获取测试代币:

    * 加入 [Manta&Calamari's Discord](https://t.co/5BacMMLSCW)
    * 找到`#dolphin-faucet` 频道
    * 输入 `/gimme` 你会看到一系列水龙头选项:

    ![faucet](./private-payment/faucet.png)

    * 你首先需要领取 `DOL`作为手续费。然后可以领取你喜欢的其它测试币，如  `BTC`, `ETH`, `DOT` 等等

3. 访问 [Dolphin App](https://app.dolphin.manta.network/), 体验各种功能:

    * 将代币转换成为隐私代币:

    ![to-private](./private-payment/to-private.png)

    * 切换到 `private` 你可以看到自己的隐私代币余额：

    ![private-transfer](./private-payment/private-transfer.png)

    * 发送隐私代币: 隐私代币背后需要有一次性隐私保护地址，也就是说，在发送隐私代币前，你需要拿到对方的`一次性隐私保护地址`，可以通过 Signal 或 Telegram 发送。

    * 如果你想要接收隐私代币, 可以通过 `private -> receive -> new address`获取一次性隐私地址

    ![shielded-address](./private-payment/shielded-address.png)

    * 将隐私代币赎回为公开代币:

    ![to-public](./private-payment/to-public.png)

## FAQ

1. 为什么需要 **Signer**? 我可以信任它吗 ?

  _*Signer* 主要有两个目的: 保护你的签名私钥；使用原生代码来构建零知识证明。 *Signer* 在本地运行，绝不会泄露你的隐私。 The *Signer* 是[完全开源的软件](https://github.com/Manta-Network/manta-signer) 并将进行第三方审计。_

2. **Signer** 中的隐私代币是安全的吗 ?

  _所有用于隐私支付签名的私钥都是存储在本地，并使用 [*AES*](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)进行加密，*Signer* 绝不会泄漏私钥。_

3. 什么是一次性隐私地址？它和波卡/Manta地址有什么不同？

  _Dolphin 测试网 (Boto版本) 使用的是一次性隐私保护地址，隐私和安全起见，该一次性地址比典型的波卡/Manta地址要长。在测试网的下个版本，我们将采用可重复使用的隐私保护地址。_

4. 我需要隐藏好我的一次性隐私保护地址吗？其他人可以通过一次性隐私保护地址跟踪到我的转账吗?

  _MantaPay 协议采用 UTXO 模型，一笔转账的输入和输出都是受零知识证明保护的，因此即便别人知道你的一次性隐私保护地址也不能追踪到你的任何转账。_

5. 1. 如果忘记了 **Signer** 密码如何恢复自己的隐私资产？

  _我们将很快增加密码恢复】功能。_

6. 隐私支付的运行原理是什么?

  _[点击了解更多](PrivatePayment.md)_