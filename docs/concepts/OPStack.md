# What is OP Stack?

According to the official explanation from [OP Stack Docs](https://stack.optimism.io/#the-op-stack-powers-optimism), **the OP Stack is the standardized, shared, and open-source development stack that powers Optimism, maintained by the Optimism Collective.**

The OP Stack is the set of software that powers Optimism — currently in the form of the software behind Optimism Mainnet and eventually in the form of the Optimism Superchain and its governance.

With the advent of the Superchain concept, it has become increasingly important for Optimism to easily support the secure creation of new chains that can interoperate within the proposed Superchain ecosystem. As a result, the OP Stack is primarily focused around the creation of a shared, high-quality, and fully open-source system for creating new L2 blockchains. By coordinating on shared standards, the Optimism Collective can avoid rebuilding the same software in silos repeatedly.

Although the OP Stack today significantly simplifies the process of creating L2 blockchains, it’s important to note that this does not fundamentally define what the OP Stack **is**. The OP Stack is *all* of the software that powers Optimism. As Optimism evolves, so will the OP Stack.

**The OP Stack can be thought of as software components that either help define a specific layer of the Optimism ecosystem or fill a role as a module within an existing layer.** Although the current heart of the OP Stack is infrastructure for running L2 blockchains, the OP Stack theoretically extends to layers on top of the underlying blockchain including tools like block explorers, message passing mechanisms, governance systems, and more.

Layers are generally more tightly defined towards the bottom of the stack (like the Data Availability Layer) but become more loosely defined towards the top of the stack (like the Governance Layer).

# **Manta Pacific Alpha and** OP Stack

Manta Pacific uses Caldera’s customized OP Stack Rollup solution as the execution layer. OP Stack has already been adopted by top projects for rollup solutions including Coinbase, a16z and Worldcoin. As the de-facto standard of L2 scaling, especially with the recent launch of Bedrock, OP Stack offers the best interoperability, engineering maturity, and long-term ecosystem outlook. In addition to scaling the computation using OP Stack, we leverage Caldera’s stateful precompiles to further reduce the computation cost of zero-knowledge proof verification-related costs.

# The Next Step

Manta is currently launching Manta Pacific, which is an Ethereum-based Layer 2 solution built using OP Stack.

In the upcoming chapters, following the roadmap of Manta Pacific:
- [Manta Pacific Alpha II (+Celestia DA).](/docs/concepts/Celestia)

<div style={{textAlign: 'center',marginBottom: '24px'}}>
    <img alt="pacific-roadmap" src="/img/guides/pacific-roadmap.png" width="70%"/>
</div>