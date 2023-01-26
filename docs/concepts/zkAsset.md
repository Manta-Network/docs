# zkAssets

zkAssets are a new crypto asset class where privacy, integrity, and access policy are guarded by zero-knowledge proofs. A zkAsset consists of two parts:
* **AssetID**: The type of asset, for example BTC, ETH, DOT.
* **AssetValue**: The owned amount of said asset.

## Properties
zkAssets have the following properties:

* **Flexible Asset Types**: zkAssets include flexible asset types, for example, fungible tokens (e.g. ERC20 like tokens), non-fungible tokens (e.g. ERC721, ERC1155 like tokens), non-transferable non-fungible tokens (a.k.a soul bound tokens).

* **Privacy by Default**: zkAssets are private by default (a.k.a. zero-knowledge) on chain, which means that the asset holder’s zkAddress, the nomination of the assets of each holder, as well as the type of the assets are encrypted on chain.

* **Disclosing at Will**: zkAssets support disclosing provable assets information with the assets holders permission. More specifically, the asset holders can disclose the asset transaction history to auditors without having to disclose the spending secret key. The asset holders are also able to selectively disclose the assets information that can be verified using zero-knowledge proofs (see [proofID](proofID.md)).

* **Configurable Asset Policy**: zkAssets issuer can customize the access control policies of a zkAssets, for example, KYC rules, access control policy e.g. to have or not have the ability to blacklist the hacked assets.

## zkAssets and UTXOs

To allow for the privatisation of zkAssets, we employ the Unspent Transaction Output (UTXO) model. There are two kinds of UTXOs:

* **Transparent UTXOs**: They don't conceal the AssetID nor the AssetValue of the zkAsset. This is very convenient for the enforcement of smart contracts on-chain.
* **Opaque UTXOs**: They conceal the zkAsset. This is the default for private payments.

When sending both transparent and opaque UTXOs, the identities of the sender and the receiver remain private.

Opaque UTXOs are cryptographic commitments to zkAssets. In non-technical language, one should think of opaque UTXOs as envelopes where you can put your banknotes, the zkAssets. To make a private payment in this case, a sender can simply hand the envelope with the money to a receiver, without publicly disclosing how much money they’re putting in the envelope.

Unfortunately, in this real world scenario, there’s no way to ensure that the money in the envelope is what it was agreed to be without opening it, breaking privacy. MantaPay guarantees the transfer is properly executed while keeping all zkAssets involved private by using zero-knowledge proofs (ZKPs).
