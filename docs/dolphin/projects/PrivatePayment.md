# 🤿 Private Payment

Manta is all about bringing privacy to the wider blockchain space, and an important part of making privacy practical to use is the construction of simple and powerful privacy primitives. The first and most powerful primitive we are building is _Private Payment_, more specifcally, a _multi-asset decentralized anonymous payment protocol_.

## How Does It Work?

We recently posted a tech talk that explains the protocol in some detail:

[![Tech Talk #1](private-payment/tech-talk-1-thumbnail.jpg)](https://www.youtube.com/watch?v=qmRChiIDl2A)

You can follow along with [this video](https://www.youtube.com/watch?v=qmRChiIDl2A), [download the slides](private-payment/tech-talk-1-slides.pdf), and/or keep reading below to get an overview and some technical details about how _Private Payment_ works.

Currently, the formal specification for _Private Payment_ is still closed source, but stay tuned for its public release in the near future!

## Public Ledgers

Most decentralized systems of digital money use what are called _public ledgers_ to keep track of the flow of money. Public ledgers store the current state of every participant's balances, and whenever someone tries to spend from their account, the blockchain will come to consensus on whether this transaction is valid and updates the state. However, to validate a transaction the public ledger needs to know which sender and receiver are participating, and what amount is being transfered. We would like to find a way to avoid this and preserve the privacy of all parties involved in transactions and keep amounts private as well.

## Properties of a Decentralized Anonymous Payment Protocol

When designing a _private ledger_, we want the following two properties to hold:

1. A transaction cannot modify the total supply of an asset. Only the ownership, the _exclusive_ right to spend the asset in the future, can change.
2. Reading the ledger cannot reveal any information about a transaction or existing user balances

These two properties seem to be at odds with each other since we want to verify that the total supply remains fixed but we must do so without learning what the underlying transaction is!

Fortunately, some new cryptographic protocols can save the day, namely zkSNARKs, _zero-knowledge Succinct Non-interactive ARguments of Knowledge_. We will see later which role they play in privatizing the payment protocol.

## Overview

We will first describe a simplified version of the protocol, following two imaginary participants `Alice` and `Bob`, and we want to find a way to have `Alice` send an asset to `Bob` using a private `Ledger`. We will describe the protocol in the following steps:

1. [Send and Receive](#send-and-receive)
2. [Shared Secrets](#shared-secrets)
3. [Encrypt and Decrypt](#encrypt-and-decrypt)
4. [UTXOs and Void Numbers](#utxos-and-void-numbers)
5. [Zero-Knowledge Transfer Proof](#zero-knowledge-transfer-proof)

This discussion is not entirely self-contained but we will attempt to explain cryptographic protocols only as black boxes by their interfaces and security guarantees. Further reading on each of the subjects below is not discouraged.

### Participants (in detail)

- `Alice` (_sender_): a participant that already has access to some assets and is guaranteed by the `Ledger` the ability to spen them.
- `Bob` (_receiver_): a participant that can be uniquely identified by other _senders_ and will be guaranteed the ability to spend received assets in the future.
- `Ledger`: represents all public information (the _state_) and the network of validators (_blockchain_) which come to consensus on the private transfer of ownership of assets between _senders_ and _receivers_.

## Send and Receive

For `Alice` to send her assets to `Bob`, she communicates with the `Ledger` as an intermediary. The `Ledger` operates _asynchronously_ and is distributed across the internet, and so, many computers can access the `Ledger` and send and receive messages to and from the network. `Alice` will send a transfer message to the `Ledger` and if accepted, it will be used to update the state of the `Ledger`, and the changes are propagated to all of the network. `Bob` will query the network, asking for new updates to the state. If there is a new `Ledger` state, he will download it and analyze it to see if he has received any new assets. Here are those two protocols in detail: 

### Send

`Alice` begins by constructing a special number called $\textsf{SK}_\textsf{E}$, the _ephemeral secret key_, which she will use to represent this unique transfer. She constructs it by taking `Bob`'s _pubic key_, $\textsf{PK}_\textsf{B}$, some public data from the `Ledger`, and some randomness:

![Send Protocol](private-payment/send-protocol.png)

This is built using a _commitment scheme_ which commits to $\Lambda$ (the ledger checkpoint), and $\textsf{PK}_\textsf{B}$ using $\tau$ as the randomness (A.K.A blinder, or trapdoor):

$$
\textsf{SK}_\textsf{E} := \textsf{COM}(\Lambda || \textsf{PK}_\textsf{B}, \tau)
$$

This ephemeral key is only used once. `Alice` will have to prove later that she constructed $\textsf{SK}_\textsf{E}$ properly, called _opening_ the commitment. The commitment is _binding_ which means that `Alice` will not be able to change her mind and find another public key or ledger checkpoint to construct the same ephemeral key. The trapdoor $\tau$ gives us the _hiding_ property which means that even if someone knows $\Lambda$ and $\textsf{PK}_\textsf{B}$ they won't be able to predict what $\textsf{SK}_\textsf{E}$ is without knowing $\tau$.

`Alice` now uses the ephemeral key, $\textsf{SK}_\textsf{E}$, her own secret key $\textsf{SK}_\textsf{A}$, and the asset that she received from the `Ledger` earlier, to build a _shielded asset_. We will see as we go along how exactly the shielded asset is built.

### Receive

Once `Alice` finishes her communication with the `Ledger` and the `Ledger` accepts her shielded asset, it will store that shielded asset forever, waiting for someone to claim it. `Bob` wishes to claim it so he goes to the `Ledger` and asks for all of the newest shielded assets since his last query. The `Ledger` will send them to `Bob` and he will use his secret key $\textsf{SK}_\textsf{B}$ to scan through the shielded assets to find the ones he now owns. 

![Receive Protocol](private-payment/receive-protocol.png)

The secret key that `Bob` is using for this scanning process must be the one that _derived_ the public key $\textsf{PK}_\textsf{B}$ which `Alice` used to build the shielded asset. This _key derivation_ must be irreversible so that no one can discover (in a reasonable amount of time) what $\textsf{SK}_\textsf{B}$ is just from the knowledge of $\textsf{PK}_\textsf{B}$.

**NOTE**: Because the `Ledger` will be around for a long time, `Bob` can wait as long as he likes to receive the new shielded assets.

## Shared Secrets

But how will `Bob` be able to claim is new assets? How will he be able to spend them in the future?

One of the most important cryptographic tools that we can take advantage of here is the _shared secret_. Essentially, we want to find a way to take some information and wrap it up so that only two people have access to it. Getting someone to share a secret with themselves is easy, they just don't tell anyone. But how do we tell someone else our secrets so that only one other person ever knows what it is?

One of the most common ways to do this is with the _Diffie-Hellman Key Exchange_ protocol. In this protocol, we take an operation that we assume is impossible (in a reasonable amount of time) to reverse, let's call it $\textsf{bind}$, and a public constant $G$ that everyone agrees on. We choose $\textsf{bind}$ and $G$ so that it has the following property:

$$
\textsf{bind}(y, \textsf{bind}(x, G)) = \textsf{bind}(x, \textsf{bind}(y, G))
$$

Let's call $x$ and $y$ secret keys and call $X := \textsf{bind}(x, G)$ and $Y := \textsf{bind}(y, G)$ public keys. Since $\textsf{bind}$ is irreversible, we can leave $X$ and $Y$ out in the open for anyone to see, or even if we want to be discrete we can still send $X$ or $Y$ to only a particular person, but we don't have to worry that someone can reverse engineer our keys if they get their hands on it.

Because the $\textsf{bind}$ function has the property above, we actually have our shared secret:

$$
S := \textsf{bind}(y, X) = \textsf{bind}(x, Y)
$$

So if you share your public key $X$ with someone and get their public key $Y$, then you both can compute the shared secret, $S$. In the rest of the protocol, `Alice` and `Bob` will share several secrets on their way to performing a successful transfer.

## Encrypt and Decrypt

The first place that `Alice` and `Bob` use _shared secrets_ is to share _encryption_ keys. Encryption is the act of hiding some information (_plaintext_) using a secret _key_ so that later it can be _decrypted_ using the same secret key to produce the original plaintext.

### Encryption



### Decryption



## UTXOs and Void Numbers



### UTXOs



### Void Numbers



## Zero-Knowledge Transfer Proof



## Generalized N-to-M Transfer Protocol


