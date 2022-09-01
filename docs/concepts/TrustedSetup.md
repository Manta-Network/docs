# Trusted Setup

## What is a trusted setup?

The Manta Network uses zero-knowledge proofs (ZKPs) to protect your privacy.  The specific kind of ZKP we use for Manta Pay is a ZK-SNARK known as "Groth16" (todo: CITE) and it requires two pieces of public infrastructure: a prover key and a verifier key.  The trusted setup is a process for securely generating these keys.

## What are these keys?

Let's review what's happening on the Manta Network using Manta Pay as an example.  Manta Pay enables users to send tokens to each other without compromising their privacy.  The way this works is that instead of posting sensitive information (address, token type, amount) on-chain as one does on Bitcoin or Ethereum, users post a ZKP.  This ZKP is a proof of the statement "I am performing a valid transaction."  (The actual statement is a bit more complicated, of course.)

So in this situation the Manta Pay user is a *prover* and the Manta Network nodes are *verifiers* of the statement "I am performing a valid transaction."  The proof itself is a solution to a complicated math problem.  This math problem can be solved easily by an honest prover (a user submitting a valid transaction) but is nearly impossible for a dishonest prover (someone attempting to submit a fraudulent transaction).  A verifier can quickly check whether a claimed solution to that math problem is valid.  Very importantly, the solution itself does not reveal any sensitive information like address, token type, or amount.  (See Groth16 for the technical details todo: CITE)

Now we come to the keys: the math problem that provers must solve and verifiers must check is stated in terms of a set of public parameters that both parties agree to use.  These parameters are the so-called "keys."  The parameters needed to state a solution to the math problem are called the *prover key* and the parameters needed to verify the solution are called the *verifier key*.  To make a ZKP, Manta Pay users need the prover key; to verify that proof, Manta Network nodes need the verifier key. Of course, when you use Manta Pay you don't see any of these keys, but they're part of what's going on under the hood.

## Why do we need a trusted setup?

The prover and verifier keys must be formed according to specific mathematical rules.  These rules are too complicated to explain here (but see todo cite groth), but the procedure for generating the keys is roughly this:
1. Choose a random number (people often call it "tau")
2. Use that number to compute a bunch of elliptic curve points. Those points form the prover/verifier keys.
3. **Forget the random number**

Step 3 is super important, so we'll try to explain why.  If you look at the prover and verifier keys it is almost impossible to figure out what tau is (it's an example of the "discrete logarithm problem").  But if you *do* know the secret number tau then you can actually create *false proofs* that allow you to submit *fraudulent transactions* to the chain.  Essentially this means that anyone who figures out what tau is can make tokens out of thin air!

So tau is a dangerous number. Tau is so dangerous that it's known as "**toxic waste**." And like the toxic waste produced by a chemical plant, it's essential that we dispose of tau properly.  The point of a trusted setup is to make sure that the prover and verifier keys are properly formed *and* that the toxic waste is thrown away for good.

## How do we do it? 

Generating the prover/verifier keys securely means making sure that the toxic waste number tau is thrown away at the end of the procedure.  One (bad) way to do this would be to ask some trusted party, maybe Vitalik Buterin, to generate the keys for us and promise to wipe tau from his computer's memory afterwards. But there are two big issues with this approach. Firstly, do we really trust Vitalik that much? And even if we do, are we really confident that no hacker can compromise his computer? The entire economic value of the network depends on no one knowing the value of tau, so it is essential that the answer to both questions is "yes." Obviously this rules out any centralized key generation scheme that relies on the integrity of one individual or organization.

As with so many things in Web3, *trust comes from decentralization*. The generation of prover and verifier keys is performed via a *multi-party computation* (MPC) that allows us to distribute the toxic waste across hundreds of participants. The MPC runs something like this:
1. Current participant receives prover/verifier keys from the previous participant.
2. Participant samples a random number tau and uses tau to transform the prover/verifier keys.
3. Participant forgets tau and passes the transformed prover/verifier keys along to the next participant.

In this way the MPC forms a chain of participants who each contribute their own randomness to the prover/verifier keys and therefore each have their own toxic waste.  At first this sounds worse, but it's actually an improvement.  That's because if at least one participant out of the hundreds of contributors disposes of their toxic waste, it makes the resulting prover/verifier keys secure.  (To use a Harry Potter analogy, this is as though destroying one single Horcrux would have defeated Voldemort.  It would make the books a lot shorter, but the wizarding world would be thrilled by this security guarantee.)

It's worth emphasizing: *if at least one single participant in the ceremony is honest then the resulting keys are secure.*

This is where the term "trusted setup ceremony" comes from. "Setup" because it generates necessary infrastructure (prover/verifier keys) for ZKPs.  "Ceremony" because it requires many participants to coordinate with each other to carry out the MPC.  "Trusted" because the design of this MPC allows us to trust its output as long as we believe that at least one honest person participated.  

## What does this have to do with me?

That one honest person could be you! If you participate in our trusted ceremony and dispose of your piece of toxic waste, then you have a mathematical guarantee that the prover/verifier keys will be secure.

## How do I participate? 

We have written software that will allow you to participate honestly without having to understand the mathematical details of the ceremony.  The detailed instructions for using this software are below.  The basic steps are
1. Download our trusted setup ceremony client (or write your own)
2. Register for the ceremony with a public signature key
3. Contribute during the ceremony
4. Announce your contribution publicly (see next section)

## What attacks are possible?

Given that the network's economic value depends on the security of the prover/verifier keys, there is a large incentive to undermine that security.  Therefore we must give careful thought to the possible attacks on our trusted setup ceremony. We'll list a few attacks and explain how they are mitigated.

* **Brute Force**: The least effective attack would be a brute force search for the toxic waste number tau.  It is technically possible, given the prover and verifier keys, to deduce the secret value tau.  However doing so requires solving a notoriously difficult math problem known as the "discrete log problem."  The best algorithms for solving this problem still involve an enormous amount of guess-and-check and a successful attack would require more luck than winning the lottery every day for a month.  So the strategy for mitigating a brute force attack is just sheer computational difficulty.
* **Grand Conspiracy**: The next-best attack would be to compromise all participants, either by colluding with them directly or by sneaking malware onto their machines.  If the attacker learns every participant's toxic waste number then they can deduce the secret number tau. However, this attack is only successful if it compromises *every single participant.* If even one honest participant escapes the conspiracy then the attackers are left with no better option than to try the brute-force attack we mentioned above. So the strategy for mitigating this attack is *decentralization*: the more spread out and diverse the participants are, the harder it becomes for an attacker to compromise all of their machines.
* **Disobeying MPC Protocol**: a bad actor may try to participate in our trusted setup ceremony and compromise the prover/verifier keys by breaking the rules of the MPC protocol. One way of doing so would be to break the contribution chain: instead of contributing to the prover/verifier keys they received from the previous participant, an attacker may replace these with other keys that they cooked up themselves. This would effectively erase all prior contributions, and could result in compromised prover/verifier keys. Another way to break the protocol would be to simply not follow the mathematical rules for contributing randomness to the keys.  This would yield unusable keys that make it impossible for anyone to produce valid ZKPs.   
Both attacks are mitigated by the design of the MPC: any contribution must be accompanied by a cryptographic proof that 1) the current contribution was based off the keys from the previous round, 2) the mathematical rules for transforming the keys were followed. The ceremony coordinator (a server we run, see below) checks the proof of each contribution's validity before accepting the contribution and passing its prover/verifier keys along to the next participant.  Moreover, after the conclusion of the ceremony, the contribution proofs are made available to the public so that anyone can verify that the resulting parameters were indeed formed according to the rules of the MPC protocol.
* **Changing History**: Perhaps the scariest attack involves lying about the history of the ceremony.  To understand this attack, recall that the MPC for computing the prover/verifier keys forms a chain of contributions, each accompanied by a proof of its validity.  These proofs will be hosted somewhere online, allowing anyone to check that the MPC protocol was followed. Unfortunately, this also results in a new attack vector: What if an attacker were to gain control of the server(s) hosting the ceremony's contribution proofs? They could then simulate a trusted setup ceremony that looks legitimate, but was in fact entirely controlled by them. How can we be sure that the proofs hosted on this server are the same as those that were used in the original ceremony?  
This is a familiar problem: when I download files from the internet, how do I know I'm getting the right thing? The best defense against such attacks is checksums. Whenever you download a large file from an untrusted source, it is good practice to compute the SHA256 hash of the file and compare it to a hash posted elsewhere on a trusted source.  This is why contributors are urged to complete Step 4, "Announce your contribution publicly." What this means is that once your contribution is finished, you will be presented with a [TODO: What exactly?] hash of your contribution. You should copy that hash and post it publicly in as many places as possible, for example by tweeting "I just contributed to the Manta Pay Trusted Setup Ceremony. The hash of my contribution is xxxxxxxxxxxxx." Doing so increases the difficulty of a "changing history" attack because someone trying to check the proof of your contribution can compare its hash to the one in your tweet. Now the attacker needs to not only gain control of the server hosting the contribution proofs, they must also hack Twitter to change the content of your tweet.

## What is Manta's role?

Manta wants the ceremony to run smoothly and produce secure prover/verifier keys, and we have done a lot of work to ensure this.  Firstly, we have written software that makes it easy to contribute without needing to understand the mathematics behind ZKP and MPC.  This makes the ceremony more secure by opening up participation to a much more diverse group of people than would otherwise be able to contribute if everyone had to write this code themselves.  Anyone who is comfortable with the command line can run our client and contribute to the security of the Manta Network.  And of course all this code is completely open-source, so you can inspect it yourself.

Beyond that, Manta is also coordinating the ceremony by
* Maintaining a registry of participants: to prevent a DDOS attack on the ceremony we require participants to pre-register.  See below for registration instructions.
* Queueing participants: our server organizes participants in a queue to ensure that contributions are made one-by-one and keep waiting times to a minimum.
* Verifying contributions: before passing prover/verifier keys along to the next participant, our server checks the proof the contribution was made according to the MPC protocol.
* Archiving the ceremony: to allow anyone to verify that our ceremony followed the MPC protocol we will archive all contribution proofs and keep these available to the public for as long as these prover/verifier keys are in use.
* Verifying the Perpetual Powers of Tau ceremony: more on this below.

## Credit where credit is due:

Manta has put a lot of work into organizing this ceremony and keeping it secure, but we didn't do it all from scratch. Here are some of the people and projects whose work we built upon to make our ceremony possible:

* [Perpetual Powers of Tau](https://github.com/weijiekoh/perpetualpowersoftau): A subtlety that we glossed over above is that the generation of prover/verifier keys for Groth16 ZKPs can be divided into two steps, or "phases." Phase 1 is multi-purpose; it results in a set of parameters that can be used by any ZKP (the only restrictions are on the size of the ZKP and the underlying elliptic curve).  Phase 1 can be performed once and reused by many projects. Phase 2 is specific to the circuits being used (in our case, the Manta Pay circuits).  The Phase 2 ceremony must be performed individually by each project and must be repeated if the project ever makes changes to their circuits.  The Manta Pay Trusted Setup Ceremony is a Phase 2 ceremony that produces prover/verifier keys that can only be used for the Manta Pay circuits.    
Each Phase 2 ceremony must begin with the output of a Phase 1 ceremony. In our case, we chose to use the Perpetual Powers of Tau (PPoT) as our Phase 1.  PPoT is a public good organized by [todo: Semaphore or Wei Jie Koh?].  It is an ambitious public good project to provide the community with a humongous parameter set that is big enough to accommodate very large ZKPs.  PPoT is vulnerable to all the attacks we mentioned above, so before using its output we have verified the proofs of each of its rounds of contribution (72 at the time writing).  The full PPoT ceremony produced about 500x as many parameters as we needed for the Manta Pay circuits, so we have only verified the subset of parameters that we will actually use.  We did compare the full checksums against all the public announcements we could find. All checks passed and we are convinced that the PPoT ceremony produced secure output.
* [ZCash Sapling Ceremony](https://github.com/ebfull/powersoftau): ZCash's cryptography team were trailblazers, completing one of the first ever Groth16 trusted setups.  We took lots of inspiration from their work when writing our contribution client.
* [Kobi?](https://github.com/kobigurk/phase2-bn254/tree/powers_28/powersoftau/src): TODO: do we recognize Kobi specifically or some organization he's part of?
* 

# How to Participate

### Preliminaries
We have written a client that makes participation easy, but you'll need the Rust compiler on your computer to make it work.
* **Installing Rust**: To Do

### Downloading Client
The client is hosted at [this repository (TODO: Real link)](https://github.com/Manta-Network/manta-rs). Here are the steps you'll follow:
1. **Clone Repository**: To Do
2. **Build Client**: To Do

### Registration
You will be signing your contribution with an Ed25519 signature. Only participants who register their public key with Manta Network beforehand will be allowed to participate, so you must follow these steps to generate and then register a public key:
1. **Generate Signature Keypair**: To Do
2. **Register via Google Form**: To Do

### Contribution
Registered participants may contribute at any time while the ceremony is running. You will do so with the following command:
* **TO DO**
All you need to do is run that command and our client will take care of the rest. Once you start the client the following happens:
1. The server checks that you are registered and adds you to the queue. While waiting for your turn you will see the message "Waiting for your turn to contribute. The maximum wait time is X minutes. Please do not close this task."  
2. When you reach the front of the queue, the server sends you the prover/verifier keys from the previous round. It has already checked that the proof that that round was completed correctly.
3. The client generates a random number on your machine, (todo: user-provided entropy?) contributes this randomness to the prover/verifier keys, then wipes that random number from memory. It also produces a proof that your contribution conforms to the MPC protocol.
4. The client sends the new prover/verifier keys and the proof of your contribution to the server, which does the appropriate checks and passes them to the next person in line. You will see a notification that your contribution was successful and a hash of your contribution will be printed on-screen and saved to disk. You will use this hash in the final step.

Again, those 4 steps are all happening under the hood: the only thing you do is start the client and leave it running until you see confirmation that the contribution was successful.  Then you proceed to the final step...

### Announcement
Now it's time to tell the world that you have personally contributed to the security of the Manta Network.  Go on Twitter (todo: Do we provide a twitter link for them?) and tweet "I have just made the Kth contribution to the Manta Network Trusted Setup Ceremony! The hash of my contribution is XXXXXXXXXXX."  Remember, this step provides a public record of your contribution, making it impossible for an attacker to change the history of the ceremony without also hacking Twitter and changing your tweet.  We encourage you to post this in as many places as you can! (TODO: Other suggestions, on-chain perhaps?)