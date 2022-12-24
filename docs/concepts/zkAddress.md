# zkAddresses

One essential concept in MantaPay is **zkAddresses**. A zkAddress is a reusable address for your private assets in Manta. It has the following properties:

1. **Reusable**: A zkAddress can be safely used multiple times without compromising privacy by establishing correlations between transactions.
2. **Public**: It is safe to publish your zkAddress without worrying about privacy leakage. MantaPay is designed such that zkAddresses are not disclosed on-chain.
3. **Independent**: Your zkAddresses are not associated with any public addresses. For example, you can freely convert a public asset in public address `A` to private assets in shieled address `S`, and then convert it back to public assets in public address `B`.
4. **Auditable**: All the transactions in a zkAddress can be audited using a [viewing key](ViewingKey.md).
