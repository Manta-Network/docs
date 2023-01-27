# 🛠 Develop on Dolphin

## Quick Overview
This guide outlines the steps needed to create a Manta node for testing your applications.

A Manta development node is your own personal development environment for building and testing applications on Manta Network. It enables you to get started quickly and easily without the overhead of a relay chain. By default a block will be created when a transaction is received.

To get started running a Manta node you will need to first download it or build it. This could take roughly 30 minutes or longer to complete depending on your hardware.

## Download Binary File

To download any of the official releases of Manta, please go to our [release page](https://github.com/Manta-Network/Manta/releases).

## Build Binary File

First, start by cloning a specific tag of the Manta repo that you can find here:

`https://github.com/Manta-Network/Manta/`

```
git clone -b v4.0.1 https://github.com/Manta-Network/Manta
cd Manta
```

If you already have Rust installed, you can skip the next two steps. Otherwise, install Rust and its prerequisites via Rust's recommended method by executing:
`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

Next, update your PATH environment variable by running:
`source $HOME/.cargo/env`

Now you can either build and run the binary separately with:
```bash
  cargo build --release
  ./target/release/manta --chain=manta-localdev --alice --tmp
```

Or run it directly with:
```bash
cargo run --release -- --chain=manta-localdev --alice --tmp
```

## Connect polkadot-js

TODO: screenshots

The development node is a Substrate-based node, so you can interact with it using standard Substrate tools. The two default RPC endpoints are:

HTTP - `http://127.0.0.1:9933`
WS - `ws://127.0.0.1:9944`

Start by connecting to it with Polkadot.js Apps. Open a browser to: `https://polkadot.js.org/apps/#/explorer`. This will open Polkadot.js Apps, which automatically connects to Polkadot MainNet.

Polkadot.js Apps

Click on the top left corner to open the menu to configure the networks, then take the following steps:

Navigate down to open the Development sub-menu
Click on Local Node, which points Polkadot.js Apps to ws://127.0.0.1:9944. If not, you can enter it under custom endpoint
Select the Switch button, and the site should connect to your Manta development node
Select local node

With Polkadot.js Apps connected, you will see the Manta development node waiting for transactions to arrive to begin producing blocks.

## Network Endpoints

Alternatively to connecting to your own development node you can access one of the load-balancer endpoints provided by Manta: 
`wss://ws.calamari.seabird.systems`

## Chain ID

Dolphin chain id is `2084`

## Block Explorer

TODO: screenshots

Block explorers can be thought of as search engines for the blockchain. They allow users to search information such as balances, contracts, and transactions.

Subscan is the primary Substrate API block explorer. Subscan is capable of parsing standard or custom modules. For example, this is useful to display information regarding the Staking, Governance, and XCM pallets (or modules). The code is all open-source and can be found in the [Subscan Essentials GitHub repo](todo: link).

While not a full-featured block explorer, Polkadot.js Apps is a convenient option especially for users running local development nodes to view events and query transaction hashes. Polkadot.js Apps uses the WebSocket endpoint to interact with the Network. You can easily connect to Moonbeam, Moonriver, or Moonbase Alpha.

## Faucet

Dolphin faucet is live on our discord channel at: `https://discord.com/channels/795390654628102165/1055864933692219453`

You must get the attention of the faucet bot in order to receive tokens. To alert the bot simply begin typing the command for the token you want. eg: `/gimme-dol.` Discord will display a small pop-up, prompting for your wallet address.

TODO: screenshot

Type or paste your wallet address into the address field when prompted, then press enter to trigger the faucet request.

You can request each of the 4 supported tokens (`DOL`, `KAR`, `KSM`, `MOVR`) once per utc day. If you request the same token twice in the same day, the faucet bot will just respond with the status of your first request of the day. Feel free to check the status as many times as you like. The faucet will respond with messages that are only visible to you.

Additionally you can check the status of your address at `https://faucet.dolphin.community/`.

## Use Manta API

In order to use the Manta SDK please refer to API.md

## Development Tools

* TODO: LLDB debugger
* polkadot-launch / zombienet
