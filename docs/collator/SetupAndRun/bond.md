---
sidebar_position: 6
sidebar_label: ⏳ Bond
title: 🚄 Setup and run a Collator
hide_title: false
---

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Sync](sync) > [Session keys](keys) > Bond

## ⏳ Finally

### Bonding requirement

An amount of KMA must be bonded and is not transferable whilst collating. This amount should be present as a transferable balance within the collator account at the time that the `joinCandidates` extrinsic is run.

The current candidacy bond amount can be checked on the [calamari chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) &gt; collatorSelection &gt; candidacyBond(): u128.
![Candidacy Bond](/img/collator-program/candidacy-bond.png)

### 💓 Starting collation

Run the `joinCandidates` [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) in a browser.

![session.setkeys()](/img/collator-program/parachainStaking.joinCandidates.png)
