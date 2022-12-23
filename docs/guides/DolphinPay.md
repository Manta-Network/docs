# 🐬 Try MantaPay on Dolphin Testnet

[The Dolphin zkTransact page](https://app.manta.network/dolphin/transact) allows users to privatize public assets to private or
"zk" assets, transfer zk assets, and convert zk assets back to public assets.

The most important concept to remember when using the Dolphin zkTransact page is that public assets and zk assets have different addresses: public addresses and zkAddresses. There is no relationship between a public address and a zkAddress.

## Setup Testnet Accounts

### Install a Browser Wallet and Create a Public Address

Currently, Dolphin Testnet V3 supports Talisman, SubWallet, Polakdot.js wallets to manage public assets.

To get started, click the "Connect Wallet" button.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect_wallet_button" src="/img/guides/connect_wallet_button.png" width="80%"/>
   </div>

<br/>

If you don't already have a wallet installed, click the "Install" link for your chosen wallet. Once you install the wallet, it will give you instructions to set up your first account. When you are finished, refresh the page and the button text will change from "Install" to "Connect".

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="connect_wallet_modal" src="/img/guides/connect_wallet_modal.png" width="50%"/>
   </div>

<br/>


Once you have a wallet installed, click the "Connect Wallet" button, press "Connect", and follow the prompts from your wallet extension. When you have successfully connected, you will see the wallet in the navbar.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="wallet_connected" src="/img/guides/wallet_connected.png" width="80%"/>
   </div>
<br/>

### Install [Manta Signer](https://signer.manta.network) and Create a zkAccount

Manta Signer is a native app to turbo-charge zero-knowledge proof generation.It allows you to send and receive private payments. Signer is available for:
   * macOS (version 10.5 or later)
   * Ubuntu (version 18.04 or 20.04)
   * Windows (version 10 or later)

You can check the navbar to see if you are connected to Manta Signer.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_connected" src="/img/guides/signer_connected.png" width="80%"/>
   </div>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_not_connected" src="/img/guides/signer_not_connected.png" width="80%"/>
   </div>
<br/>

If you don't have signer installed, you can find the download link by clicking on the "Connect Signer" button.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_install_modal" src="/img/guides/signer_install_modal.png" width="50%"/>
   </div>
<br/>

Open Manta Signer and follow instructions to create your zkAddress. See our [guide to Manta Signer](https://docs.manta.network/docs/guides/MantaSigner) for more details.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_setup_page" src="/img/guides/signer_setup_page.png" width="50%"/>
   </div>
<br/>

### Get Testnet Tokens

Join [Manta & Calamari's Discord](https://t.co/5BacMMLSCW), navigate to the `#dolphin-faucet` channel, and type `/gimme`. You should see a faucet options prompt:

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="faucet_bot" src="/img/guides/faucet_bot.png" width="70%"/>
   </div>
<br/>

Enter your polkadot address and claim some `DOL`. Feel free to claim other testnet tokens like `KSM`, `KAR`, `MOVR`, but you will have to bridge them onto Dolphin (see our guide to bridging [here](https://docs.manta.network/docs/guides/DolphinBridge)). If you want to do private transactions with bridged coins, you will still need `DOL` to pay fees. Note that you can finish this guide with only `DOL`.

<br/>

## Try MantaPay on Dolphin Testnet

Now let's send some private payments!

### Run Signer

If Signer is not already running, open signer and enter your password to log in:

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="signer_login" src="/img/guides/signer_login.png" width="40%"/>
   </div>
<br/>

   Go to [Dolphin App](https://app.manta.network/dolphin/transact). If Manta Signer is connected, you will see your zkAddress the top right corner of the screen:
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="signer_connected" src="/img/guides/signer_connected.png" width="80%"/>
   </div>
<br/>
<br/>

### Convert Public Assets to Private Assets

   Select the public address you are sending from, the token you are sending, and the amount you want to send to your zkAddress. Press "To Private" to submit:

   <div style={{textAlign: 'center'}}>
    <img alt="to_private" src="/img/guides/to_private.png" width="50%"/>
   </div>
   <br/>
   Your browser wallet will prompt you to approve the transfer, and then publish it to the Dolphin blockchain:

<br/>
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="private_transfer_publish" src="/img/guides/private_transfer_publish.png" width="30%"/>
   </div>
<br/>
<br/>

### Send Private Assets to a zkAddress
   Press the private-public toggle button at the top of the form, so that you can send tokens from your zkAddress instead of your public address.
   <div style={{textAlign: 'center'}}>
    <img alt="toggle_public_private" src="/img/guides/toggle_public_private.png" width="50%"/>
   </div>
   <br/>


   Select the token you want to send, enter the amount you are sending, and enter the destination zkAddress. If you need an example zkAddress to send to, you can send to yourself (click on the copy icon next to your zkAddress), or to this example zkAddress:

   `DfZHqhfhtvjSxGY3c6UBnfDAPYCyF8xz9G4bHTHfCrYE`

:::note
zkAddresses and public addresses have a different format, and are not interchageable! You cannot send a private transfer to a public address, or a public transfer to a private address.
:::

   Now click "Private Transfer" to begin the transaction.
   <div style={{textAlign: 'center'}}>
    <img alt="private_transfer" src="/img/guides/private_transfer.png" width="50%"/>
   </div>
<br/>
   Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.
<br/>
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="private_transfer_sign" src="/img/guides/private_transfer_sign.png" width="40%"/>
   </div>

<br/>

   Finally, your browser wallet will prompt you to approve the transfer and then publish it to the Dolphin blockchain.
  <div style={{textAlign: 'center'}}>
    <img alt="private_transfer_publish" src="/img/guides/private_transfer_publish.png" width="30%"/>
   </div>
<br/>
<br/>

### Convert Private Assets to Public
   Now press the private-public toggle button at the bottom of the form, so that you can send assets from your zkAddress to your public account.

   <div style={{textAlign: 'center'}}>
    <img alt="toggle_private_public" src="/img/guides/toggle_private_public.png" width="50%"/>
   </div>
   <br/>
   Select the token you want to send, enter the amount you are sending.
   <br/>
    <br/>
   <div style={{textAlign: 'center'}}>
    <img alt="to_public" src="/img/guides/to_public.png" width="50%"/>
   </div>
   <br/>
   Once again, Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.

  <br/>
   <div style={{textAlign: 'center'}}>
    <img alt="to_public_sign" src="/img/guides/to_public_sign.png" width="50%"/>
   </div>
   <br/>

   Finally, polkadot.js will prompt you to approve the transfer and, then publish it to the Dolphin blockchain.

   <br/>
    <div style={{textAlign: 'center'}}>
    <img alt="private_transfer_publish" src="/img/guides/private_transfer_publish.png" width="30%"/>
   </div>
<br/>
<br/>

## Troubleshooting
- If you are using Brave browser, make sure that your shields are down, as they block connection to Manta Signer.
<div style={{textAlign: 'center'}}>
<img alt="brave-shields" src="/img/guides/brave-shields.png" width="60%"/>
</div>
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

- Check that the latest version of Manta Signer is installed, running, and logged in.
- Check that your internet connection is stable.
- Check [here](https://polkadot.js.org/apps/#/settings/metadata) to see if your browser wallet's metadata needs to be updated.
- If you see "..." or "Syncing to network," wait for your balances to finish loading before trying to transact.
- Try refreshing the page.

If all these checks pass and you still can't send transactions, please let us know on discord in the [`#dolphin-testnet`](https://discord.gg/c72QMWEVyY) channel so that we can improve Dolphin!


## FAQ

1. Why do I need a Manta Signer? Can I trust it?

   Signer serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The Signer runs locally and will never share your secrets. The Signer is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security.

2. Is the private token in Manta Signer secure?

   All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). Signer will never send your secrets online.

3. How can I recover private tokens if I forgot my Manta Signer password?

   See our [guide to Manta Signer](https://docs.manta.network/docs/guides/MantaSigner) for more details.

4. How long do trnsactions take? Why is my transaction taking so long?

  After you have approved a transaction with your browser wallet, it should take about 45 seconds to finalize. Occasionally, transactions with many small inputs require multiple "batches"; you will have to to approve the first part of the transaction, wait for the first part of the transaction to finalize, and then approve the next part.

  If your transaction is taking a long time, make sure Manta Signer and your browser wallet aren't awaiting approvals; you might not have sent actually the transaction. Otherwise, if your transaction keeps you waiting for more than a few minutes, please [file a bug report.](https://discord.gg/c72QMWEVyY)

5. How does private payment work?

   [Find out more here.](../learn/PrivatePayment.md)

6. How do I find my Calamari address on polkadot.js?

   Click on polkadot.js extension, then click on three vertical dots next to your address, and then select "Calamari Parachain." If you don't see the "Calamari Parachain" option, update your extensions metadata [here](https://polkadot.js.org/apps/#/settings/metadata).

7. How can I delete my Manta Signer Account?

   See our [guide to Manta Signer](https://docs.manta.network/docs/guides/MantaSigner) for more details.

8. How long will the testnet run?

We will run various iterations of testnets over time and reset the network (after announcement) when necessary. Do not expect your testnet assets to be available forever. However, we will always maintain some kind of public testnet.
