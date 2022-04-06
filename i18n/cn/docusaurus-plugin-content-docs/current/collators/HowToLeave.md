# 💔 退出收集人计划

## 自行退出收集人运行计划

非常简单，只需要选择提交这样的交易 `collatorSelection` → `leaveintent`即可。 

![unregister](images/leave-by-yourself.png)

## **由链上治理撤销表现欠佳的收集人**

如果您的收集人节点表现达不到要求，比如出块时间过长，Calamari 链上治理将提议将您的节点移出收集人候选人名单，但之前绑定的 KMA 将会退还。

发起提案的过程如下, `collatorSelection` → `removeCollator`.

![unregister](images/leave-by-council.png)

这一功能未来将在一个新的`pallet`中添加。