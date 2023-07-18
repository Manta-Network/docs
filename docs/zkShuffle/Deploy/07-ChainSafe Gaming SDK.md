# ChainSafe Gaming SDK

## What is ChainSafe?

The Chain Gaming SDK is a software development kit that enables game developers to integrate blockchain technology into their games. It allows for creating, managing, and trading in-game assets on the blockchain, providing players with full ownership and control over their virtual items.

## Quickstart

Connect to Manta Pacific Chains by providing the Manta Pacific Chain RPC. All ChainSafe Gaming methods have an optional field to add an RPC URL. This returns the native token's balance for the chain.

``` js
    string chain = "Manta Pacific";
    string network = "testnet";
    string account = "token_account_here";
    string rpc = "RPC URL"; //Insert RPC URL here

    string balance = await EVM.BalanceOf(chain, network, account, rpc);
    print(balance);
```

### More Information: [Custom Interactions | ChainSafe Gaming SDK](https://docs.gaming.chainsafe.io/current/installation/#downloading-the-sdk)

### [ChainSafe Gaming: Documentation]( https://docs.gaming.chainsafe.io/current/project-id-registration)
