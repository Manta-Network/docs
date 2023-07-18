# Remix

Deploying Smart Contracts using Remix

## What is Remix?

Remix Project is a robust set of tools that can be used by individuals of any skill level throughout the entire process of developing contracts, and it also serves as an educational platform for learning and experimenting with Ethereum.

## Getting Started with Remix

1. Visit [Remix](https://remix.ethereum.org/) to get started.
2. Under **Featured Plugins**, select **Solidity**.
3. Navigate to the **File Explorer** and click **"+"** to create a Smart Contract
4. Input your smart contract or use the sample contract below.

    ``` solidity
    // SPDX-License-Identifier: MIT
    // compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
    pragma solidity ^0.8.17;

    contract HelloWorld {
    string public greet = "Hello World!";
    }
    ```
5. Navigate to the **Compile** sidebar option and click **Compile**.

## Deploying your Smart Contract

Once you have written your Smart Contract in Remix, you can navigate to the sidebar option to Compile your contract.

1. Change the top ENVIRONMENT dropdown from "Javascript" to "Injected Web3"
2. This will take you MetaMask - Press connect in Metamask to allow Remix access.
3. Use the following information to add Manta Pacific Testnet network to Metamask
  - Network: Caldera
  - New RPC URL: [https://manta-testnet.calderachain.xyz/http](https://manta-testnet.calderachain.xyz/http)
  - Chain ID: 202550
  - Currency Symbol: cETH
  - Block Explorer URL: [https://caldera-public-0.calderaexplorer.xyz/](https://caldera-public-0.calderaexplorer.xyz/)