# 隐私支付

Manta 的使命是将隐私带入 Web3，而支持代币转账实现隐私是基础。我们所构建的首个并且最关键的功能是 _隐私支付_，具体来说就是 *MantaPay*，一个 _多资产去中心化匿名支付协议_。

与大多数区块链不同的是，Manta 网络上的同质化代币转账（比如支付）是受零知识证明保护的，因此也是隐私的。我们用下图来阐述二者的不同：

![private payment](../../../../../docs/concepts/resources/private-payment.png)

## 将任意代币隐私化

Manta 和 ZCash 的不同之处在于 Manta 支持将任意代币隐私化。Manta 立足波卡/Kusama 生态，通过 XCM（跨链通讯）来对波卡/Kusama 生态内的资产进行隐私化。未来，Manta 也可以通过跨链桥来将更多的资产隐私化。
