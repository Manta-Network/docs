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

Step 3 is super important, and we'll try to explain why.  If you look at the prover and verifier keys it is almost impossible to figure out what tau is (it's an example of the "discrete logarithm problem").  But if you *do* know the secret number tau then you can actually create *false proofs* that allow you to submit *fraudulent transactions* to the chain.  Essentially this means that anyone who figures out what tau is can make tokens out of thin air!

So tau is a dangerous number. Tau is so dangerous that it's known as "**toxic waste**." And like the toxic waste produced by a chemical plant, it's essential that we dispose of tau properly.  The point of a trusted setup is to make sure that the prover and verifier keys are properly formed *and* that the toxic waste is thrown away for good.

## How do we do it? 

Like so

## What does this have to do with you?

* **Point 1** obvious
* **Point 2** arguably more important than **Point 1**
* **Point 3** not so important

Here's a [link](https://github.com/ebfull/powersoftau) to more info.