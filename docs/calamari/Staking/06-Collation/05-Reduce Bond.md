### Reduce Bond

- Run the `parachainStaking` extrinsic `scheduleCandidateBondLess` function [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) from the account you bonded your collator with and enter the desired amount to reduce from bond. Remember polkadot.js needs, the KMA amount with 12 decmals.
- Wait for 7 days.
- Run the `parachainStaking` extrinsic `executeCandidateBondLess` function [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) from the account you bonded your collator with to withdraw the expected KMA to the account.
