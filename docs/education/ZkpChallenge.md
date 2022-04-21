# Manta Zero Knowledge Proof Challenge

# zkSummit7 Challenge

## Download Rust

## Download the Setup File

We have generated a trusted setup for this challenge.  It is the 'setup.dat' file.  

## Write Your Solution

Your task is to fill in the body of the `create_proof` method in the `prove.rs` module (not the `prove.rs` binary!).  You have been provided with all the necessary functions to perform polynomial interpolation and commitment and you will assemble these to fill in the body of `create_proof`. 

You can check a solution by writing a test that 

## Submit a Proof

When you think you have a solution you will run the `prove.rs` binary:

```sh
cargo run --release --bin prove -- --setup=setup.dat
```

The output consists of a hash and a hexadecimal number.  That hexadecimal number is the serialization of your proof (remember the proof itself consists of some elliptic curve points and finite field elements, so we serialize these data for submission).  The hash is a way of committing to your answer.  You will send us the hexadecimal number and hash via a google form and you will commit to your solution by submitting the hash on-chain.  