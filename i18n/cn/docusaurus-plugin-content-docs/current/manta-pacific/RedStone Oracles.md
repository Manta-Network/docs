# RedStone Oracles

RedStone delivers frequently updated, reliable, and diverse data feeds for your dApp on Manta Pacific L2. RedStone is unique in many aspects, three notable ones are:

-   The most gas-optimized oracle (make your dApp scalable)
-   Unique price feeds (including LSTs, LRTs, RWAs and Manta-native assets)
-   Modular Oracle Design allows for flexibility towards user needs

RedStone operates in two models **Core (Pull)** and **Classic (Push)** both available on Manta.

## How to integrate [RedStone Core](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core)?

Check out RedStone [Showroom](https://showroom.redstone.finance/) to see how data delivery with transactions and fetching data from the Demo contract works on Manta. The RedStone Core model allows your dApp to utilize data feeds delivered “on-demand”, only when the data is needed. Thanks to the implementation of the EVM-connector library and extending your Ethers.js, your dApp will be able to attach signed data packages with timestamps to call data of your users’ transactions.

In order to implement the Core model you will need to do two things:

1. Adjust the Javascript code of your dApp to inject the additional payload with signed data feeds to call data of your users’ transactions (otherwise you will get smart contract errors).
1. Adjust your smart contracts to include the libraries responsible for data extraction from call data and signature verification.

**Please see the specific steps and ready code samples [in the Docs](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core).**

If you need help with integration [join RedStone Discord](https://discord.com/invite/PVxBZKFr46) and ask their team for help.

## How to integrate [RedStone Classic](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-classic)?

The RedStone Classic model ensures that data is pushed into on-chain storage via a relayer. Dedicated to protocols designed for the traditional Push Oracles model, that want to have full control of the data source and update conditions (heartbeat and deviation threshold).

The on-chain contracts in Classic enable storing prices and getting them through a familiar interface (e.g. the [Chainlink Aggregator](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol)).

### List of available Classic feeds

**ETH / USD**

Update Conditions: 0.5% (Deviation Threshold) or 1 hour (Heartbeat)

Contract Address: <https://manta.socialscan.io/address/0xf4ec1dbd9047153c907e9d4a02cad85864ea16dc>

(Soon to be launched) $MANTA $wUSDM $STONE

All available Classic feeds are available [in this Docs](https://docs.google.com/document/d/1_C-aEL9IVpot2eRzNn85rE_xl642CC02h-Go77Ob-8E/edit).
