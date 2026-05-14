:::danger Manta Atlantic Deprecation Notice
Manta Atlantic is being deprecated. **Staking rewards stopped on May 1, 2026**, and all remaining staked positions are being forcibly unbonded. The parachain slot will expire in late July 2026.

**Action Required:** Please unstake your MANTA and migrate your assets to Manta Pacific using the [Migration DApp](https://app.manta.network/manta/migrate). See the [Migration FAQ](/docs/manta-atlantic/migration-faq) for full details.
:::

:::note Historical Reference
The content below describes how Manta Atlantic staking worked. Staking is no longer active. New staking has not been accepted since March 18, 2026.
:::

Manta Network runs a delegated proof-of-stake (DPoS) consensus mechanism.

Similar to other Layer 1 blockchains, block producers are selected out of a set of candidates based on the total MANTA stake backing each specific block producer candidate - in our case called a `collator`. In addition, users who don't wish to run their own `collator` can instead `delegate` their MANTA token to an existing collator and gain a share of its rewards.

### What does this mean for MANTA holders
1. High-performing block producers voted in through delegation => cheapest possible gas fees for transactions
2. Many independent collators => high censorship resistance
3. You can generate yield on your MANTA by participating in staking rewards

### I have staked MANTA — what should I do now?

Since staking has ended, your immediate next steps are:

1. **Unstake your MANTA** — If your position has not yet been forcibly unbonded, initiate unstaking via the [Migration DApp](https://app.manta.network/manta/migrate). The standard 7-day unbonding period applies.
2. **Migrate to Manta Pacific** — Once unbonded, use the Migration DApp to bridge your MANTA to Manta Pacific (or to Polkadot / other parachains via XCM).
3. **Missed the deadline?** — Don't worry. A chain state snapshot will be taken before the slot expires. All unmigrated MANTA will be airdropped 1:1 to your corresponding address on Manta Pacific.

:::note
The automatic 1:1 airdrop applies only to MANTA tokens. Non-MANTA assets (DOT, GLMR, USDt, etc.) must be migrated manually before the chain stops producing blocks.
:::

---

### Historical: How staking worked (for reference)

#### Routes to participate (historical)

1. Become a `Delegator` — All you needed was some MANTA and [the delegation dApp](Delegation/dApp%20Overview)
2. Become a `Collator Runner` — Required technical experience, dedicated hardware, and a larger MANTA bond. See [the collator section](../Collation/Overview)

## What is DPoS?
### In contrast to other PoS Networks
In contrast to other networks like Ethereum, where no on-chain mechanism exists for multiple token holders to collaborate (staking pools are used as an off-chain crutch here), our DPoS solution allows for people who can't or won't run their own collator node to `delegate` their token to one or multiple specific `collators`, thus voting that they do a good job with producing blocks, helping ensure its position in the set of at most 70 active collators and in return share in the [block rewards](Rewards) the backed collator obtains.
In order create a semi-stable set of collators, these locked tokens are subject to a 7 day waiting period if a user wishes to recover his tokens from a staking lock or change the target collator they're delegating to.

### In contrast to Polkadot/Kusama’s NPoS (nominated proof of stake)
On Polkadot/Kusama, an on-chain election occurs to distribute DOT/KSM tokens among backed nodes, while on Manta a delegator always picks one concrete collator and a concrete number of MANTA they wish to delegate to that collator.
This approach is both simpler and less computationally heavy than running a distribution election, which has a nondeterministic execution time - something that must be avoided on Parachains as it can easily lead to chain stalls.