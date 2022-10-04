One account on Calamari Network can be
- A delegator
- A collator candidate
- Not participating in staking

Different rules apply for each and *collator* and *delegator* roles are mutually exclusive.
To switch between the two, you need to leave the current role by unbonding all your KMA and then re-bond as the other role.

## For Delegators
- Minimum delegation amount - 5_000 KMA.
- Maximum delegators eligible for rewards per collator - 100.
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a delegator 2 *rounds* after they have been accrued.
- Rewards are not compounded.
- Removing or Reducing a delegation is subject to a **7 day waiting period**
- Every manta account can delegate to up to 25 collators
- There is (currently) no slashing risk.

## For Collators
- Minimum KMA bond to join the collation candidate set - 4_000_000 KMA
- Maximum number of active collators eligible for rewards - 63
- Maximum number of active delegations (contributing to total stake) on each collator - 100
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a delegator 2 *rounds* after they have been accrued.
- Rewards are not compounded.
- Removing or Reducing a delegation is subject to a **7 day waiting period**
- There is (currently) no slashing if your collator misses a block, but your delegators won't like their missing rewards.