# wagmi

## What is wagmi?

**wagmi** is a collection of React Hooks containing everything you need to start working with Ethereum. wagmi makes it easy to "Connect Wallet," display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.

## Quickstart

The `jsonRpcProvider` configures the chains with the RPC URLs that you specify and also provides an [ethers.js StaticJsonRpcProvider](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#StaticJsonRpcProvider).

``` js
    import { chain, configureChains } from 'wagmi'
    import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

    const { chains, provider } = configureChains(
    [chain.testnet, chain.manta],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: `RPC URL`, // Insert RPC URL here
                }),
            }),
        ],
    )
```

More Information: [JSON RPC](https://wagmi.sh/react/providers/jsonRpc)
