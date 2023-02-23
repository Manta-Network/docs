# 📓 Overview

## XCM Summary

[Polkadot's architecture](https://wiki.polkadot.network/docs/learn-architecture) enables parachains to seamlessly interact with one another and transfer various types of data and assets across different blockchains. The [Cross-Consensus Message (XCM)](https://wiki.polkadot.network/docs/learn-xcm) format defines a universal language that facilitates the transfer of messages between two interoperating blockchains. Although XCM is not exclusive to Polkadot, it strives to provide a flexible and adaptable language that works across different consensus systems.

This page serves as a concise overview of XCM and related elements. For more in-depth information, please refer to [Polkadot's Wiki](https://wiki.polkadot.network/).

## Relevant XCM Definitions

* `XCM` — stands for Cross-Consensus Message. It is a general way for consensus systems to communicate with each other.
* `VMP` — stands for Vertical Message Passing, one of the transport methods for XCMs. It allows parachains to exchange messages with the relay chain. UMP (Upward Message Passing) enables parachains to send messages to their relay chain, while DMP (Downward Message Passing) enables the relay chain to pass messages down to one of their parachains.
* `XCMP` — stands for Cross-Consensus Message Passing, one of the transport methods for XCMs. It allows parachains to exchange messages with other parachains on the same relay chain.
* `HRMP` — stands for Horizontal Relay-Routed Message Passing, a stop-gap protocol while a full XCMP implementation is launched. It has the same interface as XCMP, but messages are stored on the relay chain.
Sovereign Account — an account that each chain in the ecosystem has, one for the relay chain and the other for other parachains. It is calculated as the Blake2 hash of a specific word and the parachain ID concatenated (Blake2(para+ParachainID) for the sovereign account in the relay chain, and Blake2(sibl+ParachainID) for the sovereign account in other parachains), truncating the hash to the correct length. The account is owned by root and can only be used through SUDO (if available) or democracy (technical committee or referenda). The sovereign account typically signs XCM messages in other chains in the ecosystem.
* `Multilocation` — a way to specify a point in the entire relay chain/parachain ecosystem relative to a given origin. It can be used to specify a specific parachain, asset, account, or even a pallet inside a parachain. In general terms, a multilocation is defined with parents and an interior. Parents refer to how many "hops" into a parent blockchain you need to take from a given origin. The interior refers to how many fields you need to define the target point. For example, to target a parachain with ID 1000 from another parachain, the multilocation would be `{ "parents": 1, "interior": { "X1": [{ "Parachain": 1000 }]}}`

## How to use XCM ?

Developers often rely on wrapper functions and pallets to take advantage of XCM features on Polkadot/Kusama since cross-chain communication can be a complex task. The x-tokens pallet is one such pallet that provides various methods to transfer fungible assets through XCM.

While waiting for an XCM-SDK to simplify this process, third parties who wish to integrate XCM transfers from Calamari in their dApps must use the Polkadot.js API to connect to the Calamari backend and conduct these transfers through xTokens. This guide offers instructions on how to utilize the x-tokens pallet to move tokens from one substrate-based blockchain to another.

You can find more information in the [cross chain token transfers section](XcmTransfers.md).
