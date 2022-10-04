One account on Calamari Network can be
- A delegator
- A collator candidate
- Not participating in staking

Different rules apply for each and *collator* and *delegator* roles are mutually exclusive.
To switch between the two, you need to leave the current role by unbonding all your KMA and then re-bond as the other role.

## For Delegators
- Minimum delegation amount - 5_000 KMA.
- Maximum delegators eligible for rewards per collator - 100.
    - If more a collator has >100 delegators, the minimum delegation amount to receive rewards will be larger than above 5_000 depending on the other delegator's stakes. Check the minimum reported by the [delegation dApp](Delegation/dApp%20Overview) for the current amount
- Removing or Reducing a delegation is subject to a **7 day waiting period**
- APY per delegated KMA decreases when total KMA staked on a collator increases ( your KMA is buying a smaller share of a larger pot )
- You will not earn rewards if your chosen collator drops out of the top 63
- You will not earn rewards if your delegation falls out of the top 100 on its collator
- You *may* delegate to more than one collator should you choose to
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a delegator **2 *rounds* after they have been accrued**.
- Rewards are not compounded.
- Every manta account can delegate to up to 25 collators
- There is (currently) no slashing risk.

## For Collators
- Minimum KMA bond to join the collation candidate set - 4_000_000 KMA
- Maximum number of active collators eligible for rewards - 63
    - This *collator rank* is calculated as the total sum of KMA staked on the collator ( i.e. the sum of collator bond and all delegations )
- Maximum number of active delegations (contributing to total stake) on each collator - 100
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a collator 2 *rounds* after they have been accrued.
- Rewards are not compounded.
- Removing or Reducing the candidate bond is subject to a **7 day waiting period**
- Reducing the candidate bond below the 4_000_000 KMA minimum is not possible ( except by removing )
- There is (currently) no slashing if your collator misses a block, but your delegators won't like their missing rewards.