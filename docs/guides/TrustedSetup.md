# 🔗 Trusted Setup

See [here](../concepts/TrustedSetup.md) for an explanation of trusted setups and the role they play on Manta Network.  Read on for participation instructions.

<div style={{textAlign: 'center'}}>
    <img alt="Trusted Setup" src="/img/guides/trusted-setup-stages.svg" width="70%"/>
</div>

## Support
We're here to help! If you experience difficulty at any stage, please reach out to us on [Discord](https://discord.gg/AZTZvK7X).

We also have a [video tutorial](https://www.youtube.com/watch?v=libknEDADHY&ab_channel=MantaNetwork) to walk you through this process.

## Installing the Client
> Quick installation is currently available for the following OS: macOS, Windows, recent Ubuntu, and Fedora 36.
> 
> All other users please follow [these instructions](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup) to build from source code.

### Mac, Linux Installation
For a quick installation on Mac or Linux, open a terminal and enter the command
```sh
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/Manta-Network/manta-rs/main/tools/install.sh | sh
```
followed by
```sh
source ~/.profile
```

### Linux alternative
If these commands do not work on your version of Linux, try downloading the executable file [here](https://github.com/Manta-Network/manta-rs/releases/download/v0.5.5/manta-trusted-setup-x86_64-unknown-linux-gnu). Navigate to the containing directory (`cd Downloads` for example) and enter
```sh
chmod +x manta-trusted-setup-x86_64-unknown-linux-gnu

./manta-trusted-setup-x86_64-unknown-linux-gnu register
```
This may not work on all Linux distributions; in that case please follow [these instructions](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup) to build from source code.

### Windows Installation
For a quick installation on Windows download the `.exe` [here](https://github.com/Manta-Network/manta-rs/releases/download/v0.5.5/manta-trusted-setup-x86_64-pc-windows-msvc.exe). You will have to confirm that you wish to keep the file. (If you do not wish to do so then you can install from source code, see [here](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup).)

Navigate to the folder where you downloaded the file (likely `cd Downloads`) and enter
```sh
manta-trusted-setup-x86_64-pc-windows-msvc register
```
For Powershell modify this to
```sh
./manta-trusted-setup-x86_64-pc-windows-msvc register
```

That's all, you have installed the client and can move to the the next step: Registration.

### Source Code Installation
If you prefer to build the client yourself from source code, follow the instructions [here](https://github.com/Manta-Network/manta-rs/tree/main/manta-trusted-setup).

## Registration

You will be signing your contribution with an Ed25519 signature. Only participants who register their public key with Manta Network beforehand will be allowed to participate, so you must follow these steps to generate and then register a public key:
1. **Generate Signature Keypair**: The client you downloaded above will generate your private/public signature keypair for you. Open a terminal and run
```sh
manta-trusted-setup register
```
You will be asked for an email address and twitter account.  After providing them you will see output that looks something like this:
![registration prompt](./resources/ts_guide_register.png)

2. **Registration Form**: Copy the information from the previous step into this [Registration form](https://mantanetwork.typeform.com/TrustedSetup).  Do NOT include the secret phrase. It is important that you use the same Twitter handle and email address as above, since otherwise the signature will be invalid.

3. **Store Your Secret**: Write down your secret seed phrase (in red, see above picture) somewhere safe and do not share it with anyone. Without this phrase you will not be able to participate in the ceremony!

## Contribution
Registered participants may contribute at any time while the ceremony is running. To do so, open a terminal and enter the following command:
```sh
manta-trusted-setup contribute
```

When you enter that command you will be prompted to enter the secret phrase you saved from the registration phase (see above):
![password prompt](./resources/ts_guide_secret_prompt.png)

All you need to do is enter your secret, the rest will run automatically.  It is likely that you will be placed in the contribution queue, which will look something like this:
![queue](./resources/ts_guide_queue.png)
There is nothing you need to do at this point; just wait with this process running and you will automatically contribute when your turn comes. Note that if you close this task then you will lose your place in the queue! You can still restart the task later to contribute, but you will be placed at the end of the queue.

When you have reached the front of the queue the client will automatically begin your contribution. The contribution process may take a few minutes. Again, there is nothing you need to do at this point; just hold tight. When your contribution is finished it will be sent to our  server for verification.  You will see this:
![awaiting confirmation](./resources/ts_guide_awaiting_confirmation.png)

Once the server has verified your contribution you will receive a confirmation message:
![success](./resources/ts_guide_success.png)

## Announcement
Please finish your contribution by tweeting the message we provided (or posting to other public forums). While this step is not strictly necessary, it improves the security of the ceremony by creating a public record of your contribution.

Thank you for your participation!