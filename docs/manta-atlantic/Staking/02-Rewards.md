:::note Atlantic deprecation

Reward emissions and inflation are subject to the **Atlantic deprecation schedule** (see [Staking overview](01-Overview) and the **Manta Atlantic Deprecation FAQ**). After the published cutoffs, rewards may stop and inflation may be set to **0** for collators.

:::

Staking rewards work the following way:

1. On every produced block, ~7.6 MANTA are created (equivalent to 2% of total issuance per year)
2. This reward is allocated for later payout in the following way
    - 10% of this reward go to the collator that produced it to compensate for collator running expenses
    - The remaining 90% is split proportionally to MANTA staked between everyone who delegated to this collator (this includes a collator’s self-bond)
3. Two *rounds* later ( max. 12 hours ), the rewards accumulated in this way are paid out automatically, directly to the addresses of the collator and every delegator
