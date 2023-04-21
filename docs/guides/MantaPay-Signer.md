# Getting Started with Manta Signer

The  zkTransact page allows users to privatize public assets to private or "zk" assets, transfer zk assets, and convert zk assets back to public assets.
- [zkTransact](https://app.manta.network/calamari/transact) page for Calamari Network
- zkTransact page for Manta Network (coming soon)

The most important concept to remember when using the zkTransact page is that public assets and zk assets have different addresses: public addresses and zkAddresses. There is no relationship between a public address and a zkAddress.

## Setup Accounts

### Install a Browser Wallet and Create a Public Address

Currently, MantaPay on Calamari supports Talisman, SubWallet and Polkadot.js wallets to manage public assets.

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

Manta Signer is a native app to turbo-charge zero-knowledge proof generation. It allows you to send and receive private payments. Signer is available for:
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

## Using MantaPay on Calamari Network

Now let's send some private payments!

### Run Signer

If the Manta Signer is not already running, open the Manta Signer and enter your password to log in:

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="signer_login" src="/img/guides/signer_login.png" width="40%"/>
   </div>
<br/>

   Go to [MantaPay on Calamari](https://app.manta.network/calamari/transact). If Manta Signer is connected, you will see your zkAddress at the top right corner of the screen:
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="signer_connected" src="/img/guides/signer_connected.png" width="80%"/>
   </div>
<br/>
<br/>

### Convert Public Assets to Private Assets

   Select the public address you are sending from, the token you are sending, and the amount you want to send to your zkAddress. Press "To Private" to submit.

   <div style={{textAlign: 'center'}}>
    <img alt="to_private" src="/img/guides/to_private.png" width="50%"/>
   </div>
   <br/>
   Your browser wallet will prompt you to approve the transfer, and then publish it to the Calamari blockchain.

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


   Select the token you want to send, enter the amount you are sending, and enter the destination zkAddress.

:::note
zkAddresses and public addresses have a different format, and are not interchangeable! You cannot send a private transfer to a public address, or a public transfer to a private address.
:::

   Click "Private Transfer" to begin the transaction.
   <div style={{textAlign: 'center'}}>
    <img alt="private_transfer" src="/img/guides/private_transfer.png" width="50%"/>
   </div>
<br/>
   Manta Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.
<br/>
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="private_transfer_sign" src="/img/guides/private_transfer_sign.png" width="40%"/>
   </div>

<br/>
   Finally, your browser wallet will prompt you to approve the transfer and then publish it to the Calamari blockchain.
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

   Finally, polkadot.js will prompt you to approve the transfer and, then publish it to the Calamari blockchain.

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
- Check that one of Talisman, SubWallet, or polkadot.js is installed, and has permission to connect to the Manta web app.
  - In polkadot.js, click on the ⚙️ icon on the top-right corner, then click on "Manage Website Access", then "app.manta.network" is set to "Allowed":
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

If all these checks pass and you still can't send transactions, please let us know on [Discord](https://www.discord.gg/mantanetwork) so that we can improve Manta!

## FAQ

1. Why do I need a Manta Signer? Can I trust it?

   Signer serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The Signer runs locally and will never share your secrets. The Signer is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security.

2. Is the private token in Manta Signer secure?

   All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). Signer will never send your secrets online.

3. How can I recover private tokens if I forgot my Manta Signer password?

   See our [guide to Manta Signer](https://docs.manta.network/docs/guides/MantaSigner) for more details.

4. How long do transactions take? Why is my transaction taking so long?

  After you have approved a transaction with your browser wallet, it should take about 45 seconds to finalize. Occasionally, transactions with many small inputs require multiple "batches"; you will have to to approve the first part of the transaction, wait for the first part of the transaction to finalize, and then approve the next part.

  If your transaction is taking a long time, make sure Manta Signer and your browser wallet aren't awaiting approvals; you might not have sent actually the transaction. Otherwise, if your transaction keeps you waiting for more than a few minutes, please [file a bug report.](https://discord.gg/c72QMWEVyY)

5. How does private payment work?

   [Find out more here.](../learn/PrivatePayment)

6. How do I find my Calamari address on polkadot.js?

   Click on polkadot.js extension, then click on three vertical dots next to your address, and then select "Calamari Parachain." If you don't see the "Calamari Parachain" option, update your extensions metadata [here](https://polkadot.js.org/apps/#/settings/metadata).

7. How can I delete my Manta Signer Account?

   See our [guide to Manta Signer](https://docs.manta.network/docs/guides/MantaSigner) for more details.

8. Why is my transaction activity not showing up on my zkAddress account?
When you click on your zkAddress, you can view your local activity. This activity is stored locally and viewable based on your browser account. If you switch browser accounts, you will not be able to view the transaction history from the account you originally conducted the transaction. To see that information, you can switch back to your original account.

10. I just received some zkAssets but I don't see it in my assets on the dapp.
Simply refresh the page, and you should see the zkAsset. If you still do not see it, double check with the sender to make sure that they sent to the correct zkAddress. zkAddress transactions cannot be reversed or refunded as they are immutable on-chain like any on-chain transaction, so please make sure you are sending to the correct address.

11. Can I use MantaPay from anywhere?
MantaPay aims to be compliant with existing regulations and so accessing it from the United States, China, Iran, Cuba, North Korea, Syria, Myanmar (Burma), the regions of Crimea, Donetsk or Luhansk is prohibited.