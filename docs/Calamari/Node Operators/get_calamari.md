---
sidebar_position: 2
---

# Get Calamari

## Choose your installation variant

### Option 1: Build From Source

Use this option if you are comfortable working with Cargo and Rust source code and have time or a fast multi-core processor for compiling.


```bash
# install build deps
sudo apt-get update
sudo apt-get -y install build-essential clang curl git libssl-dev make pkg-config

# install rust toolchain
curl -s https://sh.rustup.rs -sSf | sh -s -- -y
source ~/.cargo/env
rustup toolchain install nightly
rustup toolchain install stable
rustup default stable
rustup target add wasm32-unknown-unknown --toolchain nightly

TODO: Only update Rust to the version we use. Also what OS are we using.

cargo install \
  --git https://github.com/Manta-Network/Manta \
  --branch manta-pc \
  --features calamari \
  --verbose \
  --locked \
  --force

OR...

# clone the repository
git clone -b manta-pc https://github.com/Manta-Network/Manta.git ${local_manta_repo_path}

# build calamari parachain node
cd ${local_manta_repo_path}
cargo build --verbose --release --features=calamari

# the built binary will be at: ${local_manta_repo_path}/target/release/manta
```

### Option 2: Use a Binary Release

1. Get the binary ---> https://github.com/Manta-Network/Manta/releases/download/v3.0.0-b63b2d2/calamari-pc
2. Get the relay chain spec file ----> https://github.com/Manta-Network/Manta/releases/download/v3.0.0-b63b2d2/rococo.json

Take note of the locations of these files, you will need them in the next section.