# Zero-Knowledge Proofs

## Origins

The concept of Zero-Knowledge Proofs (ZKPs) was first invented by Shafi Goldwasser, Silvio Micali and Charles Rackoff in their seminal paper, [*The Knowledge Complexity of Interactive-Proof Systems*](https://dl.acm.org/doi/pdf/10.1145/22145.22178) in the 1980s. 

 Despite being considered as a theoretical breakthrough, even the cryptography community labeled the scheme as impossible in practice when the idea was born. Thanks to many breakthroughs made in the recent years, especially the contribution made by many web3 projects like ZCash and Aztec, we have seen a Moore’s Law style improvement on the performance of zero-knowledge proof systems. 

## What is a Zero-Knowledge Proof System?
A zero-knowledge proof system is a protocol by which someone (the prover) can prove the correctness of a statement to someone else (the verifier) without disclosing any additional information. It consists of the following elements and satisfies the following properties.

### Elements of Zero-Knowledge Proof Systems

* **Statement**: The statement whose veracity we want to proof.
* **Public Input**: The information available to both the prover and the verifier. 
* **Witness**: The information known only by the prover which is enough to prove the statement. The prove wants to keep this information secret from the verifier.
* **Proof**: A piece of information which is derived by the prover from the statement, public input and witness and can be verified against the statement and the public input to test the veracity of the statement. 

### Properties of Zero-Knowledge Proof Systems

Generally, zero-knowledge proof systems must satisfy the following 3 crucial properties:

* **Completeness**: An honest prover can convince the verifier about any statement he/she knows.
* **Soundness**: A computationally bounded prover cannot forfeit a proof that can convince an honest verifier.
* **Zero-Knowledge**: The proof doesn’t leak any information other than the proof itself.

### Example
To better illustrate a ZKP system, let us run a simple example in the finite field $\mathbb{F}_7$.
* Statement: *$2$ is a square in $\mathbb{F}_7$*
* Public input: $x = 2$.
* Witness: $w = 4$, since $4^2 = 2$ in $\mathbb{F}_7$.

The protocol consists of the following steps: 
1. The prover chooses a random non-zero $a \in \mathbb{F}_7$ and sends $y = a^2$ to the verifier.
2. The verifier chooses $b \in \{0, 1\}$ and sends it to the prover.
3. The prover sends the verifier the proof $\pi = w^b a$.
4. The verifier accepts the proof if $\pi^2 = x^b y$.

Then they repeat the protocol above for different values of $a$ until the verifier is convinced.

Let us check that the above protocol satisfies the desired properties:
1. Completeness: It is clear, since $\pi^2 = w^{2b} a^2 = x^b y$.
2. Soundness: A dishonest prover might try to trick the verifier by sending a $y$ in step 1 which is not a square. In that case the verifier would reject the proof in half the cases, when they choose $b = 0$. If $y$ is a square but $x$ is not, the verifier would reject the proof when $b = 1$. A dishonest prover has a $1/2$ probability to trick the protocol on each iteration, so this probability can be made negligible by iterating enough times. 
3. Zero-knowledge: If $b = 0$, the prover does not use $w$ at any point in the proof, so they cannot leak it. If $b=1$, the only place where the prover uses $w$ is in $\pi = w a$, from which the verifier cannot extract $w$ without the knowledge of $a$. As long as the prover does not repeat the above protocol with the same $a$ for different $b$'s, the protocol remains zero-knowledge.

## Succint Non-Interactive Arguments of Knowledge (SNARKs)
A particularly important type of ZKP systems are SNARKs. They are zero-knowledge proof systems which satisfy the following extra properties:

* **Argument of knowledge**: On top of the statement, the prover wants to prove knowledge of the witness itself. In the example above, the statement would be "*$2$ is a square in $\mathbb{F}_7$, and I know its square root*". One can show the protocol above also proves this stronger statement, thus making it an argument of knowledge.

* **Succinctness**: The proof size is constant or logarithmic compared with the circuit size (ie. the amount of computation) of the statement. The protocol above is also succint, since the proof is just a number in $\mathbb{F}_7$.

* **Non-Interactive**: Proof generation and proof verification happen in two consecutive rounds: first the prover runs a function $\textsf{prove}$ to generate a proof and then the verifier runs a function $\textsf{verify}$ to verify it. The protocol above is interactive, i.e., it does not satisfy this property because of the continuous communication between prover and verifier. 

### Setup

SNARKs need an extra element to be properly defined

* **Setup**: A set of proving and verifying keys necessary to execute the $\textsf{prove}$ and $\textsf{verify}$ functions, respectively. 

In pairing-based proving systems such as Groth16, the setup consists of a set of elliptic curve points, generated from a randomly sampled seed, more commonly known as the **toxic waste**. Knowledge of this seed allow an attacker to fabricate valid ZKPs for false statements, so it is of paramount importance that the generation of the keys is safely executed, i.e., that nobody knows the toxic waste employed to generate them. This is usually done in a multi-party computation known as [**Trusted Setup**](./TrustedSetup.md).

### The simple definition of a SNARK

Once all the elements are fixed, a SNARK is defined as a pair of functions

* **prove(Setup, Statement, Public Input, Witness) -> Proof**:
* **verify(Setup, Statement, Public Input, Proof) -> bool**:

## ZKPs in MantaPay

MantaPay, Manta's private payment system, uses ZKPs to ensure that transfers are executed according to a structured protocol while keeping sensitive information (for example, how much money you send or who you send it to) private.

Instead directly publishing those details on-chain, which would ensure that the protocol has been properly executed but leak all private data, the sensitive bits of information act as witnesses in a ZKP system, namely the SNARK [Groth16](https://eprint.iacr.org/2016/260.pdf). Then the Ledger runs the $\textsf{verify}$ function on the resulting ZKP against the public inputs and, if it passes, posts the transaction. 

This ZKP can be summarized as *I executed my transaction following the protocol* but much more is going under the hood:
* The amount of asset sent from my account is equal to the amount of asset received in the other account.
* I own the asset I am sending.
* I haven't spent the asset I am sending yet.
* The transfer I made is auditable using my viewing key.