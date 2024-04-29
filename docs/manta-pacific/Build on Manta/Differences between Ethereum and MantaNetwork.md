# Differences between Ethereum and Manta Network

Manta Network is designed to be EVM equivalent and introduces as few changes as possible to the Ethereum protocol. However, there are some minor differences between the behavior of Ethereum and Manta Network that developers should be aware of.

**Address Aliasing:**

Address aliasing, crucial for security in cross-chain transactions, manifests differently:

- Ethereum preserves sender addresses for transactions from L1 to L2 initiated by Externally Owned Accounts.
- Manta Network maintains sender addresses for L2 user transactions. However, transactions originating from L1 smart contracts undergo sender address modification, employing an "aliased" version to prevent impersonation.

**Transaction Handling:**

Transaction source and fee structures exhibit distinctions:

- Ethereum transactions entail gas fees, while Manta Network transactions necessitate an L1 data fee in addition to standard execution gas fees.
- Parameters governing fee computation, block gas limit, and target, as well as EIP-1559 specifications, differ between Ethereum and Manta Network.

**Mempool Rules:**

Mempool management diverges:

- Ethereum operates with a public mempool accessible to all participants.
- Manta Network adopts a Sequencer-centric mempool, visible exclusively to the Sequencer, with transaction execution prioritized based on fee order.

Detailed minor differences please refer to the following links:

- [Opcodes](https://stack.optimism.io/docs/releases/bedrock/differences/#opcode-differences)
- [Blocks](https://stack.optimism.io/docs/releases/bedrock/differences/#blocks)
- [Network specifications](https://stack.optimism.io/docs/releases/bedrock/differences/#network-specifications)
- [Transaction costs](https://stack.optimism.io/docs/releases/bedrock/differences/#transaction-costs)
