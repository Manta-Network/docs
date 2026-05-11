:::danger Staking Has Ended — Forced Unstaking in Progress
**As of May 1, 2026, staking on Manta Atlantic has fully ended.** New staking was closed on March 18, 2026. All remaining staked positions are now being forcibly unbonded.

- The standard **7-day unbonding period** still applies before funds can be withdrawn.
- After unbonding, please use the [Migration DApp](https://app.manta.network/manta/migrate) to migrate your MANTA to Manta Pacific.
- The parachain slot expires in **late July 2026** — do not wait until the last moment.

See the [Migration FAQ](/migration-faq) for the full timeline and migration instructions.
:::

:::note Historical Reference
The rules below describe how staking participation worked before staking was discontinued.
:::

One account on Manta Network could be
- A delegator
- A collator candidate
- Not participating in staking

Different rules apply for each and *collator* and *delegator* roles are mutually exclusive.
To switch between the two, you need to leave the current role by unbonding all your MANTA and then re-bond as the other role.

## For Delegators
- Minimum delegation amount - 500 MANTA.
- Maximum delegators eligible for rewards per collator - 100.
    - If more a collator has >100 delegators, the minimum delegation amount to receive rewards will be larger than above 500 depending on the other delegator's stakes. Check the minimum reported by the [delegation dApp](Delegation/dApp%20Overview) for the current amount
- Removing or Reducing a delegation is subject to a **7 day waiting period**
- APY per delegated MANTA decreases when total MANTA staked on a collator increases ( your MANTA is buying a smaller share of a larger pot )
- You will not earn rewards if your chosen collator drops out of the top 70
- You will not earn rewards if your delegation falls out of the top 100 on its collator
- You *may* delegate to more than one collator should you choose to
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a delegator **2 *rounds* after they have been accrued**.
- Rewards are not compounded.
- Every manta account can delegate to up to 25 collators
- There is (currently) no slashing risk.

## For Collators
- Minimum MANTA bond to join the collation candidate set - 400_000 MANTA
- Maximum number of active collators eligible for rewards - 70
    - This *collator rank* is calculated as the total sum of MANTA staked on the collator ( i.e. the sum of collator bond and all delegations )
- Maximum number of active delegations (contributing to total stake) on each collator - 100
- Rewards are calculated in 6 hour intervals called *rounds*
- Rewards are automatically paid to the account of a collator 2 *rounds* after they have been accrued.
- Rewards are not compounded.
- Removing or Reducing the candidate bond is subject to a **7 day waiting period**
- Reducing the candidate bond below the 400_000 MANTA minimum is not possible ( except by removing )
- There is (currently) no slashing if your collator misses a block, but your delegators won't like their missing rewards.