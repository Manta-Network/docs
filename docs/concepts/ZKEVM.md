# What is zkEVM？

ZKEVM (Zero-Knowledge Ethereum Virtual Machine) is a technology that uses ZK-SNARK technology to create cryptographic proofs of execution for Ethereum-like transactions. These proofs can be used to make the Ethereum blockchain more scalable by reducing the computational load required to verify transactions or to build ZK-rollups that are highly efficient and scalable.

The three main components of the zkEVM protocol are:

1. Trusted Sequencer: Responsible for receiving, ordering, and batching L2 transactions, then submitting them to the Consensus Contract on L1. It also broadcasts batches to L2 nodes for fast finality.
2. Trusted Aggregator: Computes L2 State based on Trusted Sequencer's batches, generates Zero-Knowledge proofs for computational integrity and verifies these proofs before committing L2 State roots.
3. Consensus Contract (PolygonZkEVM.sol): Used by both Sequencer and Aggregator for interactions with L1. Sequencer stores batches in this contract, while the contract verifies Aggregator's proofs, ensuring security and L1 compatibility.

There are several Layer 2 solutions aimed at enhancing Ethereum's scalability, particularly transaction speed while reducing gas fees and maintaining decentralization and security.

Polygon zkEVM is a Layer 2 Rollup solution that combines data availability and execution verification in Layer 1 of the Ethereum blockchain to ensure L2 state transition security and reliability.

Leveraging Polygon SDK to build Manta Pacific‘s own zkEVM, benefiting from its Layer 2 Rollup design, which guarantees secure L2 state transitions and reliability.

# Transition to zkEVM with Polygon CDK

In Chapter 3 of Manta Pacific: Manta Pacific Beta, there will be a transition to zkEVM using Polygon CDK. The goal is to transition fully over to zkEVM by leveraging Polygon CDK. In the meantime, Manta Pacific may explore a transitional period leveraging a multi-prover framework to securely migrate over to full zkEVM. The multi-prover will integrate Polygon’s ZK prover along with the existing OP Stack rollup such that Manta Pacific enjoys simultaneously the Polygon ZK prover cluster and Manta’s existing cluster, leading to benefits in multiple dimensions. The multi-prover architecture during the transition will enhance network robustness; combined with Celestia DA, Manta Pacific’s multi-prover system will still offer a low-cost L2 system for users.

Manta Pacific intends to transition fully over to zkEVM and leverage Polygon’s ZK prover. The final stage of the network’s architecture will be Manta’s Universal Circuits for built-in ZK-features to enable a wide range of ZK applications while combining Validium services with Celestia DA and zkEVM with Polygon CDK for scalability.

# **Why Polygon CDK**

As a ZK dApp hub, it’s important for Manta Pacific’s security guarantees and finality to leverage ZK technology. ZK proofs mean finality can happen in minutes or seconds, rather than days. With a strong ZK-proving implementation that’s already live, CDK leverages the security of math rather than the social-economic incentives of fraud proofs.

Furthermore, Manta Pacific requires a *modular and sovereign* framework that can handle the custom requirements of a unique, ZK dApp ecosystem. Modularity and sovereignty are core to Polygon CDK, with configurability that aligns with Manta Pacific’s needs in the short term and maximum flexibility for the long term.

Finally, Manta Pacific plans to tap into the interoperable blockspace and liquidity of chains built with Polygon CDK through a trustless ZK bridge to Ethereum. In the future, this will make it possible for atomic L2-to-L2 transactions, expanding what liquidity dApps on Manta Pacific will be able to access. By joining a shared, trustless ZK bridge to Ethereum, Manta Pacific will be a part of a growing, robust ecosystem of L2s, preserving chain independence without sacrificing customizability.

# **Next Steps**

The migration to a ZK L2 with Polygon CDK will unlock Manta Pacific’s ultimate vision: to be a robust ZK dApp ecosystem, powered by its Universal Circuits SDK. It should be easy to develop ZK dApps without first understanding the intricacies of cryptography. [Universal Circuits](https://docs.manta.network/docs/Introduction) and its libraries abstract away the complexity of writing custom ZK circuits, allowing Solidity devs to build things like compliant private payments for DeFi or privacy-preserving identity verification for Web3 social.

As core devs building ZK tech, it is important to align Manta Pacific’s best-in-class ZK ecosystem with all the upsides of ZK infrastructure–and to do so in the EVM-equivalent environment of Polygon CDK, which means existing dev tooling works out-of-the-box.

The announcement marks the first step toward full mainnet for Manta Pacific, which is currently in Mainnet Alpha. Following, we’ll unveil more information, like integration with [Celestia’s DA](https://docs.celestia.org/learn/how-celestia-works/data-availability-layer/) to reduce gas fees, and the ultimate low-cost, high-performance specs of a full mainnet launch.
