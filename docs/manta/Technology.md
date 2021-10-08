---
sidebar_position: 1
title: Manta’s Architectural Design Choices
id: Technology
---

With the Ethereum 1.0 main net launch in 2015, blockchain entered into a new, Turing-complete chapter. Fast-forward to now, and we are experiencing a tremendous level of adoption for on-chain applications, especially regarding decentralized finance (DeFi). While existing decentralized projects and applications prove the need and demonstrate a market for DeFi, we believe that adoption is only beginning.

To take DeFi to the next level, we need to address the existing issues: the lack of privacy, speed, and interoperability. Manta intends to expand DeFi into a larger market with better conveniences and privacy provisions by introducing a top-tier product that addresses these problems.

![Polkadot](/img/polkadot.jpg)

## Choosing Polkadot

To address those issues in the most efficient manner possible, we are excited to build our project as a Polkadot parachain. To enable fast and privacy-preserving transactions, we believe the underlying architecture must fulfill three characteristics that are available in Polkadot:

1. First, we need a fast runtime. We leverage zk-SNARK to guarantee privacy-preserving transactions on-chain. Although the verification process in the newer zk-SNARK schemes such as Groth16 is relatively quick and cheap, it can still be computationally intensive and taxing on other blockchains. Substrate uses a WASM-based runtime that supports compiling native Rust code to WASM. This makes it more efficient for our purposes than EVMs.

![Choosing Polkadot](/img/choosing_polkadot.png)

2. Second, we require a fast consensus to provide the best user experience possible with our privacy-preserving decentralized exchange (DEX) and transacting. We want to achieve trustlessness through decentralization; as a result, we are building a layer-1 (L1) solution, which will reap the benefits of a fast consensus protocol. Polkadot’s GRANDPA consensus is one of the quickest consensus protocols available.

3. Last but certainly not least, we need interoperability. Leveraging Polkadot’s parachain architecture brings that interoperability to Manta. As a result, we can support any parachain assets that will leverage our interface. This brings tremendous opportunity to grow the Manta ecosystem.

## Our Decision to Build an L1 Solution

As mentioned previously, rather than building an L2 solution, we will be releasing an ecosystem that is L1. We decided on this for three reasons:
It can be fully decentralized.
We have more front-running resilience.
Manta will be DeFi ready.

1. By building as an L1, Manta is fully decentralized by construction; thus, it is trustless. Users can have complete confidence in the security and privacy of their transactions.

![L1](/img/L1.png)

2. While an L2 solution may not be malicious, many front-running opportunities exist by taking advantage of the underlying blockchain design. Manta’s decentralized design, paired with privacy built into L1, provides front-running resilience.

3. Finally, Manta will be DeFi-ready. We provide cryptographically secure schemes for both privacy-preserving payment and exchange. While L2 solutions may support private payments, it is currently unclear how on-chain privacy-preserving exchanges will be supported in a scalable manner.

---

2020 was a great year for blockchain and DeFi. We are excited to bring Manta into the picture in 2021, an L1 solution that brings privacy, interoperability, and fast transacting — all focused on delivering an improved on-chain experience that offers levels of privacy that cannot find on centralized solutions.

---

To learn more about Manta Network, please follow us on [Telegram](https://t.me/mantanetwork), [Twitter](https://twitter.com/mantanetwork) and [Medium](https://mantanetwork.medium.com) to get the latest news.
