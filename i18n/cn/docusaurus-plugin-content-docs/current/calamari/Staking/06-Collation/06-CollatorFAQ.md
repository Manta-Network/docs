# Collator FAQ

### Q: 如何设置并运行 Collator 节点?

请参阅 [collator 设置指南](SetupAndRun/installation)

### Q: 在哪里可以找到目前的 collator 节点?

https://sparta.calamari.systems/

### Q: 如何寻求帮助?

A: 加入 Manta & Calamari Network Discord 社区中的 #collator-candidates channel ，你可以找到社区成员之前所遇到的相似问题，同时会有社区成员和团队成员帮忙解答。

### Q: 有哪几个不同的网络?

A: 我们共有三个不同的网络，每个网络需要不同的硬件。Dolphin 测试网是免费的，你可以用来熟悉设置的过程。 

Manta Network -  波卡上的生产网络(尚未上线)

Calamari Network - Kusama 上的先行网

Dolphin Testnet - 开发测试网络

### Q: 什么是 Nimbus 密钥?

A: Nimbus 密钥是 session 密钥的一种，它是你在网络上生产区块或进行验证的节点身份证明。它并不存储或能够获取资金。节点正常运行必须可以一直获取这个密钥的权限，因此它是存储在文件系统中的热私钥。你应当在一个离线的安全地点对其进行备份，这样当你需要转移节点身份至另外的设备时。你可以在文档中查阅更多关于 nimbus session 密钥的内容。

### Q: 应该查找什么样的日志哦？

A: 如果一切运行顺利，你的节点已经为成为 collator 做好了准备，那么你的节点日志中应该包括 不断出现的 `💤 Idle` 以及 [中继链] 和 [平行链] 中出现的 peer 数量都应该大于0，比如下图

```
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

将 [平行链] 中的区块数与网络中的其它节点进行对比，他们应该是相同或非常相近的。 在文档中查看更多内容

### Q: 成为 collator 节点需要绑定多少 KMA?

`4_000_000` KMA。
