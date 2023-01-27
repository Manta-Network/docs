# zkAddresses

One essential concept in MantaPay is **zkAddresses**. A zkAddress is a reusable address for your private assets in Manta. It has the following properties:

1. **Reusable**: A zkAddress can be safely used multiple times without compromising privacy by establishing relations between transactions.
2. **Public**: It is safe to publish your zkAddress without worrying about privacy leakage. MantaPay is designed such that zkAddresses are not disclosed on-chain.
3. **Independent**: Your zkAddresses are not associated with any public addresses. For example, you can freely convert a public asset in public address `A` to private assets in a zkAddress `S`, and then convert it back to public assets in public address `B`.
4. **Auditable**: All the transactions in a zkAddress can be audited using a viewing key.

## zkAddress System

The zkAddress is a part of our zkAddress system, which provides the user with different levels of rights over zkAssets.

![zkAddress system](./resources/zkAddress.png)

* The **zkAddress** grants the right to send zkAssets to the holder of the corresponding secret key.

* The **viewing key** grants the right to view all transactions of the holder of the corresponding secret key. The viewing key can be given to third parties for accounting/auditing purposes or to help the authorities track down illegal activity.

* The **proof authorization key** grants the right to generate ZKPs for transfer validity on behalf of the holder of the corresponding secret key. This can be useful to delegate proof generation to specialized hardware without granting spending rights.

* The **secret key**, also known as **spending key**, grants the user full rights over the assets owned by it, that is, those zkAssets sent to the corresponding zkAddress and not yet spent.

## zkAddress System: the math

It would be disastrous if someone could deduce the spending key or the viewing key from the zkAddress. Let's see why the zkAddress system is cryptographically secure.

The spending key is a field element, and the proof authorization key is an elliptic curve point derived from the spending key by multiplication by a generator. The same applies to the viewing key and the zkAddress. These two derivations are secure because of the discrete logarithm assumption. 

The viewing key is derived from the proof authorization key by applying a cryptographic hash function. The [properties](https://en.wikipedia.org/wiki/Cryptographic_hash_function#Properties) of a cryptographic hash function make it impossible to find preimages, thus making this derivation safe.

## zkAddress vs Ethereum/Polkadot public address

A zkAddress, and its associated spending, proof authorization and viewing keys, operate only with zkAssets. It uses a different (zero-knowledge proof friendly) cryptographic construction to support viewing keys and to make the zero-knowledge proof generation efficient. Thus, we cannot reuse the existing Ethereum or Polkadot public addresses to support zkAssets. Additionally, there is no binding (or mappings) between the zkAddress and Ethereum/Polkadot public addresses.