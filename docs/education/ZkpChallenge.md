# Manta Zero Knowledge Proof Challenge

# zkSummit7 Challenge

## Download Rust
See `https://www.rust-lang.org/tools/install`

## Get Some Background

We put together a presentation that gives some background to ZK proofs.  It's aimed towards an audience that is totally new to the field, so if you've got some experience then skip around a bit to the parts that matter to you.  Follow this link to the video on our youtube channel.

## Write Your Solution

Your task is to fill in the body of the `create_proof` method in the `prove.rs` module (not the `prove.rs` binary!).  You have been provided with all the necessary functions to perform polynomial interpolation and commitment and you will assemble these to fill in the body of `create_proof`. 

You can check a solution using the test called `verify_proof` in the `verify.rs` module -- that test is calling the `create_proof` method that you wrote and then calling the function we will use to verify your proof.  If the test passes then congratulations! Your proof is correct.

## Submit a Proof

When you have a solution you will run the `prove.rs` binary:

```sh
cargo run --release --bin prove -- --setup=setup.dat
```

The output consists of a hash and a hexadecimal number.  That hexadecimal number is the serialization of your proof (remember the proof itself consists of some elliptic curve points and finite field elements, so we serialize these data for submission).  The hash is a way of committing to your answer.  You will send us the hexadecimal number and hash via a google form and you will commit to your solution by submitting the hash on-chain.  

## Got Questions?

Come to our Discord channel and ask us questions.  We'll issue clarifications and try to help you sort out Rust problems, but we probably won't be giving any hints ;) 