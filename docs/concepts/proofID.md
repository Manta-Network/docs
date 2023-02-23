# ProofID

ProofID is a protocol that allows users to verify their identity on-chain. Imagine that a user has an online identity linked to a private soul-bound token (SBT), which is an NFT that cannot be transferred. We refer to the private SBT as a zkSBT. To prove their identity, they would need to:
1. Show the zkSBT has been minted to their zkAddress.
1. Show they have spending rights to that zkAddress.

## Transaction Data
In order to perform the first step, let us recall how a [zkAsset (in this case, a zkSBT) is encoded in a UTXO](zkAsset.md)
* $UTXO = \textsf{commit}(zkSBT, zkAddress, salt)$

which is then posted on-chain. The salt is a randomly generated quantity used to prevent UTXO duplication: if the same zkAsset sent to the same zkAddress generated the same UTXO, that would compromise privacy.

Therefore, to prove that a certain zkAddress owns a zkSBT, it is enough to give the verifier the zkSBT data, namely the AssetID and AssetValue (which is always 1 for NFTs/SBTs) and the salt used to encode the UTXO. The verifier would then reconstruct the UTXO with these data and cross-reference it with the blockchain.

## Identity Proof
In order to perform the second step, the verifier will send the prover a challenge, namely a virtual zkAsset with some salt. The prover will then create a UTXO to their zkAddress encoding this zkAsset with the provided salt and generate a virtual (i.e. off-chain) ToPublic transaction reclaiming it. The public outputs of this virtual transaction and the ZKP are then sent to the verifier. 

The verifier checks the transaction output as follows:
1. The output has a valid signature.
2. The output has a valid ZKP.
3. The output is consistent with the provided zkAsset and salt.

Only the owner of the spending key to that zkAddress would be able to generate such a virtual ToPublic transaction, therefore this is enough to prove ownership of a zkAddress.

## No gas fees!

Even though the first step involves checking some on-chain data, neither the prover nor the verifier post any transactions there. This means that both steps of the ProofID protocol happen off-chain, sparing the user of any gas fees!