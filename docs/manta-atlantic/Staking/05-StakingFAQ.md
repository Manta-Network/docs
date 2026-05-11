# FAQ
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

### Q: Manta Atlantic is winding down—what should I do if I’m staking MANTA?

Unstake (unbond) and migrate as soon as possible. The **Manta Atlantic Deprecation FAQ** publishes both a high-level milestone (**March 18, 2026** — staking rewards stopped; new staking no longer accepted, in the summary table) and a **staking-specific phased schedule**: through **March 17** you can still earn rewards and unstake; from **March 17** new staking is not accepted while existing stakers can still earn and unstake; from **May 1** staking rewards stop and forced unstaking begins; after **May 1** remaining stake is forcibly unbonded. If the summary table and the staking section ever differ, follow the **latest FAQ and Discord `#atlantic-migration`** announcements.

### Q: How do I migrate staked or unstaked MANTA off Atlantic?

Use the dedicated **Migration DApp** (URL announced at launch) with a Polkadot wallet (Polkadot.js, Talisman, SubWallet). The DApp can detect staking and offer an **unstake** path, then you choose a destination (e.g. **Manta Pacific** via bridge, or **Polkadot / other parachains** via XCM). After **March 20, 2026**, assets can only move **out** of Atlantic, not in.

### Q: Does the standard unstaking wait still apply during deprecation?

Yes. Manta Atlantic’s **~7 day** unbonding period applies as normal after you initiate unbond—plan ahead so unbonded funds are available before read-only mode and slot expiry (**June / July 2026** per FAQ).

### Q: I run a collator on Atlantic—what should I do?

Complete unstaking / exit as soon as possible. After **May 1, 2026**, inflation is **0** and collators **no longer receive block production rewards**. Aim to exit before the parachain slot expires (~**late July–early August 2026**). Watch collator community channels for step-by-step guides.

### Q: Will I lose MANTA if I miss migration deadlines?

Per the deprecation FAQ, a chain-state snapshot and **1:1 MANTA airdrop on Manta Pacific** are planned for unmigrated MANTA, and archive access is described there—**non-MANTA assets are not airdropped** and must be migrated by you. Staking docs do not replace the FAQ; read it for full asset lists and timelines.
