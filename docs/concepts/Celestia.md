# Celestia

Leveraging Celestia‘s [data availability (DA)](https://blockworks.co/news/data-availability-ethereum), Manta Pacific delivers a blazing-fast infrastructure at a fraction of the cost of monolothic L2s. Celestia employs cutting-edge data availability sampling techniques—two-dimensional Reed-Solomon coding and Namespaced Merkle Trees (NMTs)—to address L2 data availability concerns in a trust-minimized manner. By using Celestia as the DA (Data Availability) layer, Manta Pacific can significantly reduce transaction costs for users.

## What is Celestia?

To understand what Celestia is, let's start with Modular Blockchain.

Modular blockchains aim to achieve more efficient scalability by breaking down one or more functions of a blockchain into separate layers. These modular layers can be customized and tailored to specific functions, resulting in a more robust and adaptable system, in contrast to the traditional monolithic design.

Instead of doing everything on its own, modular blockchains are specialists that only perform one or two functions. The functions that modular blockchains can specialize in are:

1 . [Execution](https://celestia.org/glossary/execution/)

2 . [Settlement](https://celestia.org/glossary/settlement/)

3 . [Consensus](https://celestia.org/glossary/consensus/)

4 . [Data availability](https://celestia.org/glossary/data-availability/)

Celestia is a modular blockchain that specializes in providing consensus and data availability for other types of chains.

## What is Data availability?

Celestia serves as a data availability (DA) layer that provides an effective solution to the [data availability problem](https://docs.celestia.org/learn/how-celestia-works/data-availability-layer).

In simple terms, the blockchain is a vast digital ledger that meticulously records all transactions and information. The data availability layer acts as a tool to guarantee that the information on this ledger is visible and accessible to everyone.

Celestia's data availability layer introduces two essential features in its scaling solutions. One is referred to as [data availability sampling](https://blog.celestia.org/celestia-mvp-release-data-availability-sampling-light-clients) (DAS), and the other is known as [Namespaced Merkle trees](https://github.com/celestiaorg/nmt) (NMTs).

Celestia's innovative scaling solution, data availability sampling (DAS), allows lightweight nodes to check data availability without downloading the entire block. It works by having these light nodes perform multiple rounds of random checks on small portions of block data. The more rounds they complete, the more confident they become that the data is present. When a light node reaches a certain confidence level (e.g., 99%), it considers the block data as available.

When integrated into blockchain designs like Celestia, data availability sampling empowers light nodes to enhance network security and speed while using more cost-effective hardware than full nodes.

Namespaced Merkle trees can be likened to partitioning the ledger into distinct sections tailored for different applications. Each application only needs to focus on its designated section without concerning itself with the information of other applications. This organizational structure streamlines the ledger, allowing each application to download only the data it requires.

## Leveraging Celestia DA to Empower Manta Pacific

Manta Pacific will achieve data scaling by integrating Celestia’s modular DA to drastically reduce gas fees for users interacting with dApps within the Manta Pacific ecosystem.

Manta Pacific currently uses calldata for settlement where the cost is linear to gas price on Ethereum and fluctuates according to the usage of Ethereum. Instead, Celestia’s cost is sublinear to Ethereum gas price and would be significantly cheaper than the existing costs on Ethereum. While there are plans to reduce the gas costs via [EIP-4844](https://www.eip4844.com/), it would be still more expensive than the costs of Celestia, and blockspace will still be an emerging issue in the future.
