# Manta Signer

Manta Signer is a desktop application that protects your spending secrets and builds zero-knowledge proofs. It allows you to send and receive private (or "zk") assets.

## Installation

The latest version of Manta Signer can be installed from [here](https://signer.manta.network/).
:::warning
Do not install signer from other sources, malicious manipulated versions can look like the real one but steal your funds
:::

## Creating a New Account

To create a new account, launch the Signer and select the first option `Create Account`.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_setup_page" src="/img/guides/signer_setup_page.png" width="50%"/>
   </div>
<br/>

Next you will have to pick a password that you will use to unlock the Signer. Please pick a strong password which is at least 8 characters long.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-create-password-page" src="/img/guides/signer-create-password-page.png" width="50%"/>
   </div>
<br/>

You will be brought to a page that displays your secret recovery phrase. Click the hidden icon in order to reveal it.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-recovery-phrase-hidden" src="/img/guides/signer-recovery-phrase-hidden.png" width="50%"/>
   </div>
<br/>

:::warning
Write down your recovery phrase offline, somewhere hidden and secure. It is the only way to recover your assets if you lose access to your computer or forget your password!
:::

 Refer to the `Recovering an Existing Account` section to see how you can use your recovery phrase to recover lost funds.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-recovery-phrase-visible" src="/img/guides/signer-recovery-phrase-visible.png" width="50%"/>
   </div>
<br/>

After copying the phrase somewhere safe, you will need to confirm the phrase. Please select the words in the correct order. If you accidentally select a word out of order, you may click it at the bottom to remove it from the selection.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-confirmed-recovery-phrase" src="/img/guides/signer-confirmed-recovery-phrase.png" width="50%"/>
   </div>
<br/>

Finally, once you have entered the phrase in the correct order, select `Finish`. You will be redirected to Sign In.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-finish-account-creation" src="/img/guides/signer-finish-account-creation.png" width="50%"/>
   </div>
<br/>

## Signing In

After you have created your account, you will be brought to the login page. Enter the password you chose when creating your account.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_login" src="/img/guides/signer_login.png" width="50%"/>
   </div>
<br/>

If your password matches, you will be brought to the Sign In confirmation page. You can view and copy your zkAddress. Press `Start` to hide this window. Signer will continue running in the background listening for any transaction requests requiring zero knowledge proof generation. Now you are ready to connect to the MantaPay DApp.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-successful-login" src="/img/guides/signer-successful-login.png" width="50%"/>
   </div>
<br/>

## Exporting your secret recovery phrase

To export your secret recovery phrase, you will need to sign in using your password. Then, navigate to the task bar and select the `View secret recovery phrase` option.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-taskbar-export-recovery-phrase" src="/img/guides/signer-taskbar-export-recovery-phrase.png" width="50%"/>
   </div>
<br/>

This will open a page where you will be prompted once more for your password.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-export-recovery-page" src="/img/guides/signer-export-recovery-page.png" width="50%"/>
   </div>
<br/>

After entering your password correctly, you will be able to view your secret recovery phrase.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-exported-recovery-phrase" src="/img/guides/signer-exported-recovery-phrase.png" width="50%"/>
   </div>
<br/>

## Viewing your zkAddress

If you ever wish to view your zkAddress after signing in, navigate to the task bar and select `View zkAddress`. This will bring you back to the same Sign In confirmation page that displays your zkAddress.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-successful-login" src="/img/guides/signer-view-zk-address.png" width="50%"/>
   </div>
<br/>

## Recovering an Existing Account

If for you forgot the password you chose during account creation, or you deleted your account, or you are using a new device, you can recover your account using the secret recovery phrase provided during account creation.

If you forgot your password you can click `Forgot Password?` on the Sign In page. If you already have an existing wallet, you can choose `I already have a wallet` on the account creation page.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-login-forgot-password" src="/img/guides/signer-login-forgot-password.png" width="50%"/>
   </div>
<br/>

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-create-recovery" src="/img/guides/signer-create-recovery.png" width="50%"/>
   </div>
<br/>

You will be prompted to enter your recovery phrase.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-enter-recovery-phrase" src="/img/guides/signer-enter-recovery-phrase.png" width="50%"/>
   </div>
<br/>

After entering a valid recovery phrase, you will be able to proceed and pick a new password.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-create-password-page" src="/img/guides/signer-create-password-page.png" width="50%"/>
   </div>
<br/>

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-finish-account-creation" src="/img/guides/signer-finish-account-creation.png" width="50%"/>
   </div>
<br/>

Note that after the account has been recovered you will need to re-sync with the ledger.

## Deleting an Existing Account

If you wish to delete your existing account, you may do so by starting Manta Signer and clicking the `Delete Account` option on the task bar icon.

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-taskbar-delete-account" src="/img/guides/signer-taskbar-delete-account.png" width="50%"/>
   </div>
<br/>

:::warning
After clicking the red `Delete Account` button, all your account data will be removed and you will lose access to your private funds FOREVER unless you have your secret recovery phrase.
:::

<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer-delete-account-page" src="/img/guides/signer-delete-account-page.png" width="50%"/>
   </div>
<br/>


After this you will be redirected to create a new account.
<br/>

   <div style={{textAlign: 'center'}}>
    <img alt="signer_setup_page" src="/img/guides/signer_setup_page.png" width="50%"/>
   </div>
<br/>


## FAQ

1. After starting the Signer for the first time, it gets stuck on the loading page for a very long time with the prompt `Downloading Manta Proving Keys...`.

Upon initial launch, the Signer will need to download the parameters required for generating zero knowledge proofs. This make take a while if your internet connection is slow or if you are using a VPN. Please allow the Signer enough time to download the parameters. Once it has finished downloading these paramters, you will be brought to the account creation page.

2. How do I know Manta Signer is running?

You can check that Manta Signer is running if there is a Manta icon on your task bar (on Mac), or at the bottom of your screen (on Windows and Ubuntu).
