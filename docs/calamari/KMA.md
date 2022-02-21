# 🐙 Calamari Token (KMA)

We list the basic facts about the Calamari token here:

| Property            | Value              | Remark                                    |
| ------------------- | ------------------ | ----------------------------------------- |
| Token Name          | `Calamari`         |                                           |
| Token Symbol        | `KMA`              |                                           |
| Total Supply        | 10,000,000,000 KMA | 10 Billion KMA                            |
| Decimal             | 12                 | 1 KMA = 1,000,000,000,000 basic units     |
| Existential Deposit | 0.1 KMA            | minimal balance to keep the account alive |

## Existential Deposit

The **Existential Deposit** is the minimal amount that a user needs to hold in order to keep the account active. For example, if Bob creates an account with zero balance, by default, the account will not appear in the ledger state. Now, if Alice sends Bob no less than `0.1 KMA`, then Bob's balance will be added to `pallet_balances` as part of ledger state. However, if Alice tried to send Bob less than `0.1 KMA`, the transaction would be rejected since if ledger the accepted the transaction, Bob will have a `KMA` balance less than `0.1`, which will violate the _existential deposit_ requirement. Similarly, Alice cannot transfer out her balance such that she has less than `0.1 KMA` left. She can either choose to leave more than `0.1 KMA` or send all the remaining balances and remove the account from the ledger state.

## Calamari Token Utility

As Calamari's native currency, `KMA` has following major utilities:

- Existential Deposit. As Calamari's native currency, each single account need to keep a minimal amount of `KMA` as existential deposit.
- Extrinsic Fee Payment. `KMA` is used to pay the fee for every extrinsic, and as a mechanism to prevent DDoS attacks on Calamari.
- Commission Fee. Commission fee for private payment/private swap.
- On-Chain Governance: `KMA` holders can use the token to join the on-chain governance, voting for governance proposals.

## Calamari Token Distribution

`KMA` follows a community-driven distribution philosophy. The majority portion of `KMA` tokens will be owned by community members.

![Calamari Supply](/img/calamari-supply.png)

There is no team allocation; furthermore, there are no private rounds or private investors. The first community distribution is
via rewards for community members who contribute to Calamari's first Kusama Crowdloan.
