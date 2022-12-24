# Manta Signer

**Signer** 是供 Manta Network, Calamari Network 和 Dolphin 测试网使用的 **密钥管理器** 以及 **[零知识证明](ZKP.md) 生成器**。

## 为什么需要 Signer?

Manta 协议坚持隐私至上，而零知识证明是协议设计和功能至关重要的部分。有且只有你自己知道的密钥是你在区块链上身份的证明。而 **Signer** 则是这些密钥的计算延伸，能够在其基础上构建证明。你（有且只有你自己）可以将这些证明发送到区块链上以更新账本。

我们的目标是改进零知识证明生成的性能，并最终去掉 signer。

## Signer 和 Polkadot.js/Talisman 钱包的区别?

Polkadot.js 和 Talisman 钱包控制公共地址的花费密钥。而 **Manta Signer**  控制的是 [隐私地址](zkAddress.md)的花费密钥。
