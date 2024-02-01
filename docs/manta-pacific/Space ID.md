# Space ID Web3 Name SDK

## Overview

The primary capabilities of the SDK include:

1. Domain Name Resolution: It resolves domain names to obtain essential information about the domain, including its associated conventional address, various records (such as avatars, IPFS links, social data), and metadata, etc.

2. Reverse Resolution: The SDK facilitates reverse address resolution. This feature makes it possible to determine the primary domain name associated with a given address, even across different blockchains or TLDs, returning Chain Primary Name or TLD Primary Name.

:::info Key Terminology:

💡 TLD Primary Name:

-   Every address is able to set TLD Primary Name to configure a reverse resolution domain for each Top-Level Domain, regardless of whether it has been verified or not on SPACE ID.
-   Examples include setting "allen.eth" as TLD Primary Name for .eth, "allen.bnb" for .bnb, "allen.cake" for .cake. Note that .bnb and .cake are both on BNB Chain

💡 Chain Primary Name:

-   Each address is permitted to have only one unique Chain Primary Name for each blockchain or network.
-   Specifically, when multiple TLDs verified on a single chain exist, only one domain name can be chosen as such reverse resolution domain for that particular chain.
-   For instance, "allen.eth" could serve as Chain Primary Name for Ethereum, and "allen.cake" might function as the primary name for BNB Chain.
:::

By default, all EVM-based domain names are supported for domain resolution in the Web3 Name SDK. Reverse resolution returns a Chain Primary Name for each EVM chain. Project administrators have the flexibility to choose whether to integrate support for all or only specific chains and TLDs. They can also configure custom settings for reverse resolution as needed. This adaptability allows projects to tailor the SDK's functionality to their specific requirements.

## Get Started

Developers can resolve web3 domain name or reverse resolve conventional address with Web3 Name SDK with zero configuration.

## Install

`npm install @web3-name-sdk/core viem`

If you are using `next.js`, please add the following configuration in your `next.config.js` in order to transpile commonjs dependencies:

```javascript
const nextConfig = {
    transpilePackages: ["@web3-name-sdk/core"],
};
```

## 1. Setup client

```javascript
import { createWeb3Name } from "@web3-name-sdk/core";

const web3Name = createWeb3Name();
```

## 2.Resolve a domain name

You can get address from domain name with a single request:

```javascript
const address = await web3name.getAddress("manta.manta");

const address = await web3name.getAddress("bts_official.lens");

const address = await web3name.getAddress("beresnev.crypto");

const address = await web3name.getAddress("registry.manta");
```

## 3. Resolve an address

There are optional parameters in the method to select your target chain or TLD (top-level Domain).

By providing chain IDs, you can resolve addresses on selected chains and get an available domain name from all TLDs deployed on these chains.

```javascript
// Resolve an address from Manta Pacific
const name = await web3name.getDomainName({
    address: "0x2886D6792503e04b19640C1f1430d23219AF177F",
    queryChainIdList: [169],
});
```

By providing TLDs, address can be resolved from the selected TLDs and get an available TLD primary name.

```javascript
// Resolve an address from .manta TLD
const name = await web3name.getDomainName({
    address: "0x2886D6792503e04b19640C1f1430d23219AF177F",
    queryTldList: ["manta"],
});
```

## 4. Record

Domain text records can be fetched by providing domain name and the key. For example, the avatar record of manta.manta is returned from this method given key name avatar:

```javascript
const record = await sid.getDomainRecord({
    name: "manta.manta",
    key: "avatar",
});
```

## 5. Metadata

Domain metadata can be fetched by SDK directly.

```javascript
// requesting
const metadata = await web3Name.getMetadata({ name: "public.manta" });
```
