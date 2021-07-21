---
sidebar_position: 2
---

# Get Calamari

## Choose your installation variant

### Option 1: Build From Source

Use this option if you are comfortable working with Cargo and Rust source code and have time or a fast multi-core processor for compiling.

#### **1. Build Dependencies**

It is easiest to build Manta on Ubuntu and macOS. The following instructions are for latest Ubuntu and macOS distribution.

#### **Ubuntu**

```bash
# install build deps
sudo apt-get update
sudo apt-get -y install build-essential clang curl git libssl-dev make pkg-config
```

#### **macOS**
If you are on x86 Intel system, use it:
```bash
# install Homebrew first
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Update your homebrew and install openssl
brew update
brew install openssl
```

If you are on Apple M1 ARM system, you can refer the following instructions:

```bash
# install Homebrew as the same
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Update or install the following dependences
brew install -s cmake
brew install -s gcc
brew install -s llvm
brew install protobuf
```
#### **2. Set up Rust Evironment**
Then you need to set up your rust toolchain. In case you are experiencing problems with the rust version use the following toolchain:

```
rustc 1.53.0 (53cb7b09b 2021-06-17)
rustc 1.55.0-nightly (a435b49e8 2021-06-28)
```

Use `rustup` to help you manage your toolchain. First of all, install it:
```bash
# Install
curl https://sh.rustup.rs -sSf | sh
# Configure
source ~/.cargo/env
```

Then use `rustup` to install stable and nightly toolchain. 
```bash
rustup default stable
rustup update
rustup update nightly-2021-06-28 # Here we suggest you to specify the nightly version
rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-28
```
#### **3. Build the Calamari**
You can use the following commands to build our Calamari chain from Github:
```bash
cargo install \
  --git https://github.com/Manta-Network/Manta \
  --branch manta-pc \
  --features calamari \
  --verbose \
  --locked \
  --force

# the built binary will be at: ${local_manta_repo_path}/target/release/manta
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