# 🛠 Develop on Calamari

## Introduction

A blockchain app typically consists of a frontend application connecting to and interacting with a blockchain node via RPC or Websocket.

This guide provides step-by-step instructions test to your frontend application by
- creating a non-networked local blockchain node for no-stakes testing, or
- connecting to a node on the live Calamari Network.

Calamari is a canary network to Manta Network, i.e. an experimental network with real user funds at risk.
To freely test on a public network with no economic risk, check our guide to the [Dolphin Testnet](DevelopOnDolphin.md).

## Developing against a local blockchain node

This mode of development is recommended to work out your app functionality that does not depend on a long (real-world) history of user transactions as it is
- simple
- local to the developer, so no economic risk involved

### Download Manta Executable

To download an official release of Calamari, visit our [release page](https://github.com/Manta-Network/Manta/releases).

### Alternative: Compile Manta Executable

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

4. To build the binary file, run

```sh
  cargo build --release
```

### Running the Blockchain Node

Running the already compiled node can be done by invoking

```sh
  ./target/release/manta --chain=calamari-localdev --alice --tmp
```

Alternatively, you can build and run in one step:

```sh
cargo run --release -- --chain=calamari-localdev --alice --tmp
```

:::note
`calamari-localdev` exposes the websocket at port 9944 by default, if you need to customize this, you can pass an additional parameter `--ws-port 42069` to use e.g port 42069 instead.
:::

:::note
`calamari-localdev` eliminates the need for a relay chain and creates a block each time a single transaction is received (but not otherwise)

If you need a more complete blockchain creating blocks periodically like mainnet, you can use substrate ecosystem tools like [zombienet or polkadot-launch](#Development-Tools) and use the `--chain=calamari-local` chainspec when running the nodes instead.
:::

## Connecting With Polkadot-JS

Now that you have a blockchain node to interact with, you need a substrate-compatible wallet API. We'll use `polkdadot.js` for this guide.

1. Open a browser to `https://polkadot.js.org/apps/#/explorer`. This opens Polkadot.js Apps, which connects to Polkadot MainNet by default.
2. In the top-left corner, open the menu and navigate to the Development sub-menu.
3. Enter `localhost::9944` under custom endpoint.
4. Click the `Switch` button to connect to your Calamari development node.

With Polkadot.js Apps connected, your Calamari development node will be ready to receive transactions and produce blocks, implementing the business logic in e.g. javascript is left as an exercise to the reader.

## Connecting to Calamari Network

When you need your app to interact with the live network, most of the above still applies, you just connect to a public backend url instead of using your own local blockchain node

:::warning
Unlike on a local network, any transactions sent to Calamari Network become permanent records in the public blockchain's history.
Mistakenly sent funds for example can not be undone. Exercise caution
:::

### Network Endpoints

List of the load-balancer endpoints provided by Calamari:

-   WSS - `wss://ws.calamari.systems`
-   HTTPS - `https://rpc.calamari.systems`

### Chain ID

The Calamari Network chain id is `2084`

### Block Explorer

A block explorer is like a search engine for the blockchain. It lets you search for information such as balances, contracts, and transactions.

Subscan is the main block explorer for the Substrate API and supports Calamari Network. You can find it at [https://calamari.subscan.io/].

It can handle both standard and custom modules, so you can see information about Staking, Governance, and XCM pallets (or modules), among others. The code is open-source and available on the [Subscan Essentials GitHub repo](https://github.com/subscan-explorer/subscan-essentials).

## Useful Development Tools

-   `Manta.js Javascript SDK`: A set of functionality which connects your public address (polkadot-js), your private addresses and manages the creation of the payloads required for `MantaPay` extrinsics.
-   `Manta zkSBT SDK`: A set of functionality that can help you mint zkSBT, store and verify the proof key of zkSBT. To mint zkSBT, you need a Polkadot wallet and Manta Signer. In the future, you can replace Polkadot wallets and Manta Signer with Manta Wallet.
-   `Manta Wallet Extension`: The extension is a browser extension which generates zero knowledge proofs and manages the private keys of your UTXOs. The extension is open sourced and you find instruction to set it up locally at [manta-extension](https://github.com/Manta-Network/manta-extension).
-   `Manta Signer`: The signer is a desktop application which generates zero knowledge proofs and manages the private keys of your UTXOs. The signer is open sourced and you find instruction to set it up locally at [manta-signer](https://github.com/Manta-Network/manta-signer).
-   [zombienet](https://github.com/paritytech/zombienet) or the deprecated [polkadot-launch](https://github.com/paritytech/polkadot-launch) tool can help you set up a full relaychain + parachain network.
