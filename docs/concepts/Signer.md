# Manta Signer

The **Signer** is a _secret manager_ and _zero-knowledge proof generator_ for use with the [Manta](../manta/Overview.md), [Calamari](../calamari/Overview.md), and [Dolphin](../dolphin/Overview.md) networks. 

## Why do you need Signer?

The Manta protocols are privacy-first protocols, and zero-knowledge proofs are integral to the design and functionality of these protocols. The secrets that _only you_ know about represent your identity on the blockchain. The **Signer** will be the computational extention of those secrets, being able to construct proofs based on them. Then, you can send those proofs to the blockchain to update the ledger with the changes _only you_ can make to it.

Our goal is to improve the zero-knowledge proof generation speed to *eventually* get rid of signer.

## Difference between the Signer and Polakdot.js/Talisman wallets?

Polakdot.js/Talisman constrols the spending secrets of the public address. **Manta Signer** controls the spending secrets of [shielded addresses](./ShieldedAddress.md).
