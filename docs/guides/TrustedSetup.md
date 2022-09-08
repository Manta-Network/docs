# 🔗 Trusted Setup

See [here](../concepts/TrustedSetup.md) for an explanation of trusted setups and the role they play on Manta Network.  Read on for participation instructions.

### Preliminaries
We have written a client that makes participation easy. You'll need the Rust compiler on your computer to make it work.
* **Installing Rust**: Please [see here](https://www.rust-lang.org/tools/install) for OS-specific instructions.
* **Updating Rust**: If you already have Rust installed make sure to update to the latest version with the `rustup update` command.

### Downloading Client
The client is hosted at [this repository (TODO: Real link)](https://github.com/Manta-Network/manta-rs). Here are the steps you'll follow:
1. **Clone Repository**: Clone this repository with (TODO: Real link)
```sh
git clone https://github.com/Manta-Network/manta-rs.git
```
Note that this will create a copy of the repository in your current directory. You now have the source code for our client and can run it by following the instructions below.

### Registration
(TODO: Update these screenshots when server is finalized)

You will be signing your contribution with an Ed25519 signature. Only participants who register their public key with Manta Network beforehand will be allowed to participate, so you must follow these steps to generate and then register a public key:
1. **Generate Signature Keypair**: The client you downloaded above will generate your private/public signature keypair for you. Navigate to the `manta-rs` directory (created in the above `clone` step) and run
```sh
cargo run --package manta-trusted-setup --bin groth16_phase2_client -- register
```
You will be asked for an email address and twitter account.  After providing them you will see output that looks something like this:
![registration prompt](./resources/client_register_prompts.png)

2. **Register via Google Form**: Copy the information from the previous step into this [Google form (TODO!)](https://www.google.fr/intl/fr/forms/about/).  Do NOT include the secret phrase. It is important that you use the same Twitter handle and email address as above, since otherwise the signature will be invalid.

3. **Store Your Secret**: Write down your secret seed phrase (in red, see above picture) somewhere safe and do not share it with anyone. Without this phrase you will not be able to participate in the ceremony!

### Contribution
Registered participants may contribute at any time while the ceremony is running. You will do so with the following command:
```sh
cargo run --package manta-trusted-setup --bin groth16_phase2_client -- contribute
```
(don't forget to first navigate to the `manta-rs` directory you created when you downloaded the client!)

When you enter that command you will be prompted to enter the secret phrase you saved from the registration phase (see above):
![password prompt](./resources/client_welcome.png)

All you need to do is enter your secret, the rest will run automatically.  It is likely that you will be placed in the contribution queue, which will look something like this:
![queue](./resources/client_queue.png)
There is nothing you need to do at this point; just wait with this process running and you will automatically contribute when your turn comes. Note that if you close this task then you will lose your place in the queue! You can still restart the task later to contribute, but you will be placed at the end of the queue.

When you have reached the front of the queue the client will automatically begin your contribution, which will look like this:
![contributing](./resources/client_contributing.png)

The contribution process may take up to 5 minutes. Again, there is nothing you need to do at this point; just hold tight. When your contribution is finished it will be sent to our  server for verification.  You will see this:
![awaiting confirmation](./resources/client_await_confirmation.png)

Once the server has verified your contribution you will receive a confirmation message: (TODO: add this screenshot when server is finished)

### Announcement
Now it's time to tell the world that you have personally contributed to the security of the Manta Network.  Go on Twitter and tweet the confirmation message you received above.  Remember, this step provides a public record of your contribution, making it impossible for an attacker to change the history of the ceremony without also hacking Twitter and changing your tweet.  We encourage you to post this in as many places as you can! (TODO: Other suggestions, on-chain perhaps?)