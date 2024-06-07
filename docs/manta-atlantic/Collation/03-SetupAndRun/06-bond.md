---
sidebar_position: 6
sidebar_label: ⏳ Bond
title: 🚄 Setup and run a Collator
hide_title: false
---

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Sync](sync) > [Session keys](keys) > Bond

## ⏳ Bond MANTA

Prospective Collators must post MANTA as a bond on-chain before they are considered collation candidates.
This amount must be present as a transferable balance within the collator account at the time that the `joinCandidates` extrinsic is run.

At launch (Manta v4.4.0), this bond is set to a minimum of **400 Thousands MANTA**.
The current candidacy bond amount can be confirmed [on-chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/chainstate/constants) &gt; parachainStaking &gt; minCandidateStk().

:::note
The bonded MANTA are *locked* in the account, i.e. until you remove the lock by exiting the candidate set, they are:
- NOT TRANSFERRABLE, but
- Available for other on-chain actions like **voting in governance**

Unlocking these tokens is possible through [unbonding](../Unbond) and takes a minimum of 7 days
:::

### 💓 Starting collation

Run the `joinCandidates` [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/extrinsics) from the account you set [your session keys](keys) to in a browser.

![parachainStaking.joinCandidates()](/img/collator-program/parachainStaking.joinCandidates-manta.png)
:::note
**bond** is 400_000_000_000_000_000_000_000 MANTA ( 400 THOUSANDS MANTA with 18 decimals )<br/>
**candidateCount** is a hint for transaction weight ( i.e. gas fee ) that should be larger than the current number of registered collators ( or the transaction will fail ).
The current number can be found by counting the entries on the [manta chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems#/chainstate/constants) &gt; parachainStaking &gt; candidatePool(): u128.
It is safe to just set a high number, but reducing it as much as possible reduces the estimated gas fees that must be available in your account in addition to the bond amount for the transaction to succeed.
:::

Your collator will join the set of block producers and become eligible for rewards at the beginning of the next *round* ( i.e. after a maximum of 6 hours ) **if it is in the top 70 of registered node candidates by total stake** ( i.e. your collator bond + sum of all delegations on your node )
