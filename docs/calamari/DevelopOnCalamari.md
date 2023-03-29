# 🛠 Develop on Calamari

## Introduction
This guide provides step-by-step instructions to connect to a Calamari node to test your applications on the public testnet named Calamari. Calamari is the public testnet of Manta, which in turn is Manta Network's canary. A Calamari node acts as your personal development environment to build and test applications for the Manta Network.

## Download Binary File

To download an official release of Calamari, visit our [release page](https://github.com/Manta-Network/Manta/releases).

## Connecting With Polkadot-JS

For development purposes, it is recommended to use the public Dolphin testnet.

1. Open a browser to `https://polkadot.js.org/apps/#/explorer`. This opens Polkadot.js Apps, which connects to Polkadot MainNet by default.
2. In the top-left corner, open the menu and navigate to the Development sub-menu.
3. Enter `wss://ws.calamari.seabird.systems` under custom endpoint.
4. Click the `Switch` button to connect to your Calamari development node.

With Polkadot.js Apps connected, your Calamari development node will be ready to receive transactions and produce blocks.

## Network Endpoints

List of the load-balancer endpoints provided by Calamari:
* WSS - `wss://ws.calamari.seabird.systems`
* HTTPS - `https://rpc.calamari.seabird.systems`

## Build Binary File

Building your own binary is especially useful if you're not working on a Linux as we don't distribute binaries for Mac/Windows. Furthermore should you need to customize something in your testing environment related to the node, you can rebuild it locally:

1. Clone the specific tag of the Calamari repository from this URL: `https://github.com/Manta-Network/Manta/`

```sh
git clone https://github.com/Manta-Network/Manta
cd Manta
```

2. Install Rust:
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

3. Update your PATH environment variable with this command:
```sh
source $HOME/.cargo/env
```

4. To build and run the binary file, choose one of the following options:
```sh
  cargo build --release
  ./target/release/manta --chain=calamari-localdev --alice --tmp
```

or:

```sh
cargo run --release -- --chain=calamari-localdev --alice --tmp
```

Note: `calamari-localdev` eliminates the need for a relay chain and creates blocks automatically when transactions are received.

Note: For a complete simulation, you can run a relay chain with a full parachain using tools like [zombienet or polkadot-launch](#Development-Tools). In that case you need to run the node with `--chain=calamari-local`

## Chain ID

Dolphin testnet chain id is `2084`

## Block Explorer

A block explorer is like a search engine for the blockchain. It lets you search for information such as balances, contracts, and transactions.

Subscan is the main block explorer for the Substrate API. It can handle both standard and custom modules, so you can see information about Staking, Governance, and XCM pallets (or modules), among others. The code is open-source and available on the [Subscan Essentials GitHub repo](https://github.com/subscan-explorer/subscan-essentials).

Polkadot.js Apps is another option, especially if you're running local development nodes. It's not a full-featured block explorer, but it lets you view events and query transaction hashes using the WebSocket endpoint. You can easily connect to Moonbeam, Moonriver, or Moonbase Alpha.

## Faucet

To use the Dolphin faucet, head to our [Discord channel](https://discord.com/channels/795390654628102165/1055864933692219453).

To receive tokens from the faucet, you'll need to get the attention of the faucet bot. Start by typing the command for the token you want, such as `/gimme-dol`. Discord will display a small pop-up asking for your wallet address.

Type or paste your wallet address into the address field, then press enter to trigger the faucet request.

You can request each of the four supported tokens (`DOL`, `KAR`, `KSM`, `MOVR`) once per UTC day. If you request the same token twice in the same day, the faucet bot will only respond with the status of your first request of the day. You can check the status of your address at https://faucet.dolphin.community/.

## Development Tools

* `manta.js Javascript SDK`: A set of functionality which connects your public address (polkadot-js), your private addresses (`manta-signer`) and manages the creation of the payloads required for `MantaPay` extrinsics.
* `Manta-Signer`: The signer is a desktop application which generates zero knowledge proofs and manages the private keys of your UTXOs. The signer is open sourced and you find instruction to set it up locally at [manta-signer](https://github.com/Manta-Network/manta-signer).
* [zombienet](https://github.com/paritytech/zombienet) or the deprecated [polkadot-launch](https://github.com/paritytech/polkadot-launch) tool can help you set up a full relaychain + parachain network.
* `Manta zkSBT SDK`: zkSBT sdk is extension of manta-pay sdk, and add some custom logic, including:
  - We have a pre-charge steps when reserve asset id of zkSBT.
  - User mint zkSBT by provide metadata, the metadata of zkSBT can be image url or anything, but we have a size limit of metadata(Current is 300 length).
