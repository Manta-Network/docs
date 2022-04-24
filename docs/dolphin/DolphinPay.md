# 🐬 DolphinPay

DolphinPay allows users to send many tokens privately, even if those tokens are not natively private. Users can easily turn public tokens into private tokens, send private tokens in secret, and then convert private tokens back to public tokens.

![overview](./private-payment/DolphinPay.svg)

# Try DolphinPay Testnet (version Spinner)
## Setup

### 1. Setup polkadot.js

[Download *polkadot.js* browser wallet](https://polkadot.js.org/extension/), open the extension, and create a new account:
   ![new-polkadot-js-account](./private-payment/new-polkadot-js-account.png)

<br>

### 2. Get Testnet Tokens

   Join [Manta & Calamari's Discord](https://t.co/5BacMMLSCW), navigate to the `#dolphin-faucet` channel, and type `/gimme`. You should see a faucet options prompt:

   ![faucet](./private-payment/faucet.png)

   You should first claim `DOL`, since you need `DOL` to pay gas fees. Then, you can claim your favorite testnet tokens like `KSM`, `ROC`, `kBTC`, etc.
<br>
<br>
### 3. [Install *Signer*](https://github.com/Manta-Network/manta-signer/releases/latest)

Signer is a native app to turbo-charge zero-knowledge proof generation. Signer is available for:
   * macOS
   * Ubuntu/Debian
   * Windows

   When you first open Signer, follow the prompts to create a new account:
   ![signer-init](./private-payment/signer-init.png)

<br>

### 4. Lower shields if you are using Brave browser
   Brave's shields prevent Dolphin web app from communicating with Signer, so navigate to [Dolphin App](https://app.dolphin.manta.network/) and turn them off:
   ![brave-shields](./private-payment/brave-shields.png)


## Transacting

Now let's send some private payments :)

1. Run Signer

   If Signer is not already running, open signer and enter your password to log in:
   ![signer-login](./private-payment/signer-login.png)

   Go to [Dolphin App](https://app.dolphin.manta.network/). You should see that signer is connected in the top right corner of the screen:
   ![signer-connected](./private-payment/signer-connected.png)



2. Convert some public tokens to private tokens

   Select the public address you are sending from, the token you are sending, and the amount you want to send. Press "To Private" to submit:

   ![to-private](./private-payment/to-private.png)

3. Send some private tokens to a private address

   ![private-transfer](./private-payment/private-transfer.png)

4. Convert some private tokens to public tokens

   ![to-public](./private-payment/to-public.png)


   * You can see your private token balance by switching to `private` option:


   * Send private tokens: private tokens are attached to a `One-Time Shielded Address`, which means before sending tokens to your friend, you need to get their one time shielded address through some secure communication channel, such as Signal or Telegram.

   * To receive private tokens, get your own `One-Time Shielded Address` by going to `private -> receive -> new address`:

   ![shielded-address](./private-payment/shielded-address.png)

   * Convert private tokens to public tokens:

## Troubleshooting
- Check that polkadot.js browser extension is installed, and has permission to connect to the Dolphin web app.
- Check that the latest version of signer is installed, running, and logged in.
- Check that that your shields are down if you are using Brave browser.
- Check that you have some public DOL in order to pay fees.
- Check that you are connected to a node.
- Check that you are sending to the correct address type.

If all these checks pass and you still can't send transactions

## FAQ

1. Why do I need a *Signer*? Can I trust it?

   _*Signer* serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The *Signer* runs locally and will never share your secrets. The *Signer* is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security._

2. Is the private token in *Signer* secure?

   _All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). *Signer* will never send your secrets online._

3. What is a one time shielded address? How is the shielded address different from my generic Polkadot/Manta address?

   _Dolphin (Boto) uses a one-time shielded address. This is a one-time address for your private tokens. For privacy and security, the address is longer than a typical generic Polkadot/Manta address. In the next version of the testnet, we will switch to reusable shielded addresses._

4. Do I need to keep my one time shielded address confidential? Can someone know my one time shielded address track my transactions?

    _One time shielded address is not *confidential*. Under the hood, MantaPay protocol uses UTXO model and the input and the output of a transfer transaction is shielded by zero-knowledge proofs. As a result, someone know your one time shielded address cannot track your any transactions._

5. How can I recover private tokens if I forgot my *Signer* password?

   _We will add recover feature to the *Signer* soon._

6. How does private payment work?

   _[Find out more.](PrivatePayment.md)_
