# Overview
:::note
Staking and its rewards are active on Calamari Network since v3.4.0
:::
Calamari Network runs a delegated proof-of-stake (DPoS) consensus mechanism.

Similar to other Layer 1 blockchains, block producers are selected out of a set of candidates based on a total KMA stake backing each specific node - in our case called a `collator`.

In contrast to other networks like Ethereum, where no off-chain mechanism exists for multiple token holders to collaborate, our DPoS solution allows for people who can't or won't run their own collator node to `delegate` their token to one or multiple specific `collators`, thus voting that they do a good job with producing blocks, helping ensure its position in the set of at most 63 active collators and in return share in the [block rewards](Rewards) the backed collator obtains.
In order create a semi-stable set of collators, these locked tokens are subject to a 7 day waiting period if a user wishes to recover his tokens from a staking lock or change the target collator they're delegating to

In contrast to Kusama’s NPoS (nominated proof of stake) consensus protocol, where an on-chain election occurs to distribute tokens among backed nodes, on Calamari a delegator always picks one concrete collator and a concrete number of KMA they wish to delegate to that collator.
This approach is both simpler and less computationally heavy than running a distribution election, which has a nondeterministic execution time - something that must be avoided on Parachains as it can easily lead to chain stalls.

This is great! How do I start staking? 
Follow along with our guide to find out more 👇
