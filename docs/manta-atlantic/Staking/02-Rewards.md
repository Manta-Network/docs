:::danger Staking Rewards Have Ended
**Manta Atlantic staking rewards stopped on May 1, 2026.** No further rewards are being distributed. All staked positions are being forcibly unbonded.

Please unstake and migrate your MANTA to Manta Pacific using the [Migration DApp](https://app.manta.network/manta/migrate). See the [Migration FAQ](/docs/manta-atlantic/migration-faq) for full details.
:::

:::note Historical Reference
The content below describes how staking rewards worked before staking was discontinued.
:::

Staking rewards worked the following way:

1. On every produced block, ~7.6 MANTA are created (equivalent to 2% of total issuance per year)
2. This reward is allocated for later payout in the following way
    - 10% of this reward go to the collator that produced it to compensate for collator running expenses
    - The remaining 90% is split proportionally to MANTA staked between everyone who delegated to this collator (this includes a collator’s self-bond)
3. Two *rounds* later ( max. 12 hours ), the rewards accumulated in this way are paid out automatically, directly to the addresses of the collator and every delegator
