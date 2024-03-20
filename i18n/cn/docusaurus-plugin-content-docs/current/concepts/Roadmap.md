Manta Pacific于2023年9月12日 [正式推出其主网Alpha版本](https://mantanetwork.medium.com/manta-pacific-mainnet-alpha-launch-743c6bc2b95e) 。 Alpha代表了Manta Pacific的MVP——一种基于EVM的功能性L2，具有第一代通用电路。与此同时，Alpha仅代表了实现Manta Pacific愿景的众多里程碑之一。我们很高兴与Celestia和Polygon Labs一起揭开Manta Pacific旅程的下一篇章，这将使Manta Pacific成为使用Polygon Chain Development Kit（CDK）的模块化zkEVM。

Manta Pacific的推出将分为四个篇章，每个章节都将引入新的集成，带来越来越好的用户体验。这些章节将最终导致最终版本的Manta Pacific主网发布，该版本利用zkEVM使用Polygon CDK和Celestia的数据可用性（DA）以实现用户的最大性能、可伸缩性和安全性。第一章[已经发布并可用](https://twitter.com/MantaNetwork/status/1701583217143464171)。

Manta Pacific的过渡将为区块链行业现有问题提供独特的解决方案。这将是从乐观Rollup转换为使用Polygon CDK的Validium的第一个zkEVM L2，通过Celestia DA大幅降低Gas费用，并通过以太坊共识和链上活动的密码学证明提高安全性。

# **Manta 路线图细节**

<div style={{textAlign: 'center',marginBottom: '24px'}}>
    <img alt="/img/guides/multi-modular-platform.jpg" src="/img/guides/pacific-roadmap.png" width="70%"/>
</div>

## **第1章: Manta Pacific Alpha (以太坊 L2)**

在当前可用性中，Manta Pacific是以太坊上的一种 Optimistic Rollup，使用以太坊 DA。它利用 Manta Network 的Circuits ，使开发人员能够仅使用 Solidity 和通用Circuits SDK 快速构建、测试和部署支持零知识证明（ZK）的应用程序。目标是基于 Manta zkSBT 和通用Circuits （如  [zkShuffle](https://docs.manta.network/docs/zkShuffle/Overview)）构建 dApp 生态系统。 

在 Manta Pacific 上，开发人员通过利用 Manta 的通用电路和 OP Stack 的低燃气费用和可扩展性，构建了独特的支持 ZK 的 dApps，这在现有的 Layer 2 中是前所未有的。具体而言，Manta Pacific 提供了通用电路用于流行用例（例如 [card shuffling/dealing](https://github.com/Manta-Network/zkShuffle) 和私有链上投票），Solidity 智能合约用于链上 ZK 逻辑，以及用于前端集成的 TypeScript SDK。

基于 Manta 的通用Circuits ，没有 ZK 背景的开发人员可以轻松地使用 Manta Pacific 开发具有内置 ZK 功能的 dApps，而无需花费数年的工程师工作来定制 ZK Circuits 。与 Starkware 和 Aztec 不同，后者重新设计了专用于 ZK 的领域特定语言（DSL），如 Cario 和 Noir，Manta Pacific 通过采用 OP Stack Bedrock 的代码库实现了 EVM 等效性。因此，所有现有的以太坊智能合约都可以无缝地迁移到 Manta Pacific，同时启用基于 ZK 的功能，揭示新的应用场景，如[verifiable private DID/KYC](https://www.binance.com/en/feed/post/458948),、基于 ZK 的完全链上游戏，以及 DeFi 和去中心化私有身份之间的协同关系，包括基于 zkSBT 的白名单和出口通道。

## **第二章：Manta Pacific Alpha II（+ Celestia DA） **

在下一章中，Manta Pacific 将通过集成 Celestia 的模块化 DA 实现数据扩展，从而大幅降低用户与 Manta Pacific 生态系统内的 dApps 交互时的Gas费用。

Manta Pacific 目前在结算中使用 calldata，其成本与以太坊上的Gas价格成线性关系，并根据以太坊的使用情况波动。相反，Celestia 的成本对以太坊Gas价格是次线性的，将显著便宜于以太坊上的现有成本。虽然有通过 [EIP-4844](https://www.eip4844.com/), 减少Gas成本的计划，但它仍然比 Celestia 的成本更昂贵，而且区块空间在未来仍将是一个新兴问题。

## **第三章：Manta Pacific Beta（+ 过渡到 zkEVM）**

在本章中，目标是通过利用 Polygon CDK 完全过渡到 zkEVM。同时，Manta Pacific 可能会在过渡期间探索利用多证明者框架安全迁移到完全的 zkEVM。多证明者将集成 Polygon 的 ZK 证明生成器与现有的 OP Stack Rollup，以使 Manta Pacific 同时享受 Polygon ZK 证明生成器集群和 Manta 现有集群的优势，从而在多个方面获得好处。过渡期间的多证明者体系结构将增强网络的稳健性；结合 Celestia DA，Manta Pacific 的多证明者系统仍将为用户提供低成本的 L2 系统。

Manta Pacific 打算完全过渡到 zkEVM 并利用 Polygon 的 ZK 证明生成器。网络架构的最终阶段将是 Manta 的通用电路，用于内置 ZK 功能，以启用各种 ZK 应用，同时将 Validium 服务与 Celestia DA 和 zkEVM 与 Polygon CDK 相结合以实现可扩展性。

## **第四章：Manta Pacific Mainnet Production I (+Universal Circuits 2.0)**

对于 Manta Pacific 主网，Manta Pacific 将进一步升级通用Circuits ，以实现更低的Gas成本、支持更多用例并提供更好的用户体验。首先，Manta Pacific 将集成 ZK 证明聚合，以大幅减少链上证明验证的Gas成本，并提高 ZK 处理的吞吐量。

其次，Manta Pacific 将集成额外的 ZK 方案和相应的智能合约，以支持更多的 ZK 启用实用程序。 

第三，通过与账户抽象项目的合作，Manta Pacific 将提供更好的用户体验。

最后， **_Manta Pacific 将实现模块化、去中心化、高可扩展性、低燃气成本和完全 EVM 等效性，同时通过新颖的 ZK 技术解锁新的应用场景。_**

# **展望 Manta Pacific 的未来 **

完成第四章后，Manta Pacific 的完整主网启动将完成。与此同时，用户能够充分利用网络，与生态系统内的 dApps 进行链上交互，就像在任何其他 L1 或 L2 中一样。与此同时，随着 Manta Pacific 底层架构的不断发展，用户将在与 Manta Pacific 生态系统应用的日常交互中看到显着的差异，以及显著的改进。

Manta Pacific 将通过 ZK 启用和可扩展性解锁下一代 dApps。在测试网中，Manta Pacific 已经看到了超过 200 个经过验证的合约部署，将各种去中心化应用引入生态系统。我们期待着实现这一目标，并感谢社区的支持。
