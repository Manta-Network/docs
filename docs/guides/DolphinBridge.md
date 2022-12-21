# 🐬 Try MantaBridge on Dolphin Testnet

[The Dolphin Bridge page](https://app.manta.network/dolphin/bridge) allows users to bridge assets from different Polkadot parachains and parathreads to Dolphin Testnet and vice versa. Once assets are bridged over into Dolphin Testnet, user can then navigate to the zkTransact page and start to privatize public assets.

## Setup Testnet Accounts

### Install a Browser Wallet and Create a Public Address

Currently, Dolphin Testnet V3 supports Talisman, SubWallet, Polakdot.js wallets to manage public assets.

To get started, click the "Connect Wallet" button.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect-wallet" src="/img/guides/connect_wallet_bridge_button.png" width="80%"/>
   </div>

<br/>

If you don't already have a wallet installed, click the "Install" link for your chosen wallet. Once you install the wallet, it will give you instructions to set up your first account. When you are finished, refresh the page.

🦊__Metamask:__ Dolphin Testnet supports substrate account connection through Polkadot.js, Talisman, and SubWallet. Ethereum account is supported only through Metamask wallet. You will only need to connect both substrate account and ethereum account when you are bridging from or to Moonriver. Otherwise, you are good with only connecting with one substrate account.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect-wallet-modal" src="/img/guides/connect_wallet_modal_bridge.png" width="50%"/>
   </div>

<br/> 


Once you have a wallet installed, click the "Connect Wallet" button, press "Connect", and follow the prompts from your wallet extension. When you have successfully connected, you will see the wallet in the navbar.

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

Enter your polkadot address and claim some `DOL`, `KSM`, `KAR`, and `MOVR`. After successfully receiving the tokens, you can start bridging assets from or to Dolphin Testnet

<br/>

## MantaBridge User Guide

Now let's bridge some tokens!

### Bridge from Kusama & Karura to Dolphin Testnet

   Select the parachain you are sending from, the token you are sending, and the amount to bridge into your current account address. Press 'Submit' button to initialize a bridge transaction:

   <div style={{textAlign: 'center'}}>
    <img alt="bridge-from-kusama" src="/img/guides/bridge_from_kusama.png" width="50%"/>
   </div>
   <br/>
   Your browser wallet will prompt you to approve the transfer, and then publish it to the Dolphin blockchain:

<br/>
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-sign" src="/img/guides/private_transfer_publish.png" width="30%"/>
   </div>
<br/>
<br/>

### Bridge from Moonriver to Dolphin Testnet

   Select Moonriver as the origin chain and Dolphin Testnet as the destination chain (default). Enter the amount of MOVR you want to bridge to Dolphin Testnet. Enter manually the substrate address or press 'Get Address' button to autofill the address of the current substrate account. Press 'Submit' button to initialize a bridge transaction:

   <div style={{textAlign: 'center'}}>
    <img alt="bridge-from-moonriver" src="/img/guides/bridge_from_moonriver.png" width="50%"/>
   </div>
   <br/>

<br/>
<br/>

## Troubleshooting
- Refresh the page if wallet is already installed but the 'install' button appear for wallet connection modal
- Check that your internet connection is stable.
- If you see a delay in the transaction, check the polkadot.js wallet metadata if it needs to be updated. Check [here](https://polkadot.js.org/apps/#/settings/metadata) for any metadata updates.

If all these checks pass and you still can't send transactions, please let us know on discord in the [`#dolphin-testnet`](https://discord.gg/c72QMWEVyY) channel so that we can improve Dolphin!


## FAQ

1. What is MantaBridge & Why do I need it

   MantaBridge enables user to bridge assets from other Polkadot parachain to Dolphin Testnet. Once assets are on Dolphin Testnet, users can then privatize them to enjoy the on-chain privacy.

2. What is origin and destination fee?

   Origin fee is paid in the native token of the origin bridge.
   Destination fee is paid with the token you are trying to bridge.

3. When do I need to connect Metamask?

   You would only need to connect Metamask when you want to bridge from or to Moonriver. Otherwise, you are perfectly fine with only connecting a substrate account through Polkadot.js, Talisman, or SubWallet

4. What are the currently supported parachains?

   Dolphin Testnet is currently supporting Kusama, Karura, and Moonriver. 

   For the supported network, only native tokens such as KSM for Kusama and KAR for Karura is eligible to be bridged. 

5. What is Substrate and EVM account?

   A substrate-based account is an account created for Polkadot Ecosystem Blockchains such as Dolphin, Kusama & Polkadot

   An EVM-based account is an account created for Ethereum Ecosystem Blockchains

6. Is my asset private immediately after bridging?

   No, when you bridge asset from another parachain (ex. Kusama) to Dolphin, your assets do not immediately become private after bridging. However, you can easily privatize public assets through [Mantapay zkTransact Page](https://app.manta.network/dolphin/transact) 

7. How long will the testnet run?

    The testnet will run forever 👾

### Incentivized Testnet FAQs

1. I have followed the Twitter channels, but Gleam is not showing the ✅

   First, please make sure the email account you're logged in on Gleam is the same as the account you were using when you filled the form. If not, you'll have to fill out the form again using the same email/account (both on Gleam and the Google Form). After that, please clean your cache, reload the page and try again.

2. Which address should I enter in the form when asked "enter your private transfer transaction ID to this wallet address `2LTk1QjGptbMdHUVKYD6RzRuWv5hefTd1SrcZsS9o1ZEmvvppZmMfE36ChcEve7azJHXvrx5qptmBzDykaenTmTG`?

   Go to https://dolphin.subscan.io/, search your public wallet address of the dolphin app, find the **extrinsic hash** of your private transfer to the `2LTk1QjGptbMdHUVKYD6RzRuWv5hefTd1SrcZsS9o1ZEmvvppZmMfE36ChcEve7azJHXvrx5qptmBzDykaenTmTG`, and copy/paste that into the form.

3. Is the gleam form closed?

   No, please clear your browser cache and try again at the link https://gleam.io/ye0bg/dolphin-testnet-v2-airdrop.

4. How do I participate in the testnet?

   There is a very thorough guide, please follow the steps at: [Manta Network Testnet V2: Walkthrough](https://mantanetwork.medium.com/manta-network-testnet-v2-walkthrough-28837d7bbba7). Check the Dolphin V2 Resources & Official Announcement at [https://discord.com/channels/795390654628102165/795403612107964416/978712997117698159](https://discord.com/channels/795390654628102165/795403612107964416/978712997117698159)

5. How long will the incentive campaign run?

    The incentivized testnet campaign will run until the Calamari launch.
