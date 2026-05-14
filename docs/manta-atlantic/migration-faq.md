---
title: Manta Atlantic Deprecation FAQ
sidebar_label: Migration FAQ
sidebar_position: 99
---

# Manta Atlantic Deprecation FAQ

---

## I. General Information

### Q1: Why is Manta Atlantic being shut down?

Manta Atlantic's Polkadot parachain slot will naturally expire on August 1, 2026. We have decided not to renew the slot and instead consolidate all resources into Manta Pacific (L2). This is not an abandonment — it's a strategic focus. Manta Pacific offers lower gas fees, faster transaction confirmations, a richer EVM ecosystem, and a larger developer community, enabling us to better serve users and developers.

### Q2: When will Manta Atlantic officially stop operating?

The parachain slot is expected to expire around **late July to early August 2026** (the exact timing depends on block production speed and may vary by a few days). At that point, Atlantic will automatically stop producing blocks. We are providing a migration window of over 4 months before then.

### Q3: What are the key dates?

| Date | Event |
| --- | --- |
| March 11, 2026 | Official deprecation announcement published |
| March 18, 2026 | Staking rewards stopped; new staking no longer accepted |
| March 20, 2026 | Cross-chain bridge inbound transfers closed (outbound only) |
| March 25, 2026 | Migration DApp goes live |
| June 2026 | Chain enters read-only mode (final migration window) |
| July 2026 | Slot expires, chain stops producing blocks |

### Q4: What is Manta Pacific? How is it different from Atlantic?

Manta Pacific is Manta Network's Ethereum Layer 2 network. Unlike Atlantic, which is built on Polkadot, Pacific runs on top of the Ethereum ecosystem, is EVM-compatible, supports Solidity smart contracts, and has access to a broader DeFi and developer ecosystem. All future Manta development and ecosystem building will take place on Pacific.

---

## II. Asset Safety & Migration

### Q5: Are my assets on Atlantic safe? Will I lose them?

**No, you will not.** Your assets are 100% safe. We are providing ample migration time (over 4 months) and dedicated migration tools. Even if you miss all migration deadlines, we will take a chain state snapshot and conduct a 1:1 airdrop on Manta Pacific to ensure your assets are not lost.

### Q6: Which assets do I need to migrate?

All assets you hold on Manta Atlantic need to be migrated, including:

- MANTA tokens (including staked MANTA)
- DOT (Polkadot)
- GLMR (Moonbeam)
- USDt
- Other native assets on Atlantic

For a complete asset list, please visit: https://manta.subscan.io/asset_token

### Q7: How do I migrate my assets?

We have provided a dedicated **[Migration DApp](https://app.manta.network/manta/migrate)**. Here are the steps:

1. Connect to the Migration DApp using a Polkadot wallet (Polkadot.js / Talisman / SubWallet)
2. The DApp will automatically detect all your assets and staking status on Atlantic
3. If you have staked assets, the DApp will provide an option to unstake
4. Choose your migration destination:
    - **Migrate to Manta Pacific** — via Manta Bridge cross-chain transfer
    - **Migrate to Polkadot or other parachains** — via XCM transfer
5. Confirm the transaction and wait for it to arrive

### Q8: What migration paths are supported?

Two paths are available. Assets can only be **transferred out**, not in:

- **Manta Atlantic → Manta Pacific**: For users who want to stay within the Manta ecosystem
- **Manta Atlantic → Polkadot & other parachains**: For users who want to move DOT, GLMR, and other assets back to their native chains

### Q9: Will my address change after migrating MANTA to Pacific?

Yes. Atlantic uses the Substrate address format (SS58), while Pacific uses the Ethereum address format (starting with 0x). The Migration DApp will guide you to enter or connect your Ethereum wallet address to receive your assets. Please make sure you control the private key / seed phrase for that Ethereum address.

### Q10: How long does migration take?

Under normal circumstances, a single migration transaction is expected to complete within a few minutes. The exact arrival time depends on the cross-chain bridge's confirmation mechanism.

### Q11: Can I still transfer assets into Atlantic after March 20?

**No.** Starting March 20, 2026, the cross-chain bridge closed all inbound transfer channels. Assets can only be transferred out of Atlantic, not in.

### Q12: Can I still migrate after June?

Starting in June, Atlantic will enter read-only mode. In this mode, most on-chain functions will be disabled, but **migration-related transfer operations will remain available** until the slot expires in July. This is the final migration window — we strongly recommend not waiting until this stage.

### Q13: What happens to my assets after July if I do nothing?

We will take a complete chain state snapshot before the chain stops producing blocks. All unmigrated MANTA will be **airdropped at a 1:1 ratio** to corresponding addresses on Manta Pacific. Additionally, a read-only archive node will be maintained for at least 90 days as a safety net.

However, please note: the automatic airdrop applies only to MANTA tokens. **Non-MANTA assets such as DOT, GLMR, and USDt must be migrated by you before the deadline** — these assets cannot be airdropped on Pacific.

---

## III. Staking

### Q14: I'm currently staking MANTA. What should I do?

Please unstake (unbond) and migrate as soon as possible. Key dates:

- **March 18**: New staking no longer accepted; existing stakers could still earn rewards and unstake
- **May 1**: Staking rewards stopped; forced unstaking began
- **After May 1**: All remaining staked positions are being forcibly unbonded

### Q15: How long does unstaking take?

Manta Atlantic's standard unbonding period applies as normal. After initiating an unbond, you will need to wait approximately 7 days before you can withdraw. We recommend acting early to avoid potential queuing delays.

### Q16: I'm a Collator node operator. What should I do?

- Please complete your unstaking as soon as possible. We will post regular reminders and step-by-step guides in the Collator community Telegram group
- After May 1, inflation will be set to 0, and Collators will no longer receive any block production rewards
- Ultimate goal: All Collators safely exit before the slot expires in July

---

## IV. Exchanges & Wallets

### Q17: My MANTA is on an exchange (Atlantic network). What should I do?

We will notify all exchanges that support Manta Atlantic (such as Gate.io) to proceed with delisting. Please follow exchange announcements for their specific delisting timelines and withdrawal deadlines.

**Recommendation:** Withdraw your MANTA (Atlantic network) from the exchange to your own wallet as soon as possible, then use the Migration DApp to migrate to Pacific. Do not wait until after the exchange delists.

### Q18: Which exchanges will be affected?

All exchanges that support Manta Atlantic network deposits and withdrawals will be affected. A specific exchange list will be updated in future announcements. If you are unsure whether the exchange you use supports Atlantic, please contact their customer support to confirm.

### Q19: Can I still use my wallet (Talisman / SubWallet)?

During the migration window, these wallets will continue to work normally with Atlantic. We will notify wallet providers to remove Atlantic network support before the chain enters read-only mode (June 2026). Please make sure you have completed your migration by then.

---

## V. Projects & Developers

### Q20: Will smart contract code on Atlantic be preserved?

After the chain stops producing blocks, archive nodes will be maintained for at least 6 months, during which you can query historical contract states and data. We are also coordinating with block explorers such as SubScan to preserve historical query functionality.

---

## VI. Community

### Q21: Where can I get the latest information?

- **Discord:** Dedicated [`#atlantic-migration`](https://discord.gg/PbaJZGPQ) channel
- **Twitter/X:** [@MantaNetwork](https://twitter.com/MantaNetwork)
- **Telegram:** [Manta official group](https://t.me/mantanetworkofficial)

### Q22: I'm a large holder (whale). Is there dedicated support?

Yes. We will conduct 1:1 outreach to addresses with large on-chain holdings and provide dedicated migration support. If you hold a significant amount of assets and would like assistance, please contact our team directly via Discord or email.

---

## VII. Technical Details

### Q23: What does "Read-Only Mode" mean?

Starting in June 2026, Atlantic will enter read-only mode:

- Most on-chain functions will be disabled (DApp interactions, new transactions, etc.)
- **Functions that remain available:** Migration-related transfer operations, withdrawing unbonded funds
- The chain will still produce blocks but will not accept regular transactions
- The UI will display prominent migration reminders

### Q24: Will data still be accessible after the chain stops?

Yes. We will:

- Maintain read-only archive nodes for at least 6 months
- Coordinate with block explorers such as SubScan to preserve historical data queries
- Archive the chain's complete historical data for long-term storage

### Q25: How will DEX liquidity on Atlantic be handled?

Manta has already withdrawn all official liquidity from the Atlantic DEX. The remaining third-party LP positions are negligible in size. If you still have LP positions in the DEX, please withdraw and migrate them as soon as possible.

---

## VIII. Other

### Q26: Is Manta Network shutting down?

**Absolutely not.** Manta Network's development will be fully focused on Manta Pacific (L2). The deprecation of Atlantic is a strategic consolidation, allowing us to concentrate all resources on building a better ecosystem on a single chain. Manta Pacific is the future of Manta.

### Q27: I already have assets on Manta Pacific. Will they be affected?

No. Manta Pacific is not affected in any way and will continue to operate normally. This deprecation only involves Manta Atlantic (the Polkadot parachain).

### Q28: What if I have other questions?

- Join the Discord `#atlantic-migration` channel to ask questions
- Reach out on Twitter/X [@MantaNetwork](https://twitter.com/MantaNetwork)
- Join the official Telegram community [Manta official group](https://t.me/mantanetworkofficial)

---

*This FAQ will be continuously updated based on community feedback and migration progress. Last updated: March 10, 2026*
