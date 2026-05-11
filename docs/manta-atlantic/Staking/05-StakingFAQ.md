# FAQ

:::danger Manta Atlantic Staking Has Ended
Staking rewards stopped on **May 1, 2026**. New staking was closed on March 18, 2026. The parachain slot expires in late July 2026. Please unstake and migrate your assets using the [Migration DApp](https://app.manta.network/manta/migrate).
:::

## Migration FAQ

### Q: I'm currently staking MANTA. What should I do?

Please unstake and migrate as soon as possible using the [Migration DApp](https://app.manta.network/manta/migrate). Key dates:

- **March 18, 2026**: New staking no longer accepted
- **May 1, 2026**: Staking rewards stopped; forced unstaking began
- **June 2026**: Chain enters read-only mode (most on-chain functions disabled, but migration transfers remain available)
- **Late July 2026**: Parachain slot expires and chain stops producing blocks

### Q: How do I unstake and migrate?

1. Visit the [Migration DApp](https://app.manta.network/manta/migrate) and connect with your Polkadot wallet (Polkadot.js / Talisman / SubWallet)
2. The DApp will automatically detect your staking status and provide an option to unstake
3. Initiate unstaking and wait for the 7-day unbonding period
4. Once unbonded, choose your migration destination:
   - **Manta Atlantic → Manta Pacific** (recommended)
   - **Manta Atlantic → Polkadot or other parachains** (via XCM)
5. Confirm the transaction — it typically completes within a few minutes

### Q: What if I miss all migration deadlines?

A complete chain state snapshot will be taken before the chain stops producing blocks. All unmigrated **MANTA** will be airdropped 1:1 to corresponding addresses on Manta Pacific. However, non-MANTA assets (DOT, GLMR, USDt, etc.) must be migrated manually — they cannot be airdropped on Pacific.

### Q: Will my address change after migrating to Pacific?

Yes. Atlantic uses Substrate address format (SS58), while Manta Pacific uses Ethereum address format (starting with 0x). The Migration DApp will guide you to connect an Ethereum wallet address to receive your assets.

### Q: What happens to assets that are not MANTA (DOT, GLMR, USDt)?

These assets must be migrated manually before the chain stops. They can be sent back to their native chains via XCM through the Migration DApp. The automatic 1:1 airdrop only covers MANTA tokens.

### Q: I'm a Collator node operator — what should I do?

Please complete your unstaking as soon as possible. After May 1, 2026, inflation is set to 0 and Collators no longer receive any block production rewards. Regular reminders and step-by-step guides are posted in the Collator community Telegram group. The goal is for all Collators to safely exit before the slot expires in July.

### Q: Where can I get the latest migration information?

- **Discord:** [`#atlantic-migration`](https://discord.gg/PbaJZGPQ) channel
- **Twitter/X:** [@MantaNetwork](https://twitter.com/MantaNetwork)
- **Telegram:** [Manta official group](https://t.me/mantanetworkofficial)

---

## Historical Staking FAQ

### Q: What is the Manta staking APR?
2% of the initial supply is awarded to Manta stakers for the first year.
APR is varies depending on your percentage stake on a collator and whether it producing a block on its turn each time or if it's missing some

### Q: How often are Manta staking rewards distributed?
Manta stakers will receive rewards at the end of each round (6 hours).

### Q: Is there a Manta unstaking period?
The unstaking period is 7 days.

### Q: Is there a minimum staking amount for Manta?
The minimum staking (=delegation) amount is 500 MANTA.

### Q: Do Manta staking rewards compound?
No, Manta staking rewards are not compounded automatically.

### Q: Is there a slashing risk for Manta validators?
There is no slashing risk for delegators. Collators that do not produce blocks will not earn rewards for themselves **and their delegators**.
