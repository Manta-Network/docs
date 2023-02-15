# 💸 Send Cross-Chain Transfers From Calamari

## Introduction

Cross-chain communication can be a challenging task, and developers often rely on wrapper functions and pallets to leverage XCM (Cross-Consensus Messages) features on Polkadot/Kusama. One such pallet is the `x-tokens` pallet, which provides different methods to transfer fungible assets via XCM.

Until an XCM-SDK is available to abstract this process, third parties who want to integrate XCM transfers from Calamari in their dApps need to use Polkadot.js API to connect to the Calamari backend and do these transfers by xTokens. This guide explains how to use the x-tokens pallet to transfer tokens from one substrate-based blockchain to another. 

It is important to note that sending incorrect XCM messages can result in the loss of funds, and it is essential to test XCM features on a TestNet before moving to a production environment.

## Relevant XCM Definitions

Before delving into the x-tokens pallet interface, it is crucial to understand some relevant XCM definitions:

* `XCM` — stands for Cross-Consensus Message. It is a general way for consensus systems to communicate with each other.
* `VMP` — stands for Vertical Message Passing, one of the transport methods for XCMs. It allows parachains to exchange messages with the relay chain. UMP (Upward Message Passing) enables parachains to send messages to their relay chain, while DMP (Downward Message Passing) enables the relay chain to pass messages down to one of their parachains.
* `XCMP` — stands for Cross-Consensus Message Passing, one of the transport methods for XCMs. It allows parachains to exchange messages with other parachains on the same relay chain.
* `HRMP` — stands for Horizontal Relay-Routed Message Passing, a stop-gap protocol while a full XCMP implementation is launched. It has the same interface as XCMP, but messages are stored on the relay chain.
Sovereign Account — an account that each chain in the ecosystem has, one for the relay chain and the other for other parachains. It is calculated as the Blake2 hash of a specific word and the parachain ID concatenated (Blake2(para+ParachainID) for the sovereign account in the relay chain, and Blake2(sibl+ParachainID) for the sovereign account in other parachains), truncating the hash to the correct length. The account is owned by root and can only be used through SUDO (if available) or democracy (technical committee or referenda). The sovereign account typically signs XCM messages in other chains in the ecosystem.
* `Multilocation` — a way to specify a point in the entire relay chain/parachain ecosystem relative to a given origin. It can be used to specify a specific parachain, asset, account, or even a pallet inside a parachain. In general terms, a multilocation is defined with parents and an interior. Parents refer to how many "hops" into a parent blockchain you need to take from a given origin. The interior refers to how many fields you need to define the target point. For example, to target a parachain with ID 1000 from another parachain, the multilocation would be `{ "parents": 1, "interior": { "X1": [{ "Parachain": 1000 }]}}`

## X-Tokens Pallet Interface

### Extrinsics
The x-tokens pallet provides the following extrinsic functions:

* `transfer(MantaCurrency, amount, dest, destWeight)` — transfers a currency, defined as either the native token (1) or with an asset-id starting from 8 upwards. The rest of the extrinsics are filtered out for now on our chain.

The following inputs must be provided:

* `MantaCurrency` — the ID of the currency being sent via XCM. Different runtimes have different ways of defining
* `amount — the number of tokens that are going to be sent via XCM
* `dest` — a multilocation to define the destination address for the tokens being sent via XCM.
* `destWeight` — an enum that represents the maximum amount of execution time you want to provide in the destination chain to execute the XCM message being sent. The Unlimited option allows for all of the asset used for gas included to be used to pay for weight. The Limited option limits the amount used for gas to a particular value. If not enough weight is provided, the execution of the XCM will fail, and funds might get locked in either the sovereign account or a special pallet. It is important to correctly set the destination weight to avoid failed XCM executions

### Storage Methods

The x-tokens pallet includes the following read-only storage method:

* `palletVersion() - provides the version of the x-tokens pallet being used

### Pallet Constants

The x-tokens pallet includes the following read-only functions to obtain pallet constants:

* `baseXcmWeight()` - returns the base XCM weight required for execution
* `selfLocation()` - returns the multilocation of the chain

## X-Tokens Transfer Function

Head to the extrinsic page of Polkadot.js Apps and set the following options:

1. Select the account from which you want to send the XCM
2. Choose the xTokens pallet
3. Choose the transfer extrinsic
4. Set the MantaCurrency ID to any of the available assets, which you can check in the Assets page.
5. Enter destination multilocation. In the current example an address on the Karura parachain.
6. Enter destination weight
7. Set the number of tokens to send. For this example, you are sending 10 KMA, but you have to account for the 12 decimals of KMA
8. Submit and sign the transaction

**Note** that xTokens pallet is supported on many chains like Moonbeam and Acala, with almost identical interface.

![transfer](../../static/img/guides/xTokens_transfer.png)

## Conclusion

The x-tokens pallet is a valuable tool for developers who need to transfer fungible assets via XCM on Polkadot/Kusama. It provides a straightforward interface for sending XCM messages and a multilocation system to define specific destinations in the ecosystem.

However, it is important to keep in mind that incorrect XCM messages can result in the loss of funds, so it is crucial to test on a TestNet before moving to production environments.

Overall, the x-tokens pallet provides a great solution for cross-chain transfers and is supported on many chains like Moonbeam and Acala with almost identical interfaces.
