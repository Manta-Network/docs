# Trusted Setup

## What is a trusted setup?

The Manta Network uses [zero-knowledge proofs (ZKPs)](./ZKP.md) to protect your privacy. The specific kind of ZKP we use for MantaPay is a ZK-SNARK known as [Groth16](https://eprint.iacr.org/2016/260.pdf) and it requires two pieces of public infrastructure: a prover key and a verifier key. The trusted setup is a process for securely generating these keys.

## What are these keys?

Let's review what's happening on the Manta Network using MantaPay as an example. MantaPay enables users to send tokens to each other without compromising their privacy. The way this works is that instead of posting sensitive information (address, token type, amount) on-chain as one does on Bitcoin or Ethereum, users post a ZKP. This ZKP is a proof of the statement "I am performing a valid transaction." (The actual statement is a bit more complicated, of course.)

So in this situation the Manta Pay user is a *prover* and the Manta Network nodes are *verifiers* of the statement "I am performing a valid transaction." The proof itself is a solution to a complicated math problem. This math problem can be solved easily by an honest prover (a user submitting a valid transaction) but is nearly impossible for a dishonest prover (someone attempting to submit a fraudulent transaction). A verifier can quickly check whether a claimed solution to that math problem is valid. Very importantly, the solution itself does not reveal any sensitive information like address, token type, or amount.

Now we come to the keys: the math problem that provers must solve and verifiers must check is stated in terms of a set of public parameters that both parties agree to use. These parameters are the so-called "keys."  The parameters needed to state a solution to the math problem are called the *prover key* and the parameters needed to verify the solution are called the *verifier key*.  To make a ZKP, MantaPay users need the prover key; to verify that proof, Manta Network nodes need the verifier key. Of course, when you use MantaPay you don't see any of these keys, but they're part of what's going on under the hood.

## Why do we need a trusted setup?

The prover and verifier keys must be formed according to specific mathematical rules. These rules are too complicated to explain here (see [Groth '16](https://eprint.iacr.org/2016/260.pdf)), but the procedure for generating the keys is roughly this:
1. Sample a few random numbers, known as the *trapdoor* $\tau$.
2. Use that number to compute a bunch of elliptic curve points. Those points form the prover/verifier keys.
3. **Forget the random number**

Step 3 is super important, so we'll try to explain why.  If you look at the prover and verifier keys it is almost impossible to figure out what $\tau$ is (it's an example of the "discrete logarithm problem").  But if you *do* know the secret numbers $\tau$ then you can actually create *false proofs* that allow you to submit *fraudulent transactions* to the chain.  Essentially this means that anyone who figures out what $\tau$ is can make tokens out of thin air!

It is important to note that the existence of such $\tau$ from which one could fabricate false proofs is also the reason why Groth16 has the zero-knowledge property: if someone with no knowledge of the private information of the transaction can theoretically create a valid proof for it, then the proof does not leak any information about this private information.

So while the existence of $\tau$ is a necessary evil, $\tau$ itself is a dangerous set of numbers nobody should know. This is why it's known as **toxic waste**. And like the toxic waste produced by a chemical plant, it's essential that we dispose of $\tau$ properly.  The point of a trusted setup is to make sure that the prover and verifier keys are properly formed *and* that the toxic waste is thrown away for good.

## How do we do it? 

Generating the prover/verifier keys securely means making sure that the toxic waste $\tau$ is thrown away at the end of the procedure.  One (bad) way to do this would be to ask some trusted party, maybe Vitalik Buterin, to generate the keys for us and promise to wipe $\tau$ from his computer's memory afterwards. But there are two big issues with this approach. Firstly, do we really trust Vitalik that much? And even if we do, are we really confident that no hacker can compromise his computer? The integrity of the network depends on no one knowing the value of $\tau$, so it would be too risky to trust any one person to generate the keys.

As with so many things in Web3, *trust comes from decentralization*. The generation of prover and verifier keys is performed via a *multi-party computation* (MPC) that allows us to distribute the toxic waste across hundreds of participants. The MPC runs something like this:
1. Current participant receives prover/verifier keys from the previous participant.
2. Participant samples a random number tau and uses tau to transform the prover/verifier keys.
3. Participant forgets tau and passes the transformed prover/verifier keys along to the next participant.

In this way the MPC forms a chain of participants who each contribute their own randomness to the prover/verifier keys and therefore each have their own toxic waste.  At first this sounds worse, but it's actually an improvement.  That's because if at least one participant out of the many contributors disposes of their toxic waste, it makes the resulting prover/verifier keys secure.  (To use a Harry Potter analogy, this is as though destroying one single Horcrux would have defeated Voldemort.  It would make the books a lot shorter, but the wizarding world would be thrilled by this security guarantee.)

> It's worth emphasizing: *if at least one single participant in the ceremony is honest then the resulting keys are secure.*

This is where the term "trusted setup ceremony" comes from. *Setup* because it generates necessary infrastructure (prover/verifier keys) for ZKPs. *Ceremony* because it requires many participants to coordinate with each other to carry out the MPC. *Trusted* because the design of this MPC allows us to trust its output as long as we believe that at least one honest person participated.  

## What attacks are possible?

Given that the network's economic value depends on the security of the prover/verifier keys, there is a large incentive to undermine that security.  Therefore we must give careful thought to the possible attacks on our trusted setup ceremony. We'll list a few attacks and explain how they are mitigated.

* **Brute Force**: The least effective attack would be a brute force search for the toxic waste $\tau$.  It is technically possible, given the prover and verifier keys, to deduce the secret value tau.  However doing so requires solving a notoriously difficult math problem known as the "discrete log problem."  The best algorithms for solving this problem still involve an enormous amount of guess-and-check and a successful attack would require more luck than winning the lottery every day for a month.  So the strategy for mitigating a brute force attack is just sheer computational difficulty.
* **Grand Conspiracy**: The next-best attack would be to compromise all participants, either by colluding with them directly or by sneaking malware onto their machines.  If the attacker learns every participant's toxic waste number then they can deduce the secret trapdoor $\tau$. However, this attack is only successful if it compromises *every single participant*. If even one honest participant escapes the conspiracy then the attackers are left with no better option than to try the brute-force attack we mentioned above. So the strategy for mitigating this attack is *decentralization*: the more spread out and diverse the participants are, the harder it becomes for an attacker to compromise all of their machines.
* **Disobeying MPC Protocol**: a bad actor may try to participate in our trusted setup ceremony and compromise the prover/verifier keys by breaking the rules of the MPC protocol. One way of doing so would be to break the contribution chain: instead of contributing to the prover/verifier keys they received from the previous participant, an attacker may replace these with other keys that they cooked up themselves. This would effectively erase all prior contributions, and could result in compromised prover/verifier keys. Another way to break the protocol would be to simply not follow the mathematical rules for contributing randomness to the keys.  This would yield unusable keys that make it impossible for anyone to produce valid ZKPs.   
Both attacks are mitigated by the design of the MPC: any contribution must be accompanied by a ZKP that 

    1. the current contribution was based off the keys from the previous round
    2. the mathematical rules for transforming the keys were followed. 

    The ceremony coordinator (a server we run, see below) checks the proof of each contribution's validity before accepting the contribution and passing its prover/verifier keys along to the next participant.  Moreover, after the conclusion of the ceremony, the contribution proofs are made available to the public so that anyone can verify that the resulting parameters were indeed formed according to the rules of the MPC protocol.
* **Changing History**: Perhaps the scariest attack involves lying about the history of the ceremony.  To understand this attack, recall that the MPC for computing the prover/verifier keys forms a chain of contributions, each accompanied by a proof of its validity.  These proofs will be hosted somewhere online, allowing anyone to check that the MPC protocol was followed. Unfortunately, this also results in a new attack vector: What if an attacker were to gain control of the server(s) hosting the ceremony's contribution proofs? They could then simulate a trusted setup ceremony that looks legitimate, but was in fact entirely controlled by them. How can we be sure that the proofs hosted on this server are the same as those that were used in the original ceremony?  
This is a familiar problem: when I download files from the internet, how do I know I'm getting the right thing? The best defense against such attacks is checksums. Whenever you download a large file from an untrusted source, it is good practice to compute the SHA256 hash of the file and compare it to a hash posted elsewhere on a trusted source.  This is why contributors are urged to complete Step 4, **Announce your contribution publicly**. What this means is that once your contribution is finished, you will be presented with a hash of your contribution. You should copy that hash and post it publicly in as many places as possible, for example by tweeting:

    *I just contributed to the Manta Pay Trusted Setup Ceremony. The hash of my contribution is xxxxxxxxxxxxx*.

    Doing so increases the difficulty of a "changing history" attack because someone trying to check the proof of your contribution can compare its hash to the one in your tweet. Now the attacker needs to not only gain control of the server hosting the contribution proofs, they must also hack Twitter to change the content of your tweet.

## What is Manta's role?

Manta wants the ceremony to run smoothly and produce secure prover/verifier keys, and we have done a lot of work to ensure this.  Firstly, we have written software that makes it easy to contribute without needing to understand the mathematics behind ZKP and MPC.  This makes the ceremony more secure by opening up participation to a much more diverse group of people than would otherwise be able to contribute if everyone had to write this code themselves.  Anyone who is comfortable with the command line can run our client and contribute to the security of the Manta Network.  And of course all this code is completely open-source, so you can inspect it yourself.

Beyond that, Manta is also coordinating the ceremony by
* Maintaining a registry of participants: to prevent a DDOS attack on the ceremony we require participants to pre-register.
* Queueing participants: our server organizes participants in a queue to ensure that contributions are made one-by-one and keep waiting times to a minimum.
* Verifying contributions: before passing prover/verifier keys along to the next participant, our server checks the proof the contribution was made according to the MPC protocol.
* Archiving the ceremony: to allow anyone to verify that our ceremony followed the MPC protocol we will archive all contribution proofs and keep these available to the public for as long as these prover/verifier keys are in use.
* Verifying the Perpetual Powers of Tau ceremony: more on this below.

## Credit where credit is due:

Manta has put a lot of work into organizing this ceremony and keeping it secure, but we didn't do it all from scratch. Here are some of the people and projects whose work we built upon to make our ceremony possible:

* [Perpetual Powers of Tau](https://github.com/weijiekoh/perpetualpowersoftau): A subtlety that we glossed over above is that the generation of prover/verifier keys for Groth16 ZKPs can be divided into two steps, or "phases." Phase 1 is multi-purpose; it results in a set of parameters that can be used by any ZKP (the only restrictions are on the size of the ZKP and the underlying elliptic curve).  Phase 1 can be performed once and reused by many projects. Phase 2 is specific to the circuits being used (in our case, the MantaPay circuits).  The Phase 2 ceremony must be performed individually by each project and must be repeated if the project ever makes changes to their circuits.  The Manta Pay Trusted Setup Ceremony is a Phase 2 ceremony that produces prover/verifier keys that can only be used for the Manta Pay circuits.    
Each Phase 2 ceremony must begin with the output of a Phase 1 ceremony. In our case, we chose to use the Perpetual Powers of Tau (PPoT) as our Phase 1.  PPoT is a public good organized by Ethereum Foundation [Privacy and Scaling Explorations Team](https://medium.com/privacy-scaling-explorations).  It is an ambitious public good project to provide the community with a humongous parameter set that is big enough to accommodate very large ZKPs.  PPoT is vulnerable to all the attacks we mentioned above, so before using its output we have verified the proofs of each of its rounds of contribution (72 at the time writing).  The full PPoT ceremony produced about 500x as many parameters as we needed for the MantaPay circuits, so we have only verified the subset of parameters that we will actually use.  We did compare the full checksums against all the public announcements we could find. All checks passed and we are convinced that the PPoT ceremony produced secure output.
* [ZCash Sapling Ceremony](https://github.com/ebfull/powersoftau): ZCash's cryptography team were trailblazers, completing one of the first ever Groth16 trusted setups.  We took lots of inspiration from their work when writing our contribution client. (Though to be clear, we are not using the actual parameters from the Sapling ceremony; we are using PPoT.)
* [This repository](https://github.com/kobigurk/phase2-bn254/tree/master/powersoftau/src) by Kobi Gurkan inspired our implementation (a notable difference is that we use the Arkworks library instead).

## The outcome

Manta Network successfully held the Trusted Setup ceremony in 2022. Ending officially on December 29th, we saw over 13,000 registrations and 4,328 contributions from 177 countries; Manta Network has broken the world record for having [the largest trusted setup in history](https://mantanetwork.medium.com/the-record-breaking-conclusion-of-the-trusted-setup-441382e675d3).

This means that it is unfortunately too late to contribute, but you can nevertheless [verify the results of the ceremony](https://github.com/Manta-Network/manta-rs/blob/main/manta-trusted-setup/README.md).