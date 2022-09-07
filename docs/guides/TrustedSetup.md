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

* **TO DO**
All you need to do is run that command and our client will take care of the rest. Once you start the client the following happens:
1. The server checks that you are registered and adds you to the queue. While waiting for your turn you will see the message "Waiting for your turn to contribute. The maximum wait time is X minutes. Please do not close this task."  
2. When you reach the front of the queue, the server sends you the prover/verifier keys from the previous round. It has already checked that the proof that that round was completed correctly.
3. The client generates a random number on your machine, contributes this randomness to the prover/verifier keys, then wipes that random number from memory. It also produces a proof that your contribution conforms to the MPC protocol.
4. The client sends the new prover/verifier keys and the proof of your contribution to the server, which does the appropriate checks and passes them to the next person in line. You will see a notification that your contribution was successful and a hash of your contribution will be printed on-screen and saved to disk. You will use this hash in the final step.

Again, those 4 steps are all happening under the hood: the only thing you do is start the client and leave it running until you see confirmation that the contribution was successful.  Then you proceed to the final step...

### Announcement
Now it's time to tell the world that you have personally contributed to the security of the Manta Network.  Go on Twitter (todo: Do we provide a twitter link for them?) and tweet "I have just made the Kth contribution to the Manta Network Trusted Setup Ceremony! The hash of my contribution is XXXXXXXXXXX."  Remember, this step provides a public record of your contribution, making it impossible for an attacker to change the history of the ceremony without also hacking Twitter and changing your tweet.  We encourage you to post this in as many places as you can! (TODO: Other suggestions, on-chain perhaps?)