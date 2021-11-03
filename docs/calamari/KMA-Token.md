---
sidebar_position: 2
id: KMA
title: 🐙  Calamari Token (KMA)
---

We list the basic fact about the Calamari token here:

| *Property*           |  *Value*             |  *Remark*                                    |
|----------------------|----------------------|----------------------------------------------|
| Token Name           | `Calamari`           |                                              |
| Token Symbol         | `KMA`                |                                              |
| Total Supply         | 10,000,000,000 KMA   |    10 Billion KMA                            |
| Decimal              | 12                   |  1 KMA = 1,000,000,000,000 basic units       |
| Existential Deposit  | 0.1 KMA              |  minimal balance to keep the account alive   |

## Existential Deposit

The **Existential Deposit** is the minimal amount that a user need to hold in order to make the account active. For example, if Bob creates an account with zero balance, by default, the account would not appear in the ledger state. Now, if Alice sends Bob no less than 0.1 KMA, then Bob balance will be added to `pallet_balances` as part of ledger state. However, if Alice sends Bob less than 0.1 KMA, the transaction would be rejected since if ledger accepts the transaction, Bob will have a KMA balance less than 0.1, which will violate the *existential deposit* requirement. Similarly, Alice cannot transfer out her balance such that she has less than 0.1 KMA left. She can either choose leave more than 0.1 KMA or sending all the remaining balances and remove the account from the ledger state. 

## Calamari Token Utility

As Calamari's native currency, `KMA` has following major utilities:
- Existential Deposit. As Calamari's native currency, each single account need to keep a minimal amount of KMA as existential deposit.
- Extrinsic Fee Payment. KMA is used to pay the fee for every extrinsic, and as a mechanism to prevent DDoS attack to Calamari.
- Commission Fee. Commission fee for private payment/private swap.
- On-Chain Governance: KMA holders can use the token to join the on-chain governance, voting for the governance proposal.  


## Calamari Token Distribution

KMA follows a community driven distribution philosophy. The majority portion of KMA tokens will be owned by community members.
There is no team allocation; furthermore, there are no private rounds or private investors. The first community distribution is
via rewards for community members who contribute to Calamari's first Kusama Crowdloan.

![Calamari Supply](/img/calamari-supply.png)