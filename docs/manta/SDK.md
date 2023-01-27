# 🛠 Manta SDK

This package implements a Javascript SDK for connecting with the Manta Network. API end points to connect to Calamari:

## Full Nodes

- provided by Manta: `wss://ws.manta.systems`

## Asset API (Javascript)

- MANTA: `api.query.system.account(AccountId)`

## Installation

```sh
yarn install manta.js
```

### Local Development

1. `git clone https://github.com/Manta-Network/sdk.git`
2. `cd sdk/manta-js/package`
3. `yarn`
4. `yarn build` for use in browser or `yarn build-node` for use in node.js
5. Add `"manta.js": "file:/<LOCAL PATH OF SDK/manta-js/package>` to your project's package.json
6. `yarn upgrade manta.js` in your project's directory

# Usage

All methods are called through the `MantaPrivateWallet` class.

[manta-signer](#signer) must be installed and running.

> If running `manta-signer` on dev mode, you should use the following features: `features=unsafe-disable-cors,disable-restart`.

Refer to [sdk/manta-js/examples](https://github.com/Manta-Network/sdk/tree/main/manta-js/examples/asset-webpack-ts#mantajs-examples) for more thorough examples, and how to run them.

## Node Specific

If running in node.js the wasm module assumes browser DOM exists, you must export Web API functions from node in your project as seen below.

```javascript
import fetch from 'node-fetch';

// @ts-ignore
global.fetch = fetch;
// @ts-ignore
global.Headers = fetch.Headers;
// @ts-ignore
global.Request = fetch.Request;
// @ts-ignore
global.Response = fetch.Response;
```

## Initialization

The `Environment` flag specifies whether to connect to a local node (`ws://127.0.0.1:9944`), or the use an actual node from the specified network.

The `Network` flag specifies which network to connect to, either `Dolphin`, `Calamari` or `Manta`.

To switch between environments and networks, a new `MantaPrivateWallet` instance should be created.

```javascript
import { MantaPrivateWallet, Environment, Network } from 'manta.js';

const prodEnvironment = sdk.Environment.Production;
const dolphinNetwork = sdk.Network.Dolphin;

const privateWalletConfig: PrivateWalletConfig = {
    environment: prodEnvironment,
    network: dolphinNetwork,
};

const privateWallet = await MantaPrivateWallet.init(privateWalletConfig);
```

`PrivateWalletConfig` has several optional arguments:

- `loggingEnabled`, whether or not non-error logging to console should occur, set by default to `false`.
- `maxSendersPullSize`, set by default to `4096`.
- `maxReceiversPullSize`, set by default to `4096`.
- `pullCallback`, callback function after a pull has occured, set by default to `null`.
- `errorCallback`, callback function after an error has occured, set by default to `null`.

## Transacting

After initialization of the `MantaPrivateWallet` class, `initialWalletSync()` must be called before any transactions are made.

After every single transaction, to get the latest data from the ledger, `walletSync()` must be called.

A PolkadotJS `Signer` and public PolkadotJS `Address` should be provided to every function that requires transacting. Below is an example of how to get these values, this example assumes that the Polkadot JS extension is installed and contains an existing account.

### Polkadot JS Transaction Parameters

```javascript
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';

// Get Polkadot JS Signer and Polkadot JS account address.
const getPolkadotSignerAndAddress = async () => {
    const extensions = await web3Enable('Polkadot App');
    if (extensions.length === 0) {
        throw new Error("Polkadot browser extension missing. https://polkadot.js.org/extension/");
    }
    const allAccounts = await web3Accounts();
    let account = allAccounts[0];

    const injector = await web3FromSource(account.meta.source);
    const polkadotSigner = injector.signer;
    const polkadotAddress = account.address;
    return {
        polkadotSigner,
        polkadotAddress
    }
}
```

Below is an example of how to transact using fungible tokens, there are four main methods that `manta-pay` provides:
- `toPrivateSend(asset, amount, polkadotSigner, polkadotAddress)`
- `privateTransferSend(asset, amount, receiver, polkadotSigner, polkadotAddress)`
- `toPublicSend(asset, amount, polkadotSigner, polkadotAddress)`
- `publicTransfer(asset, amount, destinationAddress, polkadotSigner, polkadotAddress)`

> This example assumes the `polkadotAddress` already has associated public funds.

### To Private

This example converts 10 public DOL tokens to 10 private DOL tokens.

```javascript
// DOL token
const assetId = new BN("1");
const amount = new BN("10000000000000000000");

// Sync with most recent ledger state.
await privateWallet.initialWalletSync();

// Get private address
const privateAddress = await privateWallet.getPrivateAddress();

// Get private balance of DOL for given private address
const privateBalance = await privateWallet.getPrivateBalance(assetId);

// Privatize 10 DOL to 10 pDOL
await privateWallet.toPrivateSend(assetId, amount, polkadotSigner, polkadotAddress);

// Sync to get latest data after the transaction and check that it was successful.
await privateWallet.walletSync();

// The private balance of pDOL should be incremented by 10 units.
const newPrivateBalance = await mantaSdk.getPrivateBalance(assetId);
```

### Private Transfer

This example transfers 10 private private pDOL to another address.

```javascript
// DOL token
const assetId = new BN("1");
const amount = new BN("10000000000000000000");

// Sync with most recent ledger state.
await privateWallet.initialWalletSync();

// Get private address
const privateAddress = await privateWallet.getPrivateAddress();

// Private Transfer of 10 pDOL to another private address
const examplePrivateAddress = "3UG1BBvv7viqwyg1QKsMVarnSPcdiRQ1aL2vnTgwjWYX";
await privateWallet.privateTransferSend(assetId, amount, examplePrivateAddress, polkadotSigner, polkadotAddress);

// Sync to get latest data after transaction and check that it was successful.
await privateWallet.walletSync();

// The private balance of pDOL should decrease by 10 units.
const newPrivateBalance = await privateWallet.getPrivateBalance(assetId);
```

### To Public

This example converts 5 private pDOL to 5 public DOL.

```javascript
// DOL token
const assetId = new BN("1");
const amount = new BN("5000000000000000000");

// Sync with most recent ledger state.
await privateWallet.initialWalletSync();

// Get private address
const privateAddress = await privateWallet.getPrivateAddress();

// Get private balance of DOL for given private address
const privateBalance = await privateWallet.getPrivateBalance(assetId);

// Convert 5 pDOL back to DOL
await privateWallet.toPublicSend(assetId, amount, polkadotSigner, polkadotAddress);

// Sync to get latest data after transaction and check that it was successful.
await privateWallet.walletSync();

// The private balance of pDOL should decrease by 5 units.
const newPrivateBalance = await privateWallet.getPrivateBalance(assetId);
```

### Manta Utilities

There also exists a `MantaUtilities` class with additional functions. Mainly for interacting publicly with the Manta ecosystem. This example demonstrates these functions. This example assumes the `MantaPrivateWallet` class has already been initialized, as well as `polkadotAddress` and `polkadotSigner`.

```javascript
import { MantaUtilities } from "manta.js";

// Get signer version, signer must be running.
const signerVersion = await MantaUtilities.getSignerVersion();

// DOL token
const assetId = new BN("1");

// Get public balance of DOL for `polkadotAddress`.
const oldPublicBalance = await MantaUtilities.getPublicBalance(privateWallet.api, assetId, polkadotAddress);

// Public transfer of 5 DOL to `destinationAddress`.
const destinationAddress = "dmyhNmYL13N7ZKcVYqBQhvrk5kSfrKZUmrjX9vAaM4846bWKR";
const amount = new BN("5000000000000000000");
await MantaUtilities.publicTransfer(privateWallet.api, assetId, amount, destinationAddress, polkadotAddress, polkadotSigner);

// Public balance should now be 5 DOL less that `oldPublicBalance`.
const newPublicBalance = await MantaUtilities.getPublicBalance(privateWallet.api, assetId, polkadotAddress);
```

### Sign and manually send transaction

In some cases you may not want to send transaction to the ledger through manta.js, thus you can get sign result after manta-signer has signed the transaction and send the transaction yourself. This is done by using the `toPrivateBuild`, `privateTransferBuild`, `publicTransferBuild` functions.

This example returns the signed transaction of `toPrivate` for 10 DOL.

```javascript
const assetId = new BN("1");
const amount = new BN("10000000000000000000");

const env = sdk.Environment.Development;
const net = sdk.Network.Dolphin;
const privateWallet = await sdk.init(env,net);

const privateAddress = await privateWallet.privateAddress();
console.log("The private address is: ", privateAddress);

await privateWallet.initialWalletSync();

const initialPrivateBalance = await privateWallet.privateBalance(assetId);
console.log("The initial private balance is: ", initialPrivateBalance.toString());

const signResult = await privateWallet.toPrivateBuild(assetId, amount, polkadotSigner, polkadotAddress);

console.log("The result of the signing: ", JSON.stringify(signResult.transactions));
```

This can also be done for all other transaction types:

```javascript
const toPrivateSignResult = await privateWallet.toPrivateBuild(assetId, amount, polkadotSigner, polkadotAddress);
const toPublicSignResult = await privateWallet.toPublicBuild(assetId, amount, polkadotSigner, polkadotAddress);
const privateTransferSignResult = await privateWallet.privateTransferBuild(assetId, amount, privateAddress, polkadotSigner, polkadotAddress);
```

Then you can use the signResult to submit transaction by your self. Here is an example on how to verify the `toPrivateBuild` sign result is valid:

Copy the transaction to polkadot.js `Extrinsic` decode:

![extrinsic decode](../images/to_private_decode.png)

Switch to `Submission`:

![extrinsic decode](../images/to_private_extrinsic.png)

Then submit transaction.

![extrinsic decode](../images/to_private_submit.png)

You should see your extrinsic show up on polkadot.js explorer. Then you will notice an increase in your private balance.

## Signer

Manta Signer is a desktop application which generates zero knowledge proofs for MantaPay transactions and manages the private keys of your UTXOs. The signer is open sourced and you may find instruction on how to set it up at [manta-signer](https://github.com/Manta-Network/manta-signer).