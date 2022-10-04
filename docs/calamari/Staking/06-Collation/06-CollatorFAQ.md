### Q: How to setup and run a Collator?
See the [collator section](calamari/Staking/Collation/SetupAndRun/installation)

### Q: Where can I find the current collators?
https://sparta.calamari.systems/

### Q: Where can I get help?
A: Come join us on the Manta & Calamari Network Discord Community in the #collator-candidates channel and you’ll find both community members who’ve had similar questions before and team members to help out.

### Q: How do I stay up to date?

### Q: How do I register my node?

### Q: What is the recommended hardware to run a collator?

### Q: What about backup nodes?

### Q: What are the different networks?
A: There are three networks, each will require dedicated hardware. The Dolphin Testnet is free and should be used to familiarize yourself with the setup.

Manta Network - production network on Polkadot (Not yet live)
Calamari Network - canary network on Kusama
Dolphin Testnet - development network

### Q: Can I run a collator on my home network?

### Q: What ports do I allow on my firewall?

### Q: Is there a CPU optimized binary?

### Q: What are the recommendations on monitoring my node?

### Q: What are the KPIs I should be monitoring?

### Q: How should I setup alerting?

### Q: What are Nimbus keys?
A: A Nimbus key is a type of session key. It is your node’s identification to the block production/verification method on the network, which is called Nimbus. It does NOT store or access funds. The node must always have access to this key in order to collate, so it is a hot key stored on the filesystem. You should keep a backup of this key in a safe - offline - location to be able to transfer your node’s identity to another device should you need to. Find more about nimbus session keys in the docs.

### Q: What is the failover process if my primary node is down?

### Q: Should I set up centralized logging?
### Q: What should I look for in the logs?
A: If everything is running smoothly and your node is ready to become a collator, your node logs should contain repeating mentions of `💤 Idle` with a number of peers larger than 0 for both [Relaychain] and [Parachain], e.g.
```
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```
Compare the block number reported in the [Parachain] line to other nodes on the network. They should be equal or very close.
See the docs for more on this

### Q: How much is the bond to become a collator?
The bond to join the collators pool: 4_000_000 KMA

### Q: How do I set an identity on my collator account?
