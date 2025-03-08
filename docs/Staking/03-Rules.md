# Roles and Rules

\* -> **NEEDS TO BE CONFIRMED**

A Manta Network user can choose to be any of the following:
- Token delegator
- Node operator
- Not participating in staking

Different rules apply for node operators and token delegators, and the roles are mutually exclusive.
To switch between the two, you'll need to leave your current role by unbonding all your MANTA and then re-bond in the new role.

## For Delegators

- Minimum delegation amount: 500 MANTA
- Maximum no. of delegators eligible for rewards per node operator: 100

:::info Dynamic Minimum Delegation Amount

If a node operator has more than 100 delegators, the minimum delegation to earn rewards will be higher than the base 500 and will increase dynamically based on other delegators' stakes. Check the [delegation dApp](https://app.manta.network/manta/stake) for real-time thresholds.

:::

- Unbonding period: Removing or Reducing a delegation is subject to a 7 day waiting period
- Reward eligibility:
  - You earn rewards only if your chosen node operator is part of the top 70*, and your delegation amount is part of the top 100 delegators on your node operator
- Reward dynamics:
  - APY decreases as the total amount of staked MANTA increases (your MANTA is buying a smaller share of a larger pot)
  - \*Rewards are calculated in 6 hour intervals called *rounds*
  - \*Rewards are automatically paid to the account of a delegator **2 *rounds* after they have been accrued**
  - Rewards are not compounded and are sent as separate ERC-20 transfers
- You *may* delegate to more than one node operator should you choose to
- Every manta account can delegate to up to 25 node operators
- Slashing: There is (currently) no slashing risk*.

## For Node Operators

- Minimum MANTA bond to join the node operator candidate set: 400,000 MANTA
- Maximum number of active node operators eligible for rewards: 70
- The node operator rank is calculated as the total sum of MANTA staked on the node operator (i.e., the node operator's self-bond and all delegations)
- Maximum number of active delegations (contributing to total stake) on each node operator - 100
- \*Rewards are calculated in 6 hour intervals called *rounds*
- \*Rewards are automatically paid to the node operator account as per the settlement schedule
- Rewards are not automatically compounded.
- Unbonding period: Removing or reducing the node operator's self-bond is subject to a 7 day waiting period
- Reducing the operator's self-bond below the 400,000 MANTA minimum is not possible (except by unbonding completely)
- Slashing: \*There is (currently) no slashing if your node misses a block, but your delegators will not receive rewards for missed blocks.