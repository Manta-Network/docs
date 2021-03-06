# 零知识证明

零知识证明（ZKP）的概念最早由 Shafi Goldwasser、Silvio Micali 和 Charles Rackoff 在上世纪80年代的学术论文《交互式证明系统中的知识复杂性》中提出。该概念提出一个人（证明者）可以在不披露任何信息的情况下向另外一个人（验证者）证明一段声明的正确性。

 ![zkp paper](../../../../../docs/concepts/resources/zkp-paper.png)

尽管这在最初被视为一个理论上的突破，密码学社区认为现实中是不可能实现的。得益于近年来的诸多进展，尤其是像 ZCash 和 Aztec 这样的 Web3项目的贡献，零知识证明系统的性能方面取得了摩尔定律式的飞跃。 

## 零知识证明系统的特性

通常来说，零知识证明系统有以下4个主要特性：

* **完整性**：一个诚实的证明者可以说服验证者相信他/她知道的任何声明。
* **可靠性**：证明者不能伪造可以让诚实验证者信服的任何声明。
* **零知识**：除证明本身外，不会泄露任何其它信息。
* **简洁性**：证明的大小与电路大小（比如计算量）是常数或者对数关系。

## 可信设置

为了生成一个零知识证明，证明者和验证者都需要一个共享的密钥，并用这个共享的密钥来生成公开的参数。这个密钥被称为 *有毒废料*。如果这个密钥被发现，攻击者可以通过伪造零知识证明来欺骗验证者。

为了解决这个问题，来自 ZCash/Berkeley/Technion 的密码学专家提出了一个方案：使用多方计算（MPC）来为零知识证明系统进行一个叫做可信设置的仪式。通过这种方法，只要仪式中有一个人是诚实的（诚实的人可以成功丢弃掉 *有毒废料*），整个系统就是安全的。

Manta 的可信设置包括两个阶段：
* **阶段一**: 我们重新采用 ZCash 的 Powers of Tau 仪式 ([代码](https://github.com/ebfull/powersoftau), [贡献者列表](https://github.com/zcash-hackworks/sapling-mpc/wiki)). 
* **阶段二**: 我们将邀请 Manta 社区成员加入第二阶段的可信设置，敬请期待！
