# Manta Zero Knowledge Proof Challenge

# zkSummit7 Challenge

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

## Generate a Proof

When you have a solution you will run the `prove.rs` binary:

```sh
cargo run --release --bin prove -- --setup=setup.dat
```

The output consists of a hash and a hexadecimal number.  That hexadecimal number is the serialization of your proof (remember the proof itself consists of some elliptic curve points and finite field elements, so we serialize these data for submission).  The hash is a way of committing to your answer.  You will send us the hexadecimal number and hash via a google form and you will commit to your solution by submitting the hash on-chain.  


## Submit your proof hased on-chain and zero-knowledge-proof to us

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
