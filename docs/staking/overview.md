# Overview

We're working with folks at [Symbiotic](https://symbiotic.fi/) and [Babylon](https://babylonlabs.io/) on a new secure, decentralized staking solution that enables MANTA token holders to participate in Manta Pacific's network security and earn rewards at the same time. Node runners can opt in as operators on the Symbiotic or Babylon layer and contribute to the network's fast finality architecture by generating proofs that will vastly increase the reliability of state transitions on Manta Pacific and bring down the finality times from days to mere minutes. Learn more about the dual-layer fast finality architecture here: [Fast Finality on Manta Pacific](../concepts/fast-finality)

:::info About Symbiotic and Babylon

[Symbiotic](https://symbiotic.fi/) is a decentralized security protocol that enables blockchain networks to access shared security from a pool of staked assets, creating an efficient marketplace for economic security. This helps optimize resource allocation, boosts staking returns for token delegators, and ensures robust security through a flexible, incentive-based design.

[Babylon](https://babylonlabs.io/) is a decentralized protocol that allows native Bitcoin staking directly on the Bitcoin blockchain, without intermediaries. It uses a shared-security architecture to extend Bitcoin's security to other decentralized networks enabling BTC holders to engage in multi-staking while keeping their assets on the Bitcoin network, offering verifiable security for said networks.

:::

We're leveraging Symbiotic's restaking infrastructure and Babylon's shared security architecture to combine Ethereum's and Bitcoin's security with Manta Pacific's high-performance execution. This increases overall asset efficiency for MANTA and BTC token holders and helps enable [fast finality](../concepts/fast-finality) on Manta Pacific.

## How it Works

Simply put, Manta Pacific nodes have the option to become operators on the Symbiotic and Babylon layers. This enables MANTA and BTC token holders to delegate their tokens to these active node operators, establishing a dual-layer security framework. By merging Bitcoin's substantial liquidity with Manta Network's native asset, this approach significantly enhances the overall safety and robustness of the network.

If you're keen to learn more, we recommend checking out the following docs:

- [Symbiotic - What's restaking?](https://docs.symbiotic.fi/intro/stake)
- [Babylon - Bitcoin staking](https://docs.babylonlabs.io/guides/overview/bitcoin_staking/)
- [Fast finality architecture on Manta Network](../concepts/fast-finality#our-two-layer-solution)

## Key Benefits of this Architecture

- Added Security for Manta Pacific: The delegated MANTA and BTC incentivize operators to honestly verify the state transitions on Manta Pacific, and the validation results are relayed to Ethereum to be settled there.
- Token Rewards: Token delegators and node operators earn MANTA rewards.
- Decentralization: Both fast finality and native MANTA staking are enabled using decentralized infrastructure.

## Reward Mechanism

Staking rewards are calculated differently for operators and token delegators.

- **Operators** earn rewards based on their contribution to the network through the submission of fast finality proofs. A fixed amount of $54,794$ MANTA is distributed every $3$ days for the first half year and $109,588$ every $3$ days for the time afterwards, and the distribution is proportional to the number of proof submissions made by the operator during this period. Additionally, operators can choose set a commission rate, which denotes the portion of the rewards they will retain before distributing the remaining rewards to their respective delegators.
- **Delegators** receive rewards proportional to their staked amount in their chosen operator's vault. After the operator's commission is deducted, the remaining rewards are distributed among delegators based on their share of the total stake in that vault.

## Get Started

### Become an Operator

If you run a Manta Pacific node and want to join as an operator, refer to the guides below.

[TBD - Link to Manta Symbiotic FP docs]

### Delegate your MANTA Tokens

Follow the guide showing [how to delegate your MANTA tokens - TBD](#placeholder) to an active operator.