# Celestia

通过利用Celestia的[数据可用性（DA）](https://blockworks.co/news/data-availability-ethereum)，Manta Pacific以比传统L2更低成本的方式提供了高速基础架构。Celestia采用先进的数据可用性采样技术——二维Reed-Solomon编码和命名空间默克尔树（NMTs）——以信任最小化的方式解决了L2数据可用性问题。通过使用Celestia作为DA（数据可用性）层，Manta Pacific可以显著降低用户的交易成本。

## 什么是Celestia？

要了解Celestia是什么，让我们从模块化区块链开始。

模块化区块链旨在通过将区块链的一个或多个功能分解为单独的层来实现更有效的可扩展性。这些模块化层可以定制和专门用于特定功能，从而产生比传统的单块设计更强大和适应性强的系统。

模块化区块链不再自行处理所有事务，而是专注于执行一两个功能的专家。模块化区块链可以专注于的功能有：

1. [执行](https://celestia.org/glossary/execution/)
2. [结算](https://celestia.org/glossary/settlement/)
3. [共识](https://celestia.org/glossary/consensus/)
4. [数据可用性](https://celestia.org/glossary/data-availability/)

Celestia是一种专注于为其他类型的链提供共识和数据可用性的模块化区块链。

## 什么是数据可用性？

Celestia充当数据可用性（DA）层，为[数据可用性问题](https://docs.celestia.org/learn/how-celestia-works/data-availability-layer)提供了有效的解决方案。

简而言之，区块链是一本详细记录所有交易和信息的庞大数字账本。数据可用性层充当工具，确保此账本上的信息对所有人都是可见和可访问的。

Celestia的数据可用性层在其扩展解决方案中引入了两个基本功能。一个被称为[数据可用性采样](https://blog.celestia.org/celestia-mvp-release-data-availability-sampling-light-clients)（DAS），另一个被称为[命名空间默克尔树](https://github.com/celestiaorg/nmt)（NMTs）。

Celestia的创新扩展解决方案，数据可用性采样（DAS），允许轻量级节点在无需下载整个块的情况下检查数据的可用性。它通过使这些轻节点在块数据的小部分上执行多轮随机检查来工作。他们完成的轮次越多，他们就越有信心数据是存在的。当轻节点达到一定的信心水平（例如99%）时，它将考虑块数据为可用。

当集成到诸如Celestia的区块链设计中时，数据可用性采样使轻节点能够在使用比全节点更经济的硬件的同时增强网络安全性和速度。

命名空间默克尔树可以类比为将账本分割为为不同应用程序定制的不同部分。每个应用程序只需要关注其指定的部分，而不必关心其他应用程序的信息。这种组织结构简化了账本，使每个应用程序只需下载其所需的数据。

## 利用Celestia DA增强Manta Pacific

通过集成Celestia的模块化DA，Manta Pacific将实现数据扩展，大幅降低与Manta Pacific生态系统中的dApp交互的用户的燃气费用。

Manta Pacific目前在结算中使用calldata，其成本与以太坊的燃气价格呈线性关系，并根据以太坊的使用情况波动。相比之下，Celestia的成本对以太坊的燃气价格是次线性的，并且将明显便宜于以太坊上的现有成本。尽管有通过[EIP-4844](https://www.eip4844.com/)降低燃气费用的计划，但它仍然比Celestia的成本更昂贵，并且区块空间在未来仍将是一个突出问题。
