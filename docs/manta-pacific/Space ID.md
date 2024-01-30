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
// expect: '0xb5932a6b7d50a966aec6c74c97385412fb497540'

const address = await web3name.getAddress("bts_official.lens");
// expect: '0xd80efa68b50d21e548b9cdb092ebc6e5bca113e7'

const address = await web3name.getAddress("beresnev.crypto");
// expect: '0x6ec0deed30605bcd19342f3c30201db263291589'

const address = await web3name.getAddress("registry.gno");
// expect: '0x2886D6792503e04b19640C1f1430d23219AF177F'
```

### Multichain address resolution

Domain resolution for other chains can be provided by adding coinType param to getAddress().

```javascript
import { convertEVMChainIdToCoinType } from "@ensdomains/address-encoder";
const address = await web3name.getAddress("gnome.gno", {
    coinType: convertEVMChainIdToCoinType(1),
});
// expect: 0x4348d45967552d0176d465170b7375ed22dc627b
```

## 3. Resolve an address

There are optional parameters in the method to select your target chain or TLD (top-level Domain).

By providing chain IDs, you can resolve addresses on selected chains and get an available domain name from all TLDs deployed on these chains.

```javascript
// Resolve an address from Gnosis Chiado
const name = await web3name.getDomainName({
    address: "0x2886D6792503e04b19640C1f1430d23219AF177F",
    queryChainIdList: [10200],
});
// expect: lydia.gno
```

By providing TLDs, address can be resolved from the selected TLDs and get an available TLD primary name.

```javascript
// Resolve an address from .gno TLD
const name = await web3name.getDomainName({
    address: "0x2886D6792503e04b19640C1f1430d23219AF177F",
    queryTldList: ["gno"],
});
// expect: genome.gno
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
const metadata = await web3Name.getMetadata({ name: "public.gno" });
```

# Use your own RPC

We are using popular public RPC services by default to make it easier to use. But in some cases developers may prefer to use arbitrary RPC, so we provide optional parameter `rpcUrl` for each function that allows developers to use their own RPC to make requests.
For example, you can put custom rpcUrl as a parameter in `getAddress` function.

For example, you can put custom rpcUrl as a parameter in getAddress function.

```javascript
// Use custom RPC url (https://arb1.arbitrum.io/rpc)
const address = await web3name.getAddress("registry.arb", {
    rpcUrl: "https://arb1.arbitrum.io/rpc",
});
// expect: '0x8d27d6235d9d8EFc9Eef0505e745dB67D5cD2918'
```

For other functions, it's also possible to have a custom `rpcUrl` in the request.

```javascript
// Use custom RPC url (https://arb1.arbitrum.io/rpc)
const address = await web3name.getMetaData("registry.arb", {
    rpcUrl: "https://arb1.arbitrum.io/rpc",
});
// expect: '0x8d27d6235d9d8EFc9Eef0505e745dB67D5cD2918'
```
