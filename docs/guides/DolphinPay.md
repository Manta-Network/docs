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
   * macOS (version 10.5 or later)
   * Ubuntu (version 18.04 or 20.04)
   * Windows (version 10 or later)

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

   `2LTk1QjGptbMdHUVKYD6RzRuWv5hefTd1SrcZsS9o1ZEmvvppZmMfE36ChcEve7azJHXvrx5qptmBzDykaenTmTG`

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

   Click on you Polkadot.Js extension --> click on the ⚙️ icon on the top-right corner --> then click on "Manage Website Access" --> check that            "app.dolphin.manta.network" is set to "Allowed". See the image below.

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

- Check that your shields are down if you are using Brave browser.
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

- If you see a delay in the transaction, check the polkadot.js wallet metadata if it needs to be updated.

   See the link [here](https://polkadot.js.org/apps/#/settings/metadata) for any metadata updates.

- On Windows 10, occasionally the installer will fail due to WebView2 not installing correctly. If this happens, you will see a message like so:
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="windows-install" src="/img/guides/windows-install-issue.png" width="70%"/>
   </div>

   To fix this, you can try downloading and installing [WebView2 runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section) directly. 

   Please note that it still might not work. The team is aware of the Windows issue and is currently working on a fix; we'll update the community on the new updates.

<br/>

If all these checks pass and you still can't send transactions, please let us know on discord in the [`#dolphin-testnet`](https://discord.gg/c72QMWEVyY) channel so that we can improve Dolphin!


## FAQ

1. Why do I need a *Signer*? Can I trust it?

   *Signer* serves two purposes: first is to protect your spending secrets, and second is to use native code to build zero-knowledge proofs. The    *Signer* runs locally and will never share your secrets. The *Signer* is [fully open source software](https://github.com/Manta-Network/manta-signer) and will be audited for security.

2. Is the private token in *Signer* secure?

   All the secrets used to spend private tokens is stored locally in your computer and encrypted using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). *Signer* will never send your secrets online.

3. How can I recover private tokens if I forgot my *Signer* password?

   We will add recover feature to the *Signer* soon.

4. How does private payment work?

   [Find out more.](../learn/PrivatePayment.md)

5. I can’t find Calamari Network on Polkadot.Js

   1. To get the Calamari address, you should follow the below-mentioned steps.
      
        1.1 click on polkadot.js extension > Click on three vertical dots as mentioned in the image > Select Calamari Parachain.

        If you still don't see the "Calamari" parachain option, then please visit this URL https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fcalamari-rpc.dwellir.com#/explorer.

   2. Go to settings > Metadata > Update Metadata 
      
      Then please follow steps mentioned in 1.1

6. The `To Private` button on the dolphin testnet is not working

   Please try reloading the page at https://app.dolphin.manta.network/#/transact. Click on the "To Private" button again once you see a number next to BOTH "Balance" fields. Wait patiently until the three dots in the private section `...` disappear.

   Please note that our testnet is currently overwhelmingly popular, and many transactions are trying to go through the network simultaneously, so if you're still experiencing.

   1. Public to private tx not activating
   2. Polkadot.js wallet not showing
   3. Long periods for transactions

   Please wait and try again later!

7. To remove your private account data completely and set up a new account, you should remove these files:

      - macOS: `~/Library/Application Support/manta-signer/`
      - Linux: `~/.config/manta-signer/`
      - Windows: `~/AppData/Roaming/manta-signer/`
      
8. How long will the testnet run?

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
