# Ethers.js

## What is Ethers.js?

The Ethers.js library offers a collection of tools to interact with Ethereum nodes using JavaScript, similar to Web3.js. Manta Pacific also has a similar API that is fully compatible with Ethereum's JSON RPC invocations. This means that developers can take advantage of this compatibility and use the Ethers.js library to interact with a Manta Pacific node as if it were an Ethereum node.

## Getting Started with Ethers.js

1. Create a JavaScript Project to store all of the files you'll be creating
   `mkdir ethers-examples && cd ethers-examples`
2. Install the Ethers.js library and the Solidity compiler
   `npm install ethers solc@0.8.0`

## Setting up Ethers Provider

1. Import the `ethers` library
2. Define the `providerRPC` object, which can include the network configurations for any of the networks you want to send a transaction on.
3. Create the `provider` using the `ethers.providers.StaticJsonRpcProvider` method. An alternative is to use the `ethers.providers.JsonRpcProvide(providerRPC)` method, which only requires the provider RPC endpoint address.

    ``` solidity
    // 1. Import ethers
    const ethers = require('ethers');

    // 2. Define network configurations
    const providerRPC = {
    manta: {
        name: 'Manta',
        rpc: 'https://manta-testnet.calderachain.xyz/http', // Insert your RPC URL here
        chainId: 3441005, //Insert your ChainID Here
    },
    };
    // 3. Create ethers provider
    const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.constellation.rpc,
    {
        chainId: providerRPC.constellation.chainId,
        name: providerRPC.constellation.name,
    }
    );
    ```

Note: Ensure that all of your smart contracts are deployed on the Manta Pacific chain and that you have updated contract addresses on the front-end.

## [Ethers.js Documentation](https://docs.ethers.org/v5/)