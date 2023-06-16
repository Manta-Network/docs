# Manta Wallet

Manta Wallet is a browser extension that protects your spending secrets and builds zero-knowledge proofs. It allows you to send and receive zkAssets.

## Installation

The latest version of Manta Wallet extension for chromium can be installed from [here](https://chrome.google.com/webstore/detail/manta-walletstaging/ojfnheclkhcophocgofibdgofgijnfck).
:::tip
Manta Signer will be deprecated in the future. Users can migrate their account to Manta Wallet by following [migration instruction](/docs/guides/MantaWalletMigration).
:::

## Creating a New Account

To create a new account, install the Wallet Extension and select the first option `Create a New Account`.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="setup_page" src="/img/guides/manta-wallet/setup_page.png" width="50%"/>
   </div>
<br/>

Next you will have to pick a password that you will use to unlock the Manta Wallet. Please pick a strong password which is at least 8 characters long.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="create-password-page" src="/img/guides/manta-wallet/create-password-page.png" width="50%"/>
   </div>
<br/>

You will be brought to a page that displays your secret recovery phrase. Click the hidden icon in order to reveal it.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="recovery-phrase-hidden" src="/img/guides/manta-wallet/recovery-phrase-hidden.png" width="50%"/>
   </div>
<br/>

:::warning
Write down your recovery phrase offline, somewhere hidden and secure. It is the only way to recover your assets if you lose access to your computer or forget your password!
:::

Once your account is established, you'll be redirected to the home page. You can start using the public account right away with no further actions necessary, for activities such as utilizing Manta Wallet in Bridge, Staking, or NPO.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="sync-data" src="/img/guides/manta-wallet/sync-data.png" width="50%"/>
   </div>
<br/>
However, if you wish to use a zkAccount—for instance, to perform a "public to private", "private to public" or “private to private” transaction in MantaPay—you need to execute a few more steps. First, click on "Sync blocks to continue using the zkAccount" and switch over to the zkAccount. Subsequently, hit the "Blocks Sync Required" button to synchronize blocks. Once synchronization is complete, you are ready to use the zkAccount.

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="sync-data" src="/img/guides/manta-wallet/switch-zk.png" width="50%"/>
   </div>
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="sync-data" src="/img/guides/manta-wallet/switch-zk2.png" width="50%"/>
   </div>
