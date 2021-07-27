---
sidebar_position: 1
---

# Introduction

## The Calamari Parachain

Calamari is Manta Network’s canary-net, an early, highly experimental version of Manta Network, where all new features will be released and tested first. Calamari is the plug-and-play privacy-preservation parachain built to service the Kusama DeFi world. It combines Kusama and zkSNARKs to bring on-chain privacy to transactions and swaps. 

In early period, Calamari parachain will provide two products:
* **MariPay:** a token-agnostic private payment service. MariPay supports the private transfer of Kusama and its Parachain assets, including major crypto assets supported on Kusama. Users can transact popular assets like stablecoins and wrapped BTC while simultaneously getting the benefits of on-chain privacy through ZKP.
* **MariSwap:** a private AMM-based DEX. MariSwap offers users the capability of swaps between parachain assets while preserving the privacy of the user addresses. It also provides never-before-seen features in the industry such as private liquidity pools.

Calamari will meet Kusama user's needs for on-chain privacy, anti-surveilance, and ensuring that private tokens are decetralized and interoperable. Calamari is currently a shell-chain.

### What is a shell-chain 

A _shell-chain_ is a _pure_ parachain that produces blocks but has no functionality beyond being upgradable. It is our staging ground, and the first common-good parachain. It has no concept of user accounts, staking, governance or balances. All it does is listen out for a message coming from the Relay Chain’s governance apparatus authorizing it to upgrade. When such a message is received, the Shell parachain will allow itself to be upgraded to whatever new logic the Relay Chain has authorized, and we call it `Runtime Upgrade`. The Manta development team will upgrade Calamari with core features such as `MariPay` and `MariSwap` through runtime upgrade, continue to improve the functionality in subsequent upgrades.

## Calamari Chain Information

Calamari's parachain ID on Kusama is 2084. and our SS58 prefix is 78. Our total issuance of $KMA is 10B. $KMA is the first community-driven deflationary utility token where rebate rewards, redemption rewards, and token burns are generated from the Calamari privacy-preserving network usage. The Initial Distribution of KMA is up to 10 billion tokens. There will be no new token generation unless KMAs for the crowdloan are consumed. 
