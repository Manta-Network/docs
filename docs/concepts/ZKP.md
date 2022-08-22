# Zero-Knowledge Proofs

The concept of Zero-Knowledge Proofs (ZKPs) was first invented by Shafi Goldwasser, Silvio Micali and Charles Rackoff in their seminal paper, “Knowledge Complexity of Interactive Proof Systems” in the 1980s. The idea is that someone (the prover) can prove the correctness of a statement to someone else (the verifier) without disclosing any information.

 ![zkp paper](./resources/zkp-paper.png)

 Despite being considered as a theoretical breakthrough, even the cryptography community labeled the scheme as impossible in practice when the idea was born. Thanks to many breakthroughs made in the recent years, especially the contribution made by many web3 projects like ZCash and Aztec, we have seen a Moore’s Law style improvement on the performance of zero-knowledge proof systems. 

## Properties of Zero-Knowledge Proof Systems

Generally, zero-knowledge proof systems should have the following 4 crucial properties:

* **Completeness**: An honest prover can convince the verifier about any statement he/she knows.
* **Soundness**: A computationally bounded prover cannot forfeit a proof that can convince an honest verifier.
* **Zero-Knowledge**: The proof doesn’t leak any information other than the proof itself.
* **Succinctness**: The proof size is constant or logarithmic compared with the circuit size (ie. the amount of computation) of the statement.

## Trusted Setup

To-Do

In order to generate a ZKP, both the prover and the verifier need to commit to some shared secret and use this shared secret to generate public parameters. This secret is referred to as *toxic waste*. If this secret is revealed, an attacker could fabricate zero-knowledge proofs to fool the verifiers.

To solve this issue, cryptographers from ZCash/Berkeley/Technion came up with a solution: using Multi-Party Computation (MPC) to do a ceremony called Trusted Setup for the zero-knowledge proof system. By doing so, as long as there is *a single person* who is honest during the ceremony (an honest person would discard the toxic waste successfully), the entire system is safe.

Manta's trusted setup has two phases:
* **Phase 1**: We reuse ZCash's power of tau ceremony result ([code](https://github.com/ebfull/powersoftau), [list of contributors](https://github.com/zcash-hackworks/sapling-mpc/wiki)). 
* **Phase 2**: We would like to ask Manta community members to join the phase 2 trusted setup. Stay tuned!