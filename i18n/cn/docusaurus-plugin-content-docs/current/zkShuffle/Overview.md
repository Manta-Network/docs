# zkShuffle Alpha 文档

zkShuffle 为以太坊开发者提供了轻松创建“心理扑克”游戏的途径，利用零知识证明技术。所谓“心理扑克”是指在不涉及任何可信任第三方的通信系统上实现公平游戏协议的过程。这个术语最初是由 Adi Shamir、Ron Rivest 和 Leonard Adleman 在1979年的一篇论文中提出的，他们讨论了在其中玩家不能看到彼此的牌或自己洗牌和发牌的公平扑克游戏的构想。构建“心理扑克”游戏的挑战在于确保没有人能够作弊，同时保持通信的可靠性、效率和低成本。

zkShuffle 是一种强调在以太坊上降低燃气成本的高效心理扑克。zkShuffle 不仅可以应用于扑克游戏，还可以应用于许多需要在没有可信任第三方的情况下进行安全和公平的洗牌和发牌的卡牌或棋盘游戏。

## 状态图 

以下状态图概述了由 ShuffleManager 合约管理的游戏流程。要启动新游戏，首先必须创建游戏。创建后，管理合约为该游戏分配一个唯一的ID，玩家可以使用该ID加入游戏。一旦注册了最后一个玩家，游戏就开始了。玩家可以检查游戏中的当前轮次。如果轮到他们执行动作（洗牌、发牌或开牌），他们会相应地执行该动作。
![](https://hackmd.io/_uploads/By8S6Xg92.png)

## 主要组件 

### Circuits

此[目录](https://github.com/manta-network/zkShuffle/tree/main/packages/circuits) 包含 Circom 代码，用于实现 zkShuffle 的加密和解密电路。它还包含由 snarkjs 生成的相应的验证合约。 [阅读更多](https://github.com/Manta-Network/zkShuffle/tree/main/packages)

### Solidity 合约 

此 [目录](https://github.com/manta-network/zkShuffle/tree/main/packages/contracts/contracts/shuffle) 包含管理洗牌卡组并在链上验证证明的合约。它包括管理合约 ShuffleManager.sol，以及执行加密和解密等操作的辅助合约。管理合约负责创建新游戏、注册玩家、检查游戏状态以及执行游戏管理所需的各种操作。这使开发人员无需考虑技术细节，如洗牌和发牌，从而能够专注于游戏逻辑合约。 [阅读更多](/docs/zkShuffle/Circuits/ContractInterface)

### Typescript SDK（Alpha） 

此 [目录](https://github.com/manta-network/zkShuffle/tree/main/packages/jssdk) 包含 TypeScript SDK，作为与 shuffle manager 合约交互的标准接口。开发人员可以使用 SDK 生成 zk 证明并进行游戏的私钥和公钥管理。我们已将其发布为 npm 包，以便在前端实现中轻松导入。[阅读更多](/docs/zkShuffle/Circuits/TypescriptSDK)

### 游戏合约 

开发人员需要实现完整游戏的游戏合约，其中包含游戏逻辑，例如玩家采取行动的顺序和每张卡的效果。请查看此教程以获取一个简单示例： [教程](/docs/zkShuffle/Circuits/Tutorial)

### 用例 - zkHoldem 

zkShuffle 的一种独特用例是 zkHoldem，在这种情况下，zkShuffle 帮助根本消除了传统在线扑克行业中存在的信任问题。

通过利用 zkShuffle，zkHoldem 能够提供一个完全去中心化的卡牌洗牌和发牌机制，桌上的所有玩家将为他们使用的卡组贡献一部分随机性，从而有效地保证了以 zk 身份保持验证的方式下的卡牌分发的公平性。

网站: [www.zkholdem.xyz](https://www.zkholdem.xyz/)
