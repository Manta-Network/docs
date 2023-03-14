# MantaBridge User Guide

How to bridge tokens.

### Bridging to Calamari Network (Non-Moonriver)

   Bridging from other parachains in the Kusama ecosystem not including Moonriver requires a Polkadot-compatible wallet such as Talisman, SubWallet, or Polkadot.js

   Select the chains you want to bridge between, the token type, and amount you want to bridge. Your current account will send funds on the "From" chain, and receive them on the "To" chain. Press the "Submit" button to begin the transaction.

   <div style={{textAlign: 'center'}}>
    <img alt="bridge-from-kusama" src="/img/guides/bridge_from_kusama.png" width="50%"/>
   </div>
   <br/>
   Your browser wallet will prompt you to approve the transfer, and then publish it on chain.
<br/>
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-sign" src="/img/guides/private_transfer_publish.png" width="30%"/>
   </div>
<br/>
<br/>

### Bridging to Calamari Network (Moonriver)

   Bridging from Moonriver requires MetaMask.

   Select Moonriver as the "From" chain and Calamari Network as the "To" chain. Enter the amount of MOVR you want to bridge to Calamari Network. You can copy-paste your substrate address, or press "Get Address" button to autofill your current substrate account. Press 'Submit' button to initialize a bridge transaction. Metamask will prompt you for approval.

   <div style={{textAlign: 'center'}}>
    <img alt="bridge-from-moonriver" src="/img/guides/bridge_from_moonriver.png" width="50%"/>
   </div>
   <br/>

<br/>
<br/>

## Troubleshooting
- Check that one of Talisman, SubWallet, or polkadot.js is installed, and has permission to connect to the Manta dApp.
  - In polkadot.Js, click on the ⚙️ icon on the top-right corner, then click on "Manage Website Access", then "app.manta.network" is set to "Allowed".
  - In SubWallet, open Settings, then click on Manage Website Access, and unblock app.manta.network.
    <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-allowed" src="/img/guides/subwallet_settings.png" width="40%"/>
    <img alt="polkadot-js-allowed" src="/img/guides/subwallet_manage_website_access.png" width="40%"/>
    </div>
- Check that your internet connection is stable.
- Check [here](https://polkadot.js.org/apps/#/settings/metadata) to see if your browser wallet's metadata needs to be updated.
- If you see "..." or "Syncing to network," wait for your balances to finish loading before trying to transact.
- Try refreshing the page.

If all these checks pass and you still can't send transactions, please let us know on [Discord](https://discord.gg/c72QMWEVyY) so that we can improve Manta and Calamari!

## FAQ

1. What is the bridge page? Why do I need it?

   The bridge page enables user to bridge assets between other chains and Manta or Calamari. Once assets are on our network, users can then privatize them to enjoy on-chain privacy.

2. What are the origin and destination fee?

   The origin fee is a fee paid on the chain you are trying to bridge from. The origin fee is paid in the origin chain's native token: KMA on Calamari, KSM on Kusama, etc.
   The destination fee is paid on the chain you are trying to bridge to. The destination fee is paid in the token you are bridging.

3. When do I need to connect Metamask?

   You only need to connect Metamask when you want to bridge to or from Moonriver. Otherwise, you only need to connect a substrate account using Polkadot.js, Talisman, or SubWallet

4. What are the currently supported parachains?

   Calamari supports Kusama, Karura and Moonriver.

5. What are substrate and EVM accounts?

   A substrate account is the account type used by most Polkadot ecosystem blockchains, such as Calamari, Kusama, and Polkadot.

   An EVM account is the account type used by Ethereum and similar chains. Moonbeam and Moonriver use EVM accounts.

6. Is my asset private immediately after bridging?

   No, when you bridge asset from another parachain (e.g. Kusama) to Manta or Calamari, your assets do not immediately become private. However, you can easily privatize public assets through [the zkTransact Page](https://app.manta.network/calamari/transact)