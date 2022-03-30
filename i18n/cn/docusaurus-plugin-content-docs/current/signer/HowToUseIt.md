# 🛠  如何使用

**Signer** 中保存这由 *_助记词_* 生成的 *_密码根_*，可以用 *_密码_* 对其进行加密保护。**Signer** 只有在你使用密码解开时才知道你的根密码，但如果你忘记了密码，可以使用助记词来恢复。

- **警告: 如果忘记了_密码_和_助记词_，你的帐户将无法恢复。**

## 签名（Signing）

使用*_密码根_来*创建证明或其他真实性证书的行为称为*_签名（signing）_*。 **Signer** 可以通过接收交易请求并为该请求提供证书（如果可以提出此类请求）代表您签署交易。例如，如果您使用 [MariPay](../calamari/MariPay.md) (或 [MantaPay](../manta/Overview.md))，您可以向**Signer**发送如下的转账请求：

```text
REQUEST: Send 5 private DOT to Alice.
```

知道你的余额， **Signer**可以用零知识证明做出回应，证明你有足够的私有 `DOT` 发送给 `Alice`, 如果你将该证明发送到 Calamari（或 Manta）网络，那么 `Alice` 将能够使用您发送给她的隐私的`DOT`。

## 如何请求

要向  **Signer** 发送请求，你可以使用 Calamari 和 Manta 网络的 dApp 前端。只要您的**Signer** 应用程序处于打开状态，它就会与你的浏览器创建一个_*双向本地通信通道*_，它可以在其中接收请求并发送回证明。 **Signer**  会在您打开它时提示你输入密码，以及某些交易类型（例如隐私转移你的资产和将隐私资产赎回为公开资产）。公开资产的转移由 dApp 前端处理，不需要使用 **Signer**。

## 如何处理报错

目前  **Signer** 仍是实验性软件，可能存在使用或安全问题。如果您在使用签名者时遇到问题，请在[GitHub] ([https://github.com/Manta-Network/manta-signer](https://github.com/Manta-Network/manta-signer))上提交问题。