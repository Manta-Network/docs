# Shielded Addresses

One essential concept in MantaPay is **shielded addresses**. A shielded address is a reusable address for your private assets in Manta. It has the following properties:

1. **Reusable**, a shielded address can be used multiple times. 
2. **Public**, it is safe to publish your shielded address without worrying about privacy leackage. MantaPay is designed such that shielded address are not disclosed on-chain.
3. **Independent**, your shielded addresses are not associated with any public addresses. For example, you can freely convert a public asset in public address `A` to private assets in shieled address `S`, and then convert it back to public assets in public address `B`.
4. **Auditable**, all the transactions in a shielded address can be audited using a [viewing key](ViewingKey.md).
