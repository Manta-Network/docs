---
sidebar_position: 2
---

# Get Calamari

## Choose your installation variant

### Option 1: Build From Source

Use this option if you are comfortable working with Cargo and Rust source code and have time or a fast multi-core processor for compiling.

The following instructions are for latest Ubuntu distribution.

```bash
# install build deps
sudo apt-get update
sudo apt-get -y install build-essential clang curl git libssl-dev make pkg-config

# follow steps in the following link to install the rust toolchain
https://substrate.dev/docs/en/knowledgebase/getting-started/

cargo install \
  --git https://github.com/Manta-Network/Manta \
  --branch manta-pc \
  --features calamari \
  --verbose \
  --locked \
  --force

# the built binary will be at: ${local_manta_repo_path}/target/release/manta
```

In case you are experiencing problems with the rust version use the following toolchain:
```
  stable-x86_64-unknown-linux-gnu
  rustc 1.53.0 (53cb7b09b 2021-06-17)
```

If you want to generate the relay chain chain-spec you will first need the Polkadot binary:

```
cargo install \
  --git https://github.com/paritytech/polkadot \
  --branch release-v0.9.8 \
  --release \
  --verbose \
  --locked \
  --force
```

Then you will ned to run this command to generate the file:

```bash
./target/release/polkadot build-spec \
  --chain rococo-local
  --disable-default-bootnode
  --raw 
  > rococo.json
```

### Option 2: Use a Binary Release

1. Get the binary ---> https://github.com/Manta-Network/Manta/releases/download/v3.0.0-b63b2d2/calamari-pc
2. Get the relay chain chain-spec file ----> https://github.com/Manta-Network/Manta/releases/download/v3.0.0-b63b2d2/rococo.json

Take note of the locations of these files, you will need them in the next section.