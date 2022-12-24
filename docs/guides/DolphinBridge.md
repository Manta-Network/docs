# 🐬 Try MantaBridge on Dolphin Testnet

[The Dolphin Bridge page](https://app.manta.network/dolphin/bridge) allows you to transfer assets between Dolphin and other testnet parachains. Once assets are bridged onto Dolphin Testnet, you can navigate to [the zkTransact page](https://app.manta.network/dolphin/transact) to transact these assets privately. Check out our guide to the zkTransact page [here](https://docs.manta.network/docs/guides/DolphinBridge).

## Setup Testnet Accounts

### Install a Browser Wallet and Create a Public Address

Currently, Dolphin Testnet V3 supports Talisman, SubWallet, Polakdot.js wallets.

To get started, click the "Connect Wallet" button.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect-wallet" src="/img/guides/connect_wallet_bridge_button.png" width="80%"/>
   </div>

<br/>

If you don't already have a wallet installed, click the "Install" link for your chosen wallet. Once you install the wallet, it will give you instructions to set up your first account. When you are finished, refresh the page.

🦊 __Metamask:__ You will only need to connect Metamask when you are bridging to or from Moonriver.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect-wallet-modal" src="/img/guides/connect_wallet_modal_bridge.png" width="50%"/>
   </div>

<br/>


Once you have a wallet installed, click the "Connect Wallet" button, press "Connect", and follow the prompts from your wallet extension. When you have successfully connected, you will see your wallet in the navbar.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="wallet-connected" src="/img/guides/wallet_connected_bridge.png" width="80%"/>
   </div>
<br/>


### Get Testnet Tokens

Join [Manta & Calamari's Discord](https://t.co/5BacMMLSCW), navigate to the `#dolphin-faucet` channel, and type `/gimme`. You should see a faucet options prompt:

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="faucet" src="/img/guides/faucet_bot.png" width="70%"/>
   </div>
<br/>

Enter your polkadot address and claim some `DOL`, `KSM`, `KAR`, and `MOVR`. After successfully receiving the tokens, you can start bridging assets to and from Dolphin Testnet

<br/>

## MantaBridge User Guide

Now let's bridge some tokens!

### Bridge betwen Kusama / Karura and Dolphin Testnet

   Select the chains you want to bridge between, the token type, and amount you want to bridge. Your current account will send funds on the "From" chan, and receive them on the "To" chain. Press the "Submit" button to begin the transaction:

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

### Bridge between Moonriver and Dolphin Testnet

   Select Moonriver as the "From" chain and Dolphin Testnet as the "To" chain. Enter the amount of MOVR you want to bridge to Dolphin Testnet. You can copy-paste your substrate address, or press "Get Address" button to autofill your current substrate account. Press 'Submit' button to initialize a bridge transaction. Metamask will prompt you for approval.

   <div style={{textAlign: 'center'}}>
    <img alt="bridge-from-moonriver" src="/img/guides/bridge_from_moonriver.png" width="50%"/>
   </div>
   <br/>

<br/>
<br/>

## Troubleshooting
- Check that one of Talisman, SubWallet, or polkadot.js is installed, and has permission to connect to the Dolphin web app.
  - In polkadot.Js, click on the ⚙️ icon on the top-right corner, then click on "Manage Website Access", then "app.dolphin.manta.network" is set to "Allowed":
   <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-allowed" src="/img/guides/polkadot-js-allowed.png" width="60%"/>
   </div>
  - In SubWallet, open Settings, then click on Manage Website Access, and unblock app.manta.network.
    <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-allowed" src="/img/guides/subwallet_settings.png" width="40%"/>
    <img alt="polkadot-js-allowed" src="/img/guides/subwallet_manage_website_access.png" width="40%"/>
    </div>
- Check that your internet connection is stable.
- Check [here](https://polkadot.js.org/apps/#/settings/metadata) to see if your browser wallet's metadata needs to be updated.
- If you see "..." or "Syncing to network," wait for your balances to finish loading before trying to transact.
- Try refreshing the page.

If all these checks pass and you still can't send transactions, please let us know on discord in the [`#dolphin-testnet`](https://discord.gg/c72QMWEVyY) channel so that we can improve Dolphin!


## FAQ

1. What is the Dolphin bridge page? Why do I need it?

   The Dolphin bridge page enables user to bridge assets between other testnet chains and Dolphin Testnet. Once assets are on Dolphin Testnet, users can then privatize them to enjoy the on-chain privacy.

2. What are the origin and destination fee?

   The origin fee is a fee paid on the chain you are trying to bridge from. The origin fee is paid in the origin chain's native token: DOL on Dolphin, KSM on Kusama, etc.
   The destinatin fee is paid on the chain you are trying to bridge to. The destinatin fee is paid in the token you are bridging.

3. When do I need to connect Metamask?

   You only need to connect Metamask when you want to bridge to or from Moonriver. Otherwise, you only need to connect a substrate account using Polkadot.js, Talisman, or SubWallet

4. What are the currently supported parachains?

   Dolphin Testnet supports testnet Kusama, testnet Karura, and testnet Moonriver. All of these testnets are managed by Manta.

5. What are substrate and EVM accounts?

   A substrate account is the account type used by most Polkadot ecosystem blockchains, such as Dolphin, Kusama, and Polkadot.

   An EVM account is the account type used by Ethereum and similar chains. Moonbeam and Moonriver use EVM accounts.

6. Is my asset private immediately after bridging?

   No, when you bridge asset from another parachain (e.g. Kusama) to Dolphin, your assets do not immediately become private. However, you can easily privatize public assets through [the zkTransact Page](https://app.manta.network/dolphin/transact)

7. How long will the testnet run?

    The testnet will run forever 👾
