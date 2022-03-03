# 🤿 隐私支付

Manta 的愿景是为更广泛的区块链行业带来隐私保护，而让隐私变成现实中的应用一个很重要的部分就是构建简单实用的产品。我们早期构建的两个产品之一是 *_隐私支付_* 更具体地讲, *_一个多资产去中心化匿名支付协议_。*

## 工作原理

我们近期发布了一期详细介绍隐私支付协议的视频:

[![Tech Talk #1](./private-payment/tech-talk-1-thumbnail.jpg)](https://www.youtube.com/watch?v=qmRChiIDl2A)

你可以点击观看 [视频](https://www.youtube.com/watch?v=qmRChiIDl2A), [下载ppt](./private-payment/tech-talk-1-slides.pdf), 或者继续阅读接下来的内容，了解更多关于 *_隐私支付_* 的工作原理。

目前， *_隐私支付_* 的 formal specification 尚未开源, 敬请期待我们在不久未来的发布!

## 公共帐本

大多数加密货币的去中心化系统使用 *_公共账本_* 来追踪资产的去向。 公共账本存储每位用户余额的当前状态，一旦他们想要花费账户的余额，区块链会就这笔转账是否有效达成共识，继而更新账户状态。然而，想要验证公共账本上的一笔交易需要知道发送者和接受者以及转账的金额信息。我们希望找到一种方式来避免这种信息泄露，保护交易参与者的信息，并隐藏金额。 

## 去中心化匿名支付协议的特性

在设计一个 *_隐私账本_的时候，我们希望它可以具有以下特征：*

1. 一笔交易不能改变一种资产的总供应量。只有未来能够花费资产的 *_所有权_*会改变*。*

2. 账本读取不会泄漏交易或者现有用户的任何信息。

这两种特性看似互相矛盾，一方面我们希望验证某种资产总量保持不变，另一方面我们又不希望获取到交易的具体信息。

幸运的是，一些密码学协议找到了解决办法—— zkSNARKs, *_简洁非交互式零知识证明_*. 我们之后会看到它们在隐私支付协议中起到了什么样的作用。

## 概览

我们会先描述一个相对简化的协议版本，假设有两个任务`Alice` 和 `Bob`, 我们希望能找到一种方法让`Alice` 用一个隐私 `账本`发送资产给 `Bob` 。我们会按照接下来的几个步骤来进行演示：

1. [发送和接收](#send-and-receive)

2. [共享密钥](#shared-secrets)

3. [加密和解密](#encrypt-and-decrypt)

4. [所有权证书](#ownership-certificates)

5. [零知识转账证明](#zero-knowledge-transfer-proof)

这个讨论并没有完整独立地描述整个协议，我们将尝试通过黑盒的方式来解释一些密码学的协议的接口和安全性保障。建议大家对以下的每个话题都进行更深入的了解。

### 参与者 (详细)

- `Alice` (*_发送者_*): 已经获得了某种资产的所有权， 由 `账本` 保证她可以花费。
- `Bob` (*_接收者_*): 可以被其他 *_发送者_识别，*未来可以花费所接受到的资产 。
- `账本: 代表所有公开信息 ( *_状态_*) 和验证者网络 (*_区块链_*) ，验证者可以就 *_发送者_和* *_接收者_*之间发生的隐私转账中的所有权转移达成共识*。*

## 发送和接收

当`Alice` 想要转账给 `Bob`, 她使用 `账本` 作为中介。`账本` 进行 *_异步处理_* 并被传播于整个网络。因此，很多计算机都可以获取 `账本`，并向整个网络发送信息或者从整个网络获取信息。 `Alice`会向`账本`发送一条转账信息，如果被接收，将在 `账本`中更新状态, 变动会向全网进行广播。 `Bob` 会向网络请求最新的状态。如果有新的`账本`状态，他将下载并分析是否收到了新的资产，以下为两个协议的详情:

### 发送

`Alice` 一开始需要构建一个特殊的数字叫作$\textsf{SK}_\textsf{E}$, *_临时密钥_*, 可以用来代表本次独有的转账。这个是通过 `Bob`的 *_公钥_*, $\textsf{PK}_\textsf{B}$, 以及`账本` 中一部分公开数据，还有一些随机数来构建的:

![Send Protocol](./private-payment/send-protocol.png)

*_承诺方案（commitment scheme）_ 通过* $\textsf{PK}_\textsf{B}$ 将 $\tau$ 作为其随机数（A.K.A blinder，trapdoor）确保 $\Lambda$（账本检查点）隐私安全：

$$

\textsf{SK}_\textsf{E} := \textsf{COM}(\Lambda || \textsf{PK}_\textsf{B}, \tau)

$$

临时密钥只会用一次。 `Alice` 之后需要证明她正确地构建了$\textsf{SK}_\textsf{E}$, 也叫 *_开启_* 了承诺。承诺被*_绑定_意味着* `Alice` 不能改变主意，找到另外一个公钥或账本检查点来构建同样的临时密钥。Trapdoor $\tau$ 给予我们 *_可隐藏_*的特性，即便有人知道 $\Lambda$ 和 $\textsf{PK}_\textsf{B}$ ，他们也不能在不知道$\tau$的情况下预测 $\textsf{SK}_\textsf{E}$ 是什么。

`Alice` 现在使用临时密钥 $\textsf{SK}_\textsf{E}$, 她自己的密钥 $\textsf{SK}_\textsf{A}$, 以及之前她从`账本` 所收到的资产，来构建一笔*_隐私资产_。*我们接下来来看下隐私资产具体是如何构造的。 

### 接收

一旦`Alice` 完成了与`账本` 之间的通讯，`账本`接受了她的隐私资产，将会永久地储存隐私资产，并等待有人来领取。`Bob` 希望来领取，于是他向 `账本` 请求了所有最新的隐私资产。`账本` 将这些信息发送给`Bob` ，他可以用他的密钥 $\textsf{SK}_\textsf{B}$ 来对隐私资产进行扫描，找到属于他的那笔。

![Receive Protocol](./private-payment/receive-protocol.png)

 `Bob` 在扫描过程中使用的密钥必须是从`Alice`构建隐私资产所用的公钥$\textsf{PK}_\textsf{B}$所*_派生出来的_。* 这个 *_密钥派生_* 的过程必须是不可逆的，这样就没人可以发现 $\textsf{SK}_\textsf{B}$ 是来自于 $\textsf{PK}_\textsf{B}$的知识。

- ***请注意***: 因为 `账本` 会存在相当长的一段时间，`Bob` 可以等到任何想要领取的时候操作。

## 共享密钥

可 `Bob`怎么领取他的新资产？未来他如何花费这些资产？

我们可以用到的一个很重要的密码学工具是 *_共享密钥_。*本质上，我们向要找到一种方法来将信息包裹起来，只有两个人有解开的方法。 让某个人保守秘密是很容易的，只要他们不告诉其他人就可以了。但是如何才能将机密告诉另外一个人，而且只有你们两个人知道呢？

最常见的方法之一是使用 _*Diffie-Hellman Key Exchange*_ 协议。 在这个协议中，我们采取了一个假设不可能逆转的操作（在有效时间内），我们称之为 $\textsf{bind}$，以及一个所有人都同意的公共常量 $G$。 我们令 $\textsf{bind}$ 和 $G$ 具有以下属性：

$$

\textsf{bind}(y, \textsf{bind}(x, G)) = \textsf{bind}(x, \textsf{bind}(y, G))

$$

我们通过$x$ 和 $y$ 密钥并调用 $X := \textsf{bind}(x, G)$ 和 $Y := \textsf{bind}(y, G)$ 方法生成公钥。 由于 $\textsf{bind}$ 是不可逆的，我们可以将公钥 $X$ 和 $Y$ 公开提供给任何人，或者即使我们想要加密，我们仍然可以发送 $X$ 或 $Y$ 给特定的人，且不必担心有人可以对我们的密钥进行逆向工程。

因为 $\textsf{bind}$ 函数具有上述属性，所以信息加密方法为：

$$

S := \textsf{bind}(y, X) = \textsf{bind}(x, Y)

$$

因此，如果您与某人共享您的公钥 $X$ 并获得他们的公钥 $Y$，那么你们俩都可以进行传输加密 $S$。 通过以上方法，`Alice` 和 `Bob`成功传输了几条加密信息。

## 加密和解密

`Alice` 和 `Bob`使用 *_共享密钥* *_*加密方式的第一个步是共享 *_加密*公钥 *_*。 这些密钥用于将我们想要在秘密消息中传输的资产价值从`Alice` 发送给`Bob`。 这称为*_线上传递_*。

### 加密

为了让`Alice`将资产发送给`Bob`，她使用_*混合公钥加密方案*_来_*加密*_资产。 她通过获取`Bob`的公钥 $\textsf{PK}*\textsf{B}$* 和此特定交易 *$\textsf{SK}*\textsf{E}$ 的*_临时密钥_* 并执行 Diffie-Hellman 交换（在这种情况下使用椭圆曲线定义 $\textsf{bind}$ 函数），以计算共享加密密钥 $K$。

*<!-- ![Encryption](./private-payment/encryption.png) -->*

![Encryption (Full)](./private-payment/encryption-full.png)

`Alice`然后使用 *_Blake2s_*密钥派生函数生成另一个密钥 $K^*$，*这是标准*_AES-GCM_*具有消息身份验证的加密方案的正确方式*。* `Alice`使用 *$K^*$ 加密资产，并将派生的公共临时密钥 $\textsf{PK}_\textsf{E}$ 附加到密文消息中。 这一步骤构成了`Alice`发送给`账本`的完整私有资产。

### 解密

收到加密资产后，`Bob`将从`账本`下载发给他的私有资产，并查看是否有任何新资产是他可以使用的，他将尝试通过`Alice`的公钥来解密它们。

*<!-- ![Decryption](./private-payment/decryption.png) -->*

![Decryption (Full)](./private-payment/decryption-full.png)

在这种情况下，`Bob`使用他的密钥 $\textsf{SK}*\textsf{B}$* 和附加到私有资产的公共临时密钥 $\textsf{PK}\textsf{E}$ ，构建 Diffie-Hellman 共享密钥 $K$，然后使用相同的 *_Blake2s_* 函数推导出 $K^*$，然后执行 _AES-GCM_解密。* 解密将检查消息身份验证是否可以正确重建，如果密钥 $K^$ 与用于构建消息的密钥不同，它将失败，并且`Bob`将知道资产不是他的。 如果加密成功，那么 `Bob`会获得私有资产。

## 确权

现在我们知道`Alice`如何向`Bob`发送资产了。 但是，`账本`必须只接受可以证明发送的资产是*_未来可消费的_* ，同时保护所有相关方的隐私。 如果仅是`Alice`向`Bob`发送加密资产并不意味着她不能再次发送它，或者将它发送给其他人。 我们需要一种方法来跟踪谁拥有什么，并能够在有人花费资产后夺走这种权力。

为了满足这个约束， `Alice` 会生成两种证书，*_UTXOs_* 和 *_void numbers_。*

*_UTXO_*或 *_Unspent Transation Output_*是接收者未来可以花费的证书。 它以下列方式在公共账本协议中使用：

1.证明`Alice` 拥有当前UTXO

2.从`账本`中删除`Alice`的UTXO

3.为`Bob`创建一个新的UTXO

通过这种方式，当前的 UTXO 集合代表了所有拥有一定数量资产以及他们的用户。 为了让`Alice` 花费她的资产，她需要出示一个证明$\textsf{CM}_\textsf{A}$，它代表`Alice` 是过去交易的接收者。 她需要证明 `账本` 以前见过这个 UTXO。

![Ownership Certificates](./private-payment/utxo-explanation.png)

要将资产转移给`Bob`，`Alice` 会为`Bob` 生成一个名为 $\textsf{CM}*\textsf{B}$* 的新 UTXO*。* `Alice`需要以某种方式撤销她的旧 UTXO*。* 她通过生成一个  *_void number_* $\textsf{VN}\textsf{A}$ 来做到这一点，这与她的 $\textsf{CM}_\textsf{A}$ 相关联，其方式如下：

1.相同的 $\textsf{CM}*\textsf{A}$* 将始终生成相同的 *$\textsf{VN}*\textsf{A}$。

2.不同的$\textsf{CM}$生成不同的$\textsf{VN}$。

3.没有人知道 $\textsf{VN}*\*textsf{A}$ 属于哪一个 $\textsf{CM}\textsf{A}$。

4.只有`Alice`可以构造$\textsf{VN}_\textsf{A}$。

让我们看看 $\textsf{CM}$ 和 $\textsf{VN}$ 是如何构造的。

### 接收证书

为了让`Alice` 能够以`Bob`的名义创建 $\textsf{CM}\textsf{B}$*，*她需要计算了另一个共享密钥，称为 $\textsf{T}\textsf{B}$ trapdoor， 并到 UTXO 发布 $\textsf{CM}_\textsf{B}$承诺证明。

![Receiver UTXO](./private-payment/utxo-construction.png)

承诺是由`Alice`想要转移的资产数量和trapdoor组成。 trapdoor是保证*_隐藏_*属性的随机部分。 承诺的*_binding_*  属性确保`Alice`不能将一些虚假信息放入承诺中，防止`Bob`最终得到一些他无法花费的资产。

### 发送方证明

为让`Alice`生成她的void number证明，需使用她的trapdoor $\textsf{T}\textsf{A}$构建$\textsf{CM}\textsf{A}$ ，并提交她的密钥 $\textsf{SK}_\textsf{A}$。

![Sender UTXO and Void Number](./private-payment/void-number-construction.png)

$\textsf{VN}\textsf{A}$ 之所以与void number证明相关，因为它使用相同的 trapdoor，并且只有 `Alice`可以执行此计算，因为 $\textsf{SK}\textsf{A} $只有她知道。

为了证明她的 UTXO 已经在`账本`上，`Alice` 可以创建一个*_Merkle-Proof_*，$\pi_\textsf{A}$，证明这一事实。

## 零知识转账证明 

但Alice` 已经秘密完成了所有这些计算，并涉及大量秘密信息，如果她与任何人分享，这些信息将危及她的账户。 `账本`怎么能相信她诚实地进行这个计算呢？

`Alice` 可以利用 zkSNARKs，*_简洁非交互式零知识证明_*在自己的机器上进行完全的运算，zkSNARKs 的工作原理如下：

1. `Alice` 和 `账本` 就验证的某种算法公开达成共识，他们共同决定算法中哪些变量是机密的，哪些是可以公开的。

2. `Alice`在自己的机器上，用自己选择的机密和公开输入进行算法运算。

3. 使用运算的输出，`Alice` 构建了一个可以证明运算是正确的$\pi$(因为简洁性，相比于算法大小，这只是一个很小的文件）

4. `Alice`将 $\pi$ 发送给 `账本` ， `账本`可以快速验证是否产生文件的运算就是之前两人达成共识的算法，以决定是否要接受还是拒绝。

![ZKP Details](./private-payment/zkp-details.png)

`Alice` 可以使用 zkSNARKs 来运算以上 *_隐私支付协议_*中不同的 objects。当她在做这些的时候，通过可以获得以下的隐私保证：

1. ****隐私发送者****: 因为 $\textsf{CM}_\textsf{A}$ 和 $\pi_\textsf{A}$ 是机密的, `账本` 并不知道哪个 UTXO 属于 `Alice`, 知道的只是储存于 `账本`之中的其中一个。

2. ****隐私接收者****: 因为 $\textsf{SK}_\textsf{E}$ 的构建属于机密, 没有人知道它来自 $\textsf{PK}_\textsf{B}$。

3. ****隐私资产****: 因为 $\textsf{SK}_\textsf{E}$, $\textsf{PK}_\textsf{B}$, 和资产金额都是机密，除了`Bob` 外，没有人可以对加密的资产进行解密。

这样，我们就成功地构建了一个隐私支付协议！

## 通用的 N-to-M 转账协议

一般来说, 如果想要拥有可用的钱，我们需要的不仅仅是一个1对1的转账，比如，如果 `Alice` 向 `Bob` 转了5个（代币），而`Bob`想向`Carol` 转3个, 他不能使用1对1，因为并不能分割资产。想要解决这一问题，我们将以上的协议类推到一个$N$-to-$M$协议。

![Generalized Protocol](./private-payment/generalized-protocol.png)

我们可以为每个 *_发送者_* and *_接收者_* 重复这一构建，这样 `Bob` 就可以将他的3个（代币）发送给 `Carol` 并将2个发给自己。因为整个协议是隐私的，除了`Bob` ，没有人知道他是这样做的。

## 了解更多

想要构建一个真正的隐私支付体系，你还需要了解更多的细节，比如隐私钱包、费用代理等等。目前，这些想法还在构想中，但是很快会有一些很酷的东西，敬请期待！