Manta Pacific [officially launched its Mainnet Alpha](https://mantanetwork.medium.com/manta-pacific-mainnet-alpha-launch-743c6bc2b95e) on September 12, 2023. Alpha represents the MVP of Manta Pacific–a functional EVM-based L2 with the first generation of [Universal Circuits](https://medium.com/@mantanetwork/universal-circuits-101-d182a86956b6). At the same time, Alpha represents only the first of many milestones to bring the Manta Pacific vision fully operational. Alongside Celestia and Polygon Labs, we are excited to unveil the next chapters for the Manta Pacific journey, one that will result on Manta Pacific as a modular zkEVM using the Polygon Chain Development Kit (CDK).

Manta Pacific’s rollout will be split into four different chapters, each with a new integration that brings a better and better user experience. These chapters will culminate in the release of the final Manta Pacific Mainnet, which leverages zkEVM using the Polygon CDK and Celestia’s Data Availability (DA) for maximum performance, scalability, and security for users. The first chapter has [already launched and is available today](https://twitter.com/MantaNetwork/status/1701583217143464171).

Manta Pacific’s transition will result in a unique solution for existing problems in the blockchain industry. It will be the first zkEVM L2 converted from an Optimistic Rollup to a Validium using the Polygon CDK to drastically reduce gas fees through Celestia DA and increase security through Ethereum consensus and cryptographic proofs of on-chain activity.

# **The Manta Roadmap Details**

<div style={{textAlign: 'center',marginBottom: '24px'}}>
    <img alt="/img/guides/multi-modular-platform.jpg" src="/img/guides/pacific-roadmap.png" width="70%"/>
</div>

## **Chapter 1: Manta Pacific Alpha (Ethereum L2)**

In its current availability, Manta Pacific is an Optimistic Rollup on Ethereum using Ethereum DA. It leverages Manta Network’s Universal Circuits for developers to quickly build, test, and deploy ZK-enabled applications with just solidity and the Universal Circuits SDK. The goal is to build the dApp ecosystem based on Manta zkSBT and Universal Circuits such as [zkShuffle](https://docs.manta.network/docs/zkShuffle/Overview).

On Manta Pacific, developers reap the benefits from Manta’s Universal Circuits and OP Stack’s low gas fee and scalability to build unique ZK-enabled dApps, which is unprecedented in existing Layer 2s. In particular, Manta Pacific provides Universal Circuits for popular use cases (e.g., [card shuffling/dealing](https://github.com/Manta-Network/zkShuffle) and private on-chain voting), solidity smart contracts for on-chain ZK logic, and a typescript SDK for front-end integration.

Based on Manta’s Universal Circuits, developers without a ZK background can easily develop dApps with built-in ZK features from Manta Pacific such that they do not need to spend years of engineer efforts on customizing ZK circuits. Significantly different from Starkware and Aztec which re-design domain-specific language (DSL) for ZK such as Cario and Noir, Manta Pacific achieves EVM equivalence through adopting OP Stack Bedrock’s codebase. Thus, all existing smart contracts on Ethereum can be seamlessly adopted to Manta Pacific while enabling ZK-based features to unveil new application scenarios such as [verifiable private DID/KYC](https://www.binance.com/en/feed/post/458948), ZK-based fully-onchain games, and synergy between DeFi and decentralized private identity including zkSBT-based whitelist and off-ramp.

## **Chapter 2: Manta Pacific Alpha II (+Celestia DA)**

In the next chapter, Manta Pacific will achieve data scaling by integrating Celestia’s modular DA to drastically reduce gas fees for users interacting with dApps within the Manta Pacific ecosystem.

Manta Pacific currently uses calldata for settlement where the cost is linear to gas price on Ethereum and fluctuates according to the usage of Ethereum. Instead, Celestia’s cost is sublinear to Ethereum gas price and would be significantly cheaper than the existing costs on Ethereum. While there are plans to reduce the gas costs via [EIP-4844](https://www.eip4844.com/), it would be still more expensive than the costs of Celestia, and blockspace will still be an emerging issue in the future.

## **Chapter 3: Manta Pacific Beta (+Transition to zkEVM)**

In this chapter, the goal is to transition fully over to zkEVM by leveraging Polygon CDK. In the meantime, Manta Pacific may explore a transitional period leveraging a multi-prover framework to securely migrate over to full zkEVM. The multi-prover will integrate Polygon’s ZK prover along with the existing OP Stack rollup such that Manta Pacific enjoys simultaneously the Polygon ZK prover cluster and Manta’s existing cluster, leading to benefits in multiple dimensions. The multi-prover architecture during the transition will enhance network robustness; combined with Celestia DA, Manta Pacific’s multi-prover system will still offer a low-cost L2 system for users.

Manta Pacific intends to transition fully over to zkEVM and leverage Polygon’s ZK prover. The final stage of the network’s architecture will be Manta’s Universal Circuits for built-in ZK-features to enable a wide range of ZK applications, while combining Validium services with Celestia DA and zkEVM with Polygon CDK for scalability.

## **Chapter 4: Manta Pacific Mainnet Production I (+Universal Circuits 2.0)**

For Manta Pacific Mainnet, Manta Pacific will further upgrade the Universal Circuits to enable lower gas costs, support more use cases, and provide even better user experiences. First, Manta Pacific will integrate ZK proof aggregation to drastically reduce the on-chain proof verification gas costs for ZK applications and improve the throughput for ZK processing.

Second, Manta Pacific will integrate additional ZK schemes and corresponding smart contracts to support more ZK-enabled utilities. Third, Manta Pacific will provide a better user experience through collaboration with account abstraction projects. Finally, **_Manta Pacific will achieve modularity, decentralization, high extensibility, low gas costs, and fully EVM equivalence, while unlocking new application scenarios with novel ZK technology._**

# **Looking Forward to the Future of Manta Pacific**

Upon completion of Chapter 4, Manta Pacific’s full mainnet launch will be completed. In the meantime, users are able to fully leverage the network to perform on-chain interactions with dApps within the ecosystem just as they would experience in any other L1 or L2. Meanwhile, as Manta Pacific’s underlying architecture continues to evolve, users will find noticeable differences–notable improvements–in their day-to-day interactions with Manta Pacific ecosystem applications.

Manta Pacific will unlock the next generation of dApps, specifically through ZK-enablement and scalability. In testnet, Manta Pacific has already seen over 200 verified contracts deployed, introducing a variety of decentralized applications into the ecosystem. We are looking forward to achieving that goal and appreciate all of the support from our community alongside.
