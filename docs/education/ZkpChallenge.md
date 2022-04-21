# Manta Zero Knowledge Proof Challenge

# zkSummit7 Challenge

The U.S. Department of Defense has run into a serious problem: they have a list of numbers (finite field elements) and they need to know the inverse of each number.  They refuse to explain why, but they have posted a bounty of 1 trillion USD that can be claimed by anyone able to compute those missing inverses. Lucky for you, you know about the arkworks library -- an open source project full of useful algorithms for finite field arithmetic, polynomial algebra, and other  cryptographic math.  So you call up the DoD and tell them that you have the numbers they need and will deliver them as soon as you receive 1 trillion dollars worth of ETH. They don't believe you, though; they say they want to see the numbers first and they'll pay you after. 

Classic standoff. What can we do?  Well it turns out that even though the DoD doesn't know how to do basic finite field arithmetic, they do know about SNARKS.  So they agree that if you can send a cryptographic proof that you solved the problem then they will pay you half the bounty after the proof verifies and the other half after they receive the numbers.  

You suspect that they may break their promise to pay the second half of the bounty, but you figure that even 500 billion USD ain't bad for an afternoon's work, so you agree to their terms.

**The Challenge**

You have been provided with a list of finite field elements. You must submit a proof that you know the inverses of each of these numbers. The proving scheme you will use is described in detail on the Manta Docs webpage -- essentially it's a collection of scalars and elliptic curve points that you could only come up with if you really do know all the inverses.

You will submit this proof to Manta (a blockchain that both you and the DoD know and love for its excellent anonymity and security guarantees) and if it verifies then you will be entered in a lottery to determine the winner of the bounty (which, sadly, is considerably less than 1 trillion USD).

## The Code

The code for the challenge can be found [here](https://github.com/Manta-Network/ZKSummitHackingChallenge).

## Download Rust
See `https://www.rust-lang.org/tools/install`

## Get Some Background

We put together a presentation that gives some background to ZK proofs.  It's aimed towards an audience that is totally new to the field, so if you've got some experience then skip around a bit to the parts that matter to you.  Follow this link to the [video](https://drive.google.com/file/d/1mwLsnU_1mNWUV7f7jYAwcJDet7aQETaD/view?usp=sharing) and use these timestamps to navigate:

What’s a SNARK? 0:00 - 3:45

ABC Proof 3:45 - 5:00

Polynomial Interpolation 5:00 - 7:50

Arithmetization 7:50 - 18:21

Polynomial Commitment 18:21 - 23:39

Prove/Verify 23:39 - end

## Write Your Solution

Your task is to fill in the body of the `create_proof` method in the `prove.rs` module (not the `prove.rs` binary!).  You have been provided with all the necessary functions to perform polynomial interpolation and commitment and you will assemble these to fill in the body of `create_proof`. 

You can check a solution using the test called `verify_proof` in the `verify.rs` module -- that test is calling the `create_proof` method that you wrote and then calling the function we will use to verify your proof.  If the test passes then congratulations! Your proof is correct.

## Submit Your Proof On-Chain

When you have a solution you will run the `prove.rs` binary:

```sh
cargo run --release --bin prove
```

The output consists of a hash and a hexadecimal number.  That hexadecimal number is the serialization of your proof (remember the proof itself consists of some elliptic curve points and finite field elements, so we serialize these data for submission).  The hash is a way of committing to your answer.  You will send us the hexadecimal number and hash via a google form and you will commit to your solution by submitting the hash on-chain.  

We support two ways of submitting proof hashes:
1. Submit a remark transaction in Polkadot
   * open the web app for polakdot
   * go to `Developer` -> `Extrinsics`, choose `system`, `remark`
     ![polkaot submission](.resources/../resources/polakdot-submit.png)
   * put the hash to the remark field (need to add `0x`)
   * submit the extrinsic to Polkadot blockchain, remember the extrinsic id 
   
2. Submit an transaction with data field in Ethereum
   * choose a wallet that support data field, for example, MyCrypto
   * send an ethereum transaction with the hash as the data field, for example, in MyCrypto, click advanced options 
     ![my crypto](./resources/my-crypto-1.png)
    and add the hash of the zero-knowledge-proof in the data field.
     ![my crypto data](./resources/my-crypto-2.png)
   * send the transaction on chain 

Next, submit this [form](https://forms.gle/ZpGua9DUmwmYgiGdA) with your addess to receive the award and ZKP.

## Got Questions?

Come to our [Discord channel](https://discord.gg/MTBFB5rbJ8) and ask us questions.  We'll issue clarifications and try to help you sort out Rust problems, but we probably won't be giving any hints ;) 