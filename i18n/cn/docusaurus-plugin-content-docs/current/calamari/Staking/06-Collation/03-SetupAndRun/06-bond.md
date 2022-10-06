# ⏳ 绑定 KMA

在成为 Collator 节点候选人之前必须在链上绑定 KMA。在  `joinCandidates` extrinsic 运行前，collator 账户中必须保证有一定数量可转移的 KMA。

在 (Calamari v3.4.0)上线之初，绑定数量至少为 **400万 KMA**。

当前候选人的绑定数量可以在 [链上](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate/constants) &gt; parachainStaking &gt; minCandidateStk() 进行确认。

:::note
绑定的 KMA 被 *锁定*在账户中，除非你通过退出来进行解锁，这些 KMA:

- 不可进行转移，但是
- 可以用于 **治理投票**等其它链上操作

你可以通过 [unbonding](../Unbond) 来对这些 KMA 进行解除绑定，解绑的过程至少需要7天。
:::

### 💓 成为 collator 

通过你设置 [你的 session 密钥](keys) 的账户来运行 `joinCandidates` [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) 

![parachainStaking.joinCandidates()](/img/collator-program/parachainStaking.joinCandidates.png)

:::note
- **绑定额** 是 4_000_000_000_000_000_000 KMA ( 400万 KMA，小数点后有12位)<br/>
- **候选人数量** 是转账权重的一个指标 ( 比如 gas fee) ，它应该高于目前注册 collator 的数量 ( 否则交易就会失败 ).

目前的数量可以通过 [calamari chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems#/chainstate/constants) &gt; parachainStaking &gt; candidatePool(): u128. 算出来。

安全起见，可以设置一个比较高的数字。但是为了让绑定交易可以成功进行，也需要在账户中保留足够的 gas fee。
:::

如果你的节点在前63名注册候选节点中 ( 你的 collator 所绑定的 KMA + 你节点的 KMA 委托总量 )，那么*下一轮* ( 最长6小时 ) **开始后，你的 collator 节点将开始生产区块并可以获得奖励。
