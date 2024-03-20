# 什么是zkEVM(Zero-Knowledge Ethereum Virtual Machine) ？

ZKEVM（Zero-Knowledge Ethereum Virtual Machine）是一种利用ZK-SNARK技术为类似以太坊的交易创建执行的密码学证明的技术。这些证明可用于通过减少验证交易所需的计算负担或构建高效可扩展的ZK-rollups来使以太坊区块链更具可扩展性。

1. zkEVM协议的三个主要组件是：
   1. 受信任的序列化器：负责接收、排序和批处理L2交易，然后将其提交给L1上的共识合约。它还向L2节点广播批次以实现快速的最终性。
   2. 受信任的聚合器：基于受信任的序列化器的批次计算L2状态，为计算完整性生成零知识证明，并在提交L2状态根之前验证这些证明。
   3. 共识合约（PolygonZkEVM.sol）：由序列化器和聚合器在与L1的交互中使用。序列化器将批次存储在此合约中，而合约验证聚合器的证明，确保安全性和与L1的兼容性。

有几种旨在提高以太坊可扩展性的Layer 2解决方案，特别是在减少燃气费用并保持去中心化和安全性的同时提高交易速度方面。

Polygon zkEVM是一种Layer 2 Rollup解决方案，将数据可用性和执行验证结合在以太坊区块链的第1层，以确保L2状态转换的安全性和可靠性。

利用Polygon SDK构建Manta Pacific自己的zkEVM，从其Layer 2 Rollup设计中受益，以确保L2状态转换的安全性和可靠性。

# 过渡到使用Polygon CDK的zkEVM

在Manta Pacific：Manta Pacific Beta的第3章中，将通过使用Polygon CDK过渡到zkEVM。目标是通过利用Polygon CDK完全过渡到zkEVM。与此同时，Manta Pacific可能会探索一个过渡期，利用多证明者框架安全地迁移到完全的zkEVM。多证明者将集成Polygon的ZK证明器以及现有的OP Stack rollup，使Manta Pacific同时享有Polygon ZK证明器集群和Manta现有集群的优势，从而在多个方面获得利益。过渡期间的多证明者架构将增强网络的稳健性；结合Celestia DA，Manta Pacific的多证明者系统仍将为用户提供低成本的L2系统。

Manta Pacific打算完全过渡到zkEVM并利用Polygon的ZK证明器。网络架构的最终阶段将是Manta的Universal Circuits，用于内置ZK功能，以启用各种ZK应用程序，同时结合Celestia DA、zkEVM和Polygon CDK以实现可扩展性。

# 为什么选择Polygon CDK

作为一个ZK dApp中心，Manta Pacific的安全性和最终性很重要，要利用ZK技术。ZK证明意味着最终性可以在几分钟或几秒钟内实现，而不是几天。CDK通过利用数学的安全性而不是欺诈证明的社会经济激励，提供了强大的ZK证明实现。

此外，Manta Pacific需要一个模块化和独立的框架，能够处理独特的ZK dApp生态系统的定制要求。模块化和独立性对于Polygon CDK至关重要，其可配置性符合Manta Pacific短期需求，并为长期提供最大的灵活性。

最后，Manta Pacific计划通过与以Polygon CDK构建的链的可互操作的块空间和流动性进行信任的ZK桥接。将来，这将使原子L2到L2交易成为可能，扩大了Manta Pacific上的流动性dApp可以访问的范围。通过加入与以太坊的共享、无信任的ZK桥接，Manta Pacific将成为一个不断增长的L2生态系统的一部分，保持链的独立性，而不牺牲可定制性。

# 未来规划

迁移到具有Polygon CDK的ZK L2将解锁Manta Pacific的最终愿景：成为一个强大的ZK dApp生态系统，由其Universal Circuits SDK提供支持。开发ZK dApp应该是一件容易的事，而不必首先了解加密学的复杂性。Universal Circuits及其库抽象了编写自定义ZK电路的复杂性，使Solidity开发人员能够构建诸如符合DeFi的私人支付或Web3社交的zk身份保持验证等功能。作为构建ZK技术的核心开发人员，将Manta Pacific的最佳ZK生态系统与ZK基础设施的所有优势保持一致是非常重要的，而且要在Polygon CDK的EVM等效环境中实现这一点，这意味着现有的开发工具可以直接使用。

此公告标志着Manta Pacific迈向完全主网的第一步，目前正在进行主网Alpha阶段。随后，我们将公布更多信息，例如与Celestia的DA集成以降低燃气费用，以及完整主网启动的最终低成本、高性能规格。
