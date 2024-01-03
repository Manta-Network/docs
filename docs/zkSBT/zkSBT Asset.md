# zkSBT : Asset Possession Privacy prove with Semaphore-based protocol

## Overview

&emsp;&emsp;[POMP](https://twitter.com/AppPOMP)(Proof Of My Possessions) or [NPO](https://npo-evm.manta.network/evm/sbt)(NFT Private Offering) are based on zkSBT: Prove your assets/nfts without revealing addresses, ensuring privacy and data protection.

&emsp;&emsp;Suppose Alice has an ethereum account with balance more than 100, and she want to prove the position, probably many times.

&emsp;&emsp;A Native Solution is "record the position" as a NFT, and show the NFT to prove. Problem is how to isolate the NFT and ethereum Address, and at the same time prove ownership to the NFT.

&emsp;&emsp;We will demostrate how to promote semaphore protocol to prove ownership of the position without reveal the identity, and also best practice for fee-less verification with an offchain verify server.

## Proof Key

[zkAddress-based Proof Key](https://docs.manta.network/docs/concepts/proofkey) allows users to verify their identity on-chain by prove identity:

-   Show the zkSBT has been minted to their identity(zkAddress).
-   Show they have spending rights to that identity(zkAddress).

The deisgn could be simpler in Semaphore version :

-   SBT is part of seed for generate identity
-   account-specific secret is another part for generate identity.

## Semaphore

&emsp;&emsp;[Semaphore Protocol](https://semaphore.appliedzkp.org/) allows to prove group membership in merkle tree without revealing identity.

&emsp;&emsp;We have previously undertaken development based on the Semaphore protocol and attempted to optimize it.

&emsp;&emsp;[zkvote](https://zkvote.webflow.io/) zkVote leverages the membership and signal of the Semaphore protocol to achieve anonymous voting, with external nullifier to prevent replay attacks.

&emsp;&emsp;[merkle forest](https://github.com/samzkback/merkle-forest) is designed to archive elastic group, which has been involved to [semaphore V4 roadmap](https://github.com/orgs/semaphore-protocol/projects/10/views/3?pane=issue&itemId=15084394).

## Binding sbt/timestamp in Semaphore

An unique Position, who also bind to a certain sbt, is defined by several parameters:

-   asset type : npo(zkBAB, zkPortrait), pomp(eth/bnb)
-   asset attribute : pomp range(100~1000, >10000, 1% whale).
-   position timestamp : "Before Jun-21-2023 03:58:11, After Jun-20-2023 03:58:11"

It would be more efficient and flexalbe to make the merkle tree per asset type/range, while postion timestamp and sbt id shoule be bind to semaphore identity.

Thus, we will make minor changes on semaphore protocol, the change is aim to resue semaphore libaries as much as possible.

-   merkle tree group depth 16, to reduce mint gas
-   unique sbt id
-   leave include hash(identity, sbt_id, verify_time)
-   hash(attribute), as public input.
-   verify timestamp as public input, and verify in circuit

    -   privat verify_time >= given public begin_verify_time
    -   privat verify_time <= given public end_verify_time,

      <div style={{textAlign: 'center'}}>
        <img alt="binding" src="/img/guides/npo/bindingSbtTimestamp.jpg" width="90%"/>
      </div>

## identity derive

Per [Semaphore secret recover tips](https://semaphore.appliedzkp.org/docs/guides/identities), so that no extra mnemonics for users, thus don't need key management mechinism (like snap)

-   $(trapdoor, nullifier) = eth\_addr.signMessae('Sign\ xxx\ to generate\ xxx')$

derive identity as semaphore:

-   $id = poseidon(trapdoor, nullifier)$

derive per sbt identity:

-   $sbt\_it = poseidon(id, sbt\_id, verify\_time, attribute)$

Note, the dApp does not store the de## Merkle Forest

## Merkle Forest

&emsp;&emsp;Merkle Tree With depth 20 has 1M capability, probably still not enough, as there are 100M+ ethereum account, and still growth without an upper limit, fixed-size merkle tree is not scalable.

&emsp;&emsp;That's why we proposal merkle forest, pomp could be a real use case for more convincing demostrate.rived secret key.
