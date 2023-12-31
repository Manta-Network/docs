## Overview

&emsp;&emsp;[POMP](https://twitter.com/AppPOMP)(Proof Of My Possessions) is an <span style={{color:'red'}}>online</span> <span style={{color:'blue'}}>private</span> asset verifier : Prove your assets without revealing addresses, ensuring privacy and data protection.

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

Verify Twice ?

## Semaphore

&emsp;&emsp;[Semaphore Protocol](<(https://semaphore.appliedzkp.org/)>) allows to prove group membership in merkle tree without revealing identity.

&emsp;&emsp;We have previously undertaken development based on the Semaphore protocol and attempted to optimize it.

&emsp;&emsp;[zkvote](https://zkvote.webflow.io/) zkVote leverages the membership and signal of the Semaphore protocol to achieve anonymous voting, with external nullifier to prevent replay attacks.

&emsp;&emsp;[merkle forest](https://github.com/samzkback/merkle-forest) is designed to archive elastic group, which has been involved to [semaphore V4 roadmap](https://github.com/orgs/semaphore-protocol/projects/10/views/3?pane=issue&itemId=15084394).

## Binding POMP sbt/timestamp in Semaphore

An unique Position, who also bind to a certain sbt, is defined by several parameters:

-   asset type : eth/bnb..
-   asset range : 100~1000, >10000, 1% whale?
-   position timestamp : "Jun-21-2023 03:58:11", "block 17525512"

It would be more efficient and flexalbe to make the merkle tree per asset type/range, while postion timestamp and sbt id shoule be bind to semaphore identity.

Thus, we will make minor changes on semaphore protocol, the change is aim to resue semaphore libaries as much as possible.

```mermaid

flowchart LR
    %%style at fill:#EE784E,stroke:#EE784E,stroke-width:1px
    %%style ar fill:#EE784E,stroke:#EE784E,stroke-width:1px
    %%style vt fill:#EE784E,stroke:#EE784E,stroke-width:1px
    style sbt fill:#EE784E,stroke:#EE784E,stroke-width:1px

    style H6 fill:#85E8C2,stroke:#85E8C2,stroke-width:1px


s(PRIV - Siblings) & pi(PRIV - Path Indices) --> M1((MT Verifier)) --> mr(PUB - MT Root of asset/range)
  it(PRIV - Identity Trapdoor) & in(PRIV - Identity Nullifier) --> H2((Poseidon Hash)) --> |Secret| H3((Poseidon Hash)) --> |Identity Commitment| H6((Poseidon Hash)) --> |Per SBT Identity| mr

 %%at(PUB asset_type) & ar(PUB - asset_range) &
 %%vt(PUB - verify_time) &
sbt(PRIV - zkSBT_id) --> H6


in(PRIV - Identity Nullifier) & en(PUB - External Nullifier) --> H4((Poseidon Hash)) --> n(PUB - Nullifier)

%%sig(PUB - Signal Hash) --> S1((Square))
```

Minor changes to Semaphore :

-   PompIdentity derive from Idenity

    ```typescript
    export class PompIdentity {
        private semaphore_identity: Identity;
        private sbt_id: number;
        private _commitment: bigint;

        constructor(keysJson: string, sbtId: number) {
            this.semaphore_identity = new Identity(keysJson);
            this.sbt_id = sbtId;
            this._commitment = poseidon2([
                this.semaphore_identity.getCommitment(),
                this.sbt_id,
            ]);
        }
    }
    ```

-   nothing changes to Group
-   minor changes to Proof

## Workflow

There are several stages :

-   identity derive
-   mint
-   on-chain verify
-   off-chain verify

```mermaid
sequenceDiagram
    participant F	as User/Frontend
    participant B 	as Backend
    participant C 	as Contract/Blockchain
    participant R 	as Relayer

    F -->> F  : connect_wallet
    F -->> F  : (trapdoor, nullifier) = sign("generate pomp secret")
    F -->> F  : id = poseidon(poseidon(trapdoor, nullifier))

    rect rgba(0, 220, 220, .3)
    %%F -->> B : mint("ETH", ">100") request
    %% B -->> F : "salt" to prevent atack reply
    %%F -->> B : sign_mint = sign("mint pomp ETH>100 under $salt")
    F -->> B : sign_mint = sign("mint pomp ETH>100")
    B -->> B : check sign_mint valid
    B -->> C : verify_time = query(balance > 100 ? true)
    %% B -->> F : eligble(query_time)

    B -->> B : allocate SBT id
    B -->> B : id_per_sbt = poseidon(id, SBT_id, verify_time)
    B -->> C : add id_per_sbt to "merkle tree(asset, range)"
    end

    %% on-chain verify
    rect rgba(220, 110, 220, .3)
        F -->> R : zkp = prove(path, time, sbt_id, id, root, external_nullifier)
        R -->> C : verify(zkp)
    end

    %% off-chain verify
    rect rgba(0, 110, 220, .3)
        B -->> F : salt
        F -->> B : zkp = prove(path, time, sbt_id, id, root, external_nullifier)
        B -->> B : verify(zkp)
    end


```

## identity derive

Per [Semaphore secret recover tips](https://semaphore.appliedzkp.org/docs/guides/identities), Follow [Aztec Style Address](https://github.com/AztecProtocol/aztec-connect/blob/c39b4752aa260d3a857e15f9df8da1b3a384ccdb/yarn-project/sdk/src/aztec_sdk/aztec_sdk.ts#L198-L226), so that no extra mnemonics for users, thus don't need key management mechinism (like snap)

-   $(trapdoor, nullifier) = eth\_addr.signMessae('Sign\ xxx\ to generate\ xxx')$

derive identity as semaphore:

-   $id = poseidon(trapdoor, nullifier)$

derive per sbt identity:

-   $sbt\_it = poseidon(id, sbt\_id, query\_time)$

Note, the dApp does not store the derived secret key.

<!-- How to prevent Phishing？(not our duty?) -->

## "private" Mint

1. zkSBT is non-transferable NFT, All pre-mint to server address
2. server bind to user identity after verify asset valid.
3. server add membership to merkle tree, so there is no on-chain collision.
 <!-- 4. on-chain verify "user indeed want a zkSBT" by check "identity generate"? -->

## private Verify

-   on-chain verifier contract.

```solidity
    enum ASSET {
        ETH,
        BNB
    }
    enum RANGE {
        RANGE_0,       // >0
        RANGE_1_10,    // 1~10
        RANGE_10_100,  // 10~100
        RANGE_100      // >100
    }
    // asset_type --> asset_range --> merkle tree)
    mapping(uint256 => mapping(uint256 => uint256)) groups;
    // external nullifier, increase per verify.
    mapping(uint256 => uint256) salts;

    function verifyProof(
        uint merkleTreeRoot;
        uint nullifierHash;
        uint externalNullifier;
        uint256[8] calldata proof
    ) returns (bool)

```

-   off-chain verify.

```typescript
interface IPomp {
    getSalt: (id: number, asset: number, range: number) => Promise<number>;
    verifyProof: (
        merkleTreeRoot: BigNumberish,
        nullifierHash: BigNumberish,
        externalNullifier: BigNumberish,
        proof: Proof
    ) => Promise<number>;
}
```

## Merkle Forest

&emsp;&emsp;Merkle Tree With depth 20 has 1M capability, probably still not enough, as there are 100M+ ethereum account, and still growth without an upper limit, fixed-size merkle tree is not scalable.

&emsp;&emsp;That's why we proposal merkle forest, pomp could be a real use case for more convincing demostrate.

## Manta-wallet/ethereum compatilbe

isolate select zkAddress, or identity.
