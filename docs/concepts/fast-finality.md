# Fast Finality on Manta Pacific

Layer 2 networks have faced a frustrating problem: it takes way too long for transactions to settle onchain. Most current solutions make users wait up to a week before they can be completely sure their transaction is final and their assets are safe. This delay creates significant UX friction and capital inefficiency. Our solution minimizes finality time while preserving security and decentralization guarantees.

## Understanding the Finality Challenge

Finality refers to the point at which it is no longer possible to reverse or change the effect of a transaction on the overall state of the network. In optimistic rollups like Manta Pacific, finality is more complex due to the interaction between two blockchain layers:

1. **Transaction Execution**: A transaction is sent to Manta Pacific (L2) and is immediately executed.
2. **Batching & State Roots**: Multiple transactions are bundled into a batch, and a state root is generated based on the updated state of the network.
3. **Data Availability & Settlement**: The bundled transaction data is stored on Celestia, while the state roots are published to Ethereum.

The "optimistic" nature of the system assumes the validity of newly generated state roots without immediate verification. Instead, a 7-day *challenge period* allows any network actor to prove that a state root is incorrect by executing the transaction data and demonstrating inconsistencies to contracts deployed on Ethereum.

## Our Two-Layer Solution

To reduce finality times without compromising security, our solution introduces *active validation* via native MANTA token staking using Symbiotic’s restaking protocol, along with additional security through the Babylon Bitcoin staking protocol.

<div align="center">
    <img alt="Simple architecture diagram" src={require("./resources/fast-finality-simplified.png").default} width="80%" />
</div>

<p align="center"><em>Fig: Ultra-simplified architecture diagram</em></p>

### MANTA Token Delegation via Symbiotic

The first layer leverages MANTA token staking through Symbiotic’s restaking protocol:

1. **Delegation**: MANTA token holders delegate their validation power to trusted Manta node operators.
2. **Validation**: Node operators swiftly validate new state roots as they are generated and post validation results to Celestia.
3. **Aggregation**: A decentralized relayer system collects and aggregates the validation results, adding a BLS signature for efficient verification.
4. **Settlement**: The aggregated and signed signature data is published to Ethereum.

### Bitcoin Security via Babylon

The second layer employs Bitcoin’s security through the Babylon protocol:

1. **BTC Staking**: BTC holders stake their tokens and participate in the validation process.
2. **Validation**: Babylon’s Finality Providers (FPs) validate the state roots using Extractable One-Time Signature (EOTS) schemes.
3. **Submission**: Validations are sent to a contract deployed on Babylon.
4. **Relaying**: The decentralized relayer system submits validation results to Ethereum.

### Progressive Proof System Integration

Our fast finality security framework will evolve through three phases:
1. Launch with a robust dual-layer validation system.
2. Integrate Optimism's fraud proofs.
3. Incorporate zero-knowledge (ZK) proofs for efficient dispute resolution.

## Results and Benefits

By combining both layers of validation, our system achieves fast finality while maintaining strong security guarantees. Key benefits include:

### Improved Performance and Efficiency
- **Reduced Finality Times**: Transactions are confirmed much faster.
- **Shorter Withdrawal Periods**: Withdrawals can be completed in minutes.
- **Lower Costs**: Selective use of ZK proofs during challenges reduces operational costs.
- **BTC Delegation**: Bitcoin doesn’t need to be bridged or wrapped for delegation.

### Enhanced Security
- **Dual-Layer Validation**: Combines the native MANTA token and BTC for added security.
- **Slashing Mechanism**: Discourages malicious behavior among validators.
- **Decentralization**: Leverages Bitcoin’s network effect for increased decentralization.

## Conclusion

Our fast finality solution represents a significant advancement in L2 scalability. By integrating MANTA token staking with Bitcoin’s robust security model, we’ve created a system that achieves both speed and security. This architecture not only addresses the immediate challenge of slow finality times but also lays the foundation for future innovations in scalability and efficiency.

We look forward to further enhancing this system while maintaining the highest standards of security.