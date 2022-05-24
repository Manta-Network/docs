# 🐬 Try MantaPay in Dolphin Testnet

MantaPay allows users to privatize public assets to private, transfer private asset, and convert private asset back to public assets (as demonstrated below).

<div style={{textAlign: 'center'}}>
    <img alt="DolphinPay Overview" src="/img/guides/DolphinPay.svg" width="70%"/>
</div>

Note: Public assets and private assets have different addresses (public addresses vs shielded addresses). There is no relationship between a public address and a shielded address.

## Setup Testnet Accounts

### Install a Polkadot.JS Browser Extension and Create a Public Address

Currently, Dolphin Testnet V2 supports Polakdot.JS browser extension wallet to manage public assets.

[Download *polkadot.js* browser wallet](https://polkadot.js.org/extension/), open the extension, and create a new account.

### Install [Manta Signer](https://signer.manta.network) and Create a Shielded Address

Signer is a native app to turbo-charge zero-knowledge proof generation. Signer is available for:
   * macOS
   * Ubuntu/Debian
   * Windows

When you first open Signer, follow the prompts to create a new account:
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-init" src="/img/guides/signer-init.png" width="50%"/>
   </div>

<br/>

### Get Testnet Tokens

Join [Manta & Calamari's Discord](https://t.co/5BacMMLSCW), navigate to the `#dolphin-faucet` channel, and type `/gimme`. You should see a faucet options prompt:

   <div style={{textAlign: 'center'}}>
    <img alt="faucet" src="/img/guides/faucet.png" width="70%"/>
   </div>

You should first claim `DOL`, since you need `DOL` to pay gas fees. Then, you can claim your favorite testnet tokens like `KSM`, `ROC`, `kBTC`, etc.

<br/>

## Try MantaPay in Testnet

Now let's send some private payments :)

### Run Signer

   If Signer is not already running, open signer and enter your password to log in:
   <br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-login" src="/img/guides/signer-login.png" width="50%"/>
   </div>

   Go to [Dolphin App](https://app.dolphin.manta.network/). You should see that signer is connected in the top right corner of the screen:
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-connected" src="/img/guides/signer-connected.png" width="30%"/>
   </div>
<br/>
<br/>

### Convert public assets to private assets

   Select the public address you are sending from, the token you are sending, and the amount you want to send to your shielded address. Press "To Private" to submit:
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="to-private" src="/img/guides/to-private.png" width="50%"/>
   </div>

   Finally, polkadot.js will prompt you to approve the transfer, and then publish it to the Dolphin blockchain:
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-sign" src="/img/guides/polkadot-js-sign.png" width="50%"/>
   </div>
<br/>
<br/>

### Send private assets to a shielded address

   Press the private-public toggle button at the top of the form, so that you can send from your shielded address. Select the token you want to send, enter the amount you are sending, and enter the destination shielded address.

   If you need an example shielded address to send to, you can send to yourself (click on the copy icon next to your shielded address), or to this example address:

   `3ZUgqc84wUeFzh2ioRh9yRAM7m8CqunGxsMHHLP6sLus76B3YoLHeQ7jggoV8N1grMv6qu9sLC8oNjHFe2CgJy9s`

   (note that shielded addresses and public addresses have a different format, and are not interchageable)

   Click "Private Transfer" to begin the transaction.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="private-transfer" src="/img/guides/private-transfer.png" width="50%"/>
   </div>

   Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="private-transfer-approve" src="/img/guides/private-transfer-approve.png" width="50%"/>
   </div>

<br/>

   Finally, polkadot.js will prompt you to approve the transfer and then publish it to the Dolphin blockchain.
<br/>
<br/>

### Convert private assets to public

   Press the private-public toggle button at the bottom of the form, so that you can send from your shielded address to one of your public accounts. Select the token you want to send, enter the amount you are sending, and select your public destination account.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="to-public" src="/img/guides/to-public.png" width="50%"/>
   </div>

   Once again, Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.

   Finally, polkadot.js will prompt you to approve the transfer and, then publish it to the Dolphin blockchain.
<br/>
<br/>

## Troubleshooting
- Check that polkadot.js browser extension is installed, and has permission to connect to the Dolphin web app.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="polkadot-js-allowed" src="/img/guides/polkadot-js-allowed.png" width="70%"/>
   </div>

- Check that the latest version of signer is installed, running, and logged in.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-connected" src="/img/guides/signer-connected.png" width="30%"/>
   </div>

- Make sure you input password at least 8 characters to create a new private account in signer.
<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="password-too-short" src="/img/guides/pwd-too-short.png" width="50%"/>
   </div>

- Check that that your shields are down if you are using Brave browser.
   <br/>

   <div style={{textAlign: 'center'}}>
    <img alt="brave-shields" src="/img/guides/brave-shields.png" width="70%"/>
   </div>

- Check that you are connected to a node ("Ford" by default) and that your internet connection is stable.
   <br/>

   <div style={{textAlign: 'center'}}>
    <img alt="node-connected" src="/img/guides/node-connected.png" width="30%"/>
   </div>

- Check that you have some public DOL in order to pay fees.
   <br/>

   <div style={{textAlign: 'center'}}>
    <img alt="fee-balance" src="/img/guides/fee-balance.png" width="70%"/>
   </div>

If all these checks pass and you still can't send transactions, please let us know on discord in the `#dolphin-testnet` channel so that we can improve Dolphin!
<br/>
<br/>

## FAQ

1. Why do I need a *Signer*? Can I trust it?

   _*Signer* serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The *Signer* runs locally and will never share your secrets. The *Signer* is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security._

2. Is the private token in *Signer* secure?

   _All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). *Signer* will never send your secrets online._

3. How can I recover private tokens if I forgot my *Signer* password?

   _We will add recover feature to the *Signer* soon._

4. How does private payment work?

   _[Find out more.](../learn/PrivatePayment.md)_
