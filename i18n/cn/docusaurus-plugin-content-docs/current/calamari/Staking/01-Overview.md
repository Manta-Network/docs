# 📝 概览

:::note
自 v3.4.0版本起，Calamari 上线质押（Staking）功能
:::

Calamari 采用 DPoS 共识机制。与其他 L1 类似，Calamari 根据质押 KMA 总量选择出块节点。在 Calamari 中，这些节点称为 Collator。未运行 Collator 的用户，可将 KMA 委托给 Collator，以获得奖励。

### 对 KMA 持有者意味着什么？

1. 投票选择更好的 Collator ⇒ 尽可能低的 Gas 费用
2. 多个独立 Collator ⇒ 强抗审查能力 
3. 你可以通过质押 KMA 获得奖励

### 如何开始质押?

有两种方式质押 KMA：

1. 将 KMA 委托给 Collator

只需要持有 KMA，并在 dApp 里将 KMA 委托给 Collator

2. 运行 Collator 

需要一些技术经验和硬件标准来运行 Calamari Collator。此外，还需要更多的 KMA，当然也会获得更高的奖励。可在 [Collation](./06-Collation/01-Overview.md) 部分里了解更多信息。

## 什么是 DPoS ？

### 与其他 DPoS 的区别

与其他协议相比，Calamari DPoS 允许那些未运行 Collator 的 KMA 持有者将代币委托给一个或多个 Collator，相当于以投票方式选择表现优秀的 Collator，确保其成为 63个活跃 Collator 之一，并分享 Collator 出块奖励作为回报。为了保持 Collator 的相对稳定，解锁 KMA 或更改委托，需要 7天等待期。

### 与 Kusama 现有的 NPoS（nominated proof of stake）共识的区别

Kusama 在节点间分配 KSM 需要链上选举，而在 Calamari 仅需选择具体的 Collator 和要委托的 KMA 数量。这种方式比进行选举更简单，计算量也更小，因为选举执行时间是不确定的，在平行链上需要避免这种可能导致问题的情况出现。
