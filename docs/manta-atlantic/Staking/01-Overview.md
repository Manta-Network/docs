:::note
Staking is active on Manta Network starting with v4.6.1
:::
Manta Network runs a delegated proof-of-stake (DPoS) consensus mechanism.

Similar to other Layer 1 blockchains, block producers are selected out of a set of candidates based on the total MANTA stake backing each specific block producer candidate - in our case called a `collator`. In addition, users who don't wish to run their own `collator` can instead `delegate` their MANTA token to an existing collator and gain a share of its rewards.

### What does this mean for MANTA holders
1. High-performing block producers voted in through delegation => cheapest possible gas fees for transactions
2. Many independent collators => high censorship resistance
3. You can generate yield on your MANTA by participating in staking rewards

### Okay, so how do I start staking?

You have two routes to stake your MANTA:

1. Become a `Delegator`

All you need is some MANTA and [our delegation dApp](Delegation/dApp%20Overview)

2. Become a `Collator Runner`

This path needs technical experience and dedicated computer hardware to run a Manta blockchain node on in addition to a larger amount of MANTA than 1. and can bring higher rewards.
You can find more info about this path [in the collator section](../Collation/Overview)

## What is DPoS?
### In contrast to other PoS Networks
In contrast to other networks like Ethereum, where no on-chain mechanism exists for multiple token holders to collaborate (staking pools are used as an off-chain crutch here), our DPoS solution allows for people who can't or won't run their own collator node to `delegate` their token to one or multiple specific `collators`, thus voting that they do a good job with producing blocks, helping ensure its position in the set of at most 70 active collators and in return share in the [block rewards](Rewards) the backed collator obtains.
In order create a semi-stable set of collators, these locked tokens are subject to a 7 day waiting period if a user wishes to recover his tokens from a staking lock or change the target collator they're delegating to.

### In contrast to Polkadot/Kusama’s NPoS (nominated proof of stake)
On Polkadot/Kusama, an on-chain election occurs to distribute DOT/KSM tokens among backed nodes, while on Manta a delegator always picks one concrete collator and a concrete number of MANTA they wish to delegate to that collator.
This approach is both simpler and less computationally heavy than running a distribution election, which has a nondeterministic execution time - something that must be avoided on Parachains as it can easily lead to chain stalls.