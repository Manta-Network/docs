---
sidebar_position: 1
---

# Get Manta

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
rustup update
command -v wasm-gc || cargo +nightly install --git https://github.com/alexcrichton/wasm-gc --force

# clone the repository
git clone https://github.com/Manta-Network/Manta.git ${local_manta_repo_path}

# build manta
cd ${local_manta_repo_path}
cargo build --verbose --release -p manta

# the built binary will be at: ${local_manta_repo_path}/target/release/manta
```

### Option 2: Use a Binary Release

Use this option if you are running Linux and want to get up and running quickly.

* Manta releases can be downloaded from the Github Manta releases page at:  
  https://github.com/Manta-Network/Manta/releases
* The __latest__ release is available at:  
  https://github.com/Manta-Network/Manta/releases/latest
