---
sidebar_label: 💔 退出 Collator 节点
hide_title: true
---

## 💔 离开 Collator 节点计划，恢复已绑定的 KMA

如果想要撤销自己的 collator 节点身份，你需要执行`parachainStaking::scheduleLeaveCandidates`

![](../../../../../../../docs/calamari/Staking/06-Collation/images/collator-schedule-leave.png)

这也意味着你的 collator 节点正处于退出状态，不再能够享受未来的奖励。

- **7天后** 你 (或其他人任何人) 可以为你的 collator 执行移除 extrinsic，解除绑定的 KMA

![](../../../../../../../docs/calamari/Staking/06-Collation/images/collator-execute-leave.png)

如果你改变了主意，可以取消解除绑定这一操作 (除非你已经发送了上面的`execute` extrinsic)

![](../../../../../../../docs/calamari/Staking/06-Collation/images/collator-cancel-leave.png)