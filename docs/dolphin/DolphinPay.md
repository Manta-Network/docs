# 🐬 DolphinPay Testnet (version Spinner)

DolphinPay allows users to send many tokens privately, even if those tokens are not natively private. Users can easily turn public tokens into private tokens, send or receive private tokens in secret, and convert private tokens back to public tokens.

![overview](./private-payment/DolphinPay.svg)
# Setup
## 1. Setup polkadot.js

[Download *polkadot.js* browser wallet](https://polkadot.js.org/extension/), open the extension, and create a new account:
<br>

   ![new-polkadot-js-account](./private-payment/new-polkadot-js-account.png)

<br>

## 2. Get Testnet Tokens

   Join [Manta & Calamari's Discord](https://t.co/5BacMMLSCW), navigate to the `#dolphin-faucet` channel, and type `/gimme`. You should see a faucet options prompt:

   ![faucet](./private-payment/faucet.png)

   You should first claim `DOL`, since you need `DOL` to pay gas fees. Then, you can claim your favorite testnet tokens like `KSM`, `ROC`, `kBTC`, etc.

<br>

## 3. [Install *Signer*](https://github.com/Manta-Network/manta-signer/releases/latest)

Signer is a native app to turbo-charge zero-knowledge proof generation. Signer is available for:
   * macOS
   * Ubuntu/Debian
   * Windows

   When you first open Signer, follow the prompts to create a new account:
   <br>

   ![signer-init](./private-payment/signer-init.png)

<br>

## 4. Lower shields if you are using Brave browser
   Brave's shields prevent Dolphin web app from communicating with Signer, so navigate to [Dolphin App](https://app.dolphin.manta.network/) and turn them off:
   <br>

   ![brave-shields](./private-payment/brave-shields.png)

<br>

# Transacting

Now let's send some private payments :)

## 1. Run Signer

   If Signer is not already running, open signer and enter your password to log in:
   <br>

   ![signer-login](./private-payment/signer-login.png)

   Go to [Dolphin App](https://app.dolphin.manta.network/). You should see that signer is connected in the top right corner of the screen:
<br>

   ![signer-connected](./private-payment/signer-connected.png)
<br>
<br>

## 2. Convert some public tokens to private tokens

   Select the public address you are sending from, the token you are sending, and the amount you want to send to your private account. Press "To Private" to submit:
<br>

   ![to-private](./private-payment/to-private.png)

   Finally, polkadot.js will prompt you to approve the transfer, and then publish it to the Dolphin blockchain:
<br>

   ![polkadot-js-sign](./private-payment/polkadot-js-sign.png)
<br>
<br>

## 3. Send some private tokens to a private account

   Press the private-pubblic toggle button at the top of the form, so that you can send from your private account. Select the token you want to send, enter the amount you are sending, and enter the destination address.

   If you need an example private address to send to, you can send to yourself (click on the copy icon next to your private account), or to this example address:

   `3ZUgqc84wUeFzh2ioRh9yRAM7m8CqunGxsMHHLP6sLus76B3YoLHeQ7jggoV8N1grMv6qu9sLC8oNjHFe2CgJy9s`

   (note that private addresses and public addresses have a different format, and are not interchageable)

   Click "Private Transfer" to begin the transaction.
<br>

   ![private-transfer](./private-payment/private-transfer.png)

   Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.

   Finally, polkadot.js will prompt you to approve the transfer and then publish it to the Dolphin blockchain.
<br>
<br>

## 4. Convert some private tokens to public tokens

   Press the private-public toggle button at the bottom of the form, so that you can send from your private account to one of your public accounts. Select the token you want to send, enter the amount you are sending, and select your public destination account.

<br>

   ![to-public](./private-payment/to-public.png)

   Once again, Signer will prompt you to enter your password and approve the transaction. Once approved, it will build a zero knowledge proof.

   Finally, polkadot.js will prompt you to approve the transfer and, then publish it to the Dolphin blockchain.
<br>
<br>

# Troubleshooting
- Check that polkadot.js browser extension is installed, and has permission to connect to the Dolphin web app.
<br>

   ![polkadot-js-allowed](./private-payment/polkadot-js-allowed.png)

- Check that the latest version of signer is installed, running, and logged in.
<br>

   ![signer-connected](./private-payment/signer-connected.png)

- Check that that your shields are down if you are using Brave browser.
   <br>

   ![brave-shields](./private-payment/brave-shields.png)

- Check that you are connected to a node ("Ford" by default) and that your internet connection is stable.
   <br>

   ![noce-connected](./private-payment/node-connected.png)

- Check that you have some public DOL in order to pay fees.
   <br>

   ![fee-balance](./private-payment/fee-balance.png)

If all these checks pass and you still can't send transactions, please let us know on discord in the `#dolphin-testnet` channel so that we can improve Dolphin!
<br>
<br>

# FAQ

1. Why do I need a *Signer*? Can I trust it?

   _*Signer* serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The *Signer* runs locally and will never share your secrets. The *Signer* is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security._

2. Is the private token in *Signer* secure?

   _All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). *Signer* will never send your secrets online._

3. How can I recover private tokens if I forgot my *Signer* password?

   _We will add recover feature to the *Signer* soon._

4. How does private payment work?

   _[Find out more.](PrivatePayment.md)_
