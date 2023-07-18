# Foundry

Deploying Smart Contracts using Forge in Foundry

## What is Foundry?

Foundry is a toolset for Ethereum development written in Rust that assists developers in managing dependencies, compiling projects, running tests, deploying contracts, and interacting with blockchains through the command line interface. Additionally, Foundry can directly communicate with Manta Pacific's Ethereum API, enabling the use of Foundry to deploy smart contracts into the Manta Pacific network.

## Getting Started with Foundry

1.  Install Foundry

    -   Linux or MacOS

            curl -L https://foundry.paradigm.xyz | bash

            foundryup

    -   Windows

            curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh

            cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked

2.  Create a project
    ``` bash
    forge init foundry
    ```

3.  Navigate to the **Source** in the project and create your smart contract
    ``` bash
    cd src
    touch MyToken.sol
    ```
4.  Input your smart contract or use the sample contract below.

    ``` solidity
    // SPDX-License-Identifier: MIT
    // compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
    pragma solidity ^0.8.17;

    contract HelloWorld {
        string public greet = "Hello World!";
    }
    ```

5.  Install OpenZeppelin contracts as a dependency
    ``` bash
    forge install OpenZeppelin/openzeppelin-contracts
    ```

6.  Compile contract
    ``` bash
    forge build
    ```

## Deploying your Smart Contract

Deploying a contract with Forge is a simple process that can be done with a single command. However, it requires an RPC endpoint, a private key that has funds, and any arguments for the constructor of the contract.

For example, the MyToken.sol contract requires an initial supply of tokens to be specified in its constructor, so the command to deploy it on a network will include the argument of 100.

To deploy the MyToken.sol contract, use the command that corresponds to the Manta Pacific chain's RPC URL while running the forge create command:

``` bash
    forge create --rpc-url "RPC URL" //Insert your RPC URL here
    --constructor-args 100 \
    --private-key YOUR_PRIVATE_KEY \
    src/MyToken.sol:MyToken
```