# 🎙  治理概览
_注意: Calamari 刚刚开始推行治理，因此许多计划中的功能尚不可用。本文档描述了当前可用的内容，并将随着功能的发布进行持续更新。 _
欢迎阅读我们的治理文档！您将在这里找到关于代币持有者如何参与决定 Calamari 未来的介绍。
作为去中心化系统，Manta Network团队不会在未经社区同意的情况下实现或删除任何功能，这一点至关重要。计划功能开发的路线图如下 [这里](https://emphasized-seed-161.notion.site/3b1b61e0aee8484396d674f4653e0813?v=451a4ad2105d4f9cb35fb74680359c1d)
如果您正在寻找有关 Calamari 治理工作的更多技术细节，请看这里 [深入探讨治理模式](GovernanceDeepdive.md)
## 介绍
顶层设计上，Calamari 变更遵循三个步骤：
*启动期*: 代币持有者提交的提案会变成全民投票。
*投票期*: 代币持有者对公投进行投票。
*生效期*: 成功的公投将自动生效。
这其中有三个关键参与者：
*公共代币持有者*: 就是你！
*理事会*: 代表被动代币持有者。
*技术委员会*: 负责处理紧急情况。
## 1) 启动期
对 Calamari 系统的更改始于 **提案**。可由代币持有者或理事会提交提案 [初始提案](https://wiki.polkadot.network/docs/maintain-guides-democracy#proposing-an-action)
到提案队列。其他代币持有者可以参与是否支持该提案，在启动期结束时，拥有最多支持的提案被提升为 **公投**。我们每次只会提出一个提案，以避免两个相反的提案同时通过的情况。
3、公投阶段，只有理事会可以提交新提案。他们使用的方法称为`democracy.externalProposeDefault`，在即将发布的版本中这也将会开放给所有代币持有者。

## 2) 投票期
所有代币持有者都可以对公投投赞成票或反对票。公投的通过基准是基于投票率所产生。 `democracy.externalProposeDefault`具有“负投票率偏差”，这意味着如果投票率低，则通过的阈值较低，并且随着投票率的增加，阈值也会增加。
例如，如果投票率为 25%，则需要 34% 的赞成才能通过。但如果投票率为 100%，则需要 51% 的赞成（简单多数）。
这种投票方法被称为 [自适应投票偏见](https://wiki.polkadot.network/docs/learn-governance#adaptive-quorum-biasing).
其背后的逻辑是预计投票率在实践中永远不会是 100%，并且不同的提案将具有不同程度的争议性和可信度。例如，我们假设理事会提交的提案比任何公共代币持有者的提案更值得信任，因此我们希望对投票应用此方法。
## 3) 生效期
一旦公投通过，在正式实施开始之前有一个延迟，便于让利益相关者可以为变更做好准备。
### 关于理事会和技术委员会职责的说明
技术委员会可以在紧急情况下加快启动期、投票期和制定期。时间具体缩短多少取决于委员会成员，即使更改也需要委员会一致同意。同样，理事会可以在投票期间取消公投。
显然，理事会和技术委员会对通过哪些提案和公投有很大影响！理事会抵消了民主制度中通常的低投票率，并预计将提交有关该制度的常规运营和维护的建议。技术委员会的存在是为了处理需要快速技术更新的紧急情况。
## 如何对公投进行投票
您作为公共代币持有者可以采取的所有操作都可以通过使用 [Polkadot.JS 应用程序界面](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems#/democracy) 连接到 Calamari 节点来执行。
Polkadot 有很多关于如何使用 App的 [视频教程](https://wiki.polkadot.network/docs/learn-video-tutorials#getting-started)
## 更多资源
如果你想了解更多关于 Polkadot 生态系统治理的信息，可以参考以下链接：
[深入探讨 Calamari 治理](GovernanceDeepdive.md)
[Polkadot docs](https://wiki.polkadot.network/docs/learn-governance)
[Polkadot 关于治理系统的博客](https://polkadot.network/blog/polkadot-governance/)
[Polkadot 关于推行 Kusama 治理的博客](https://polkadot.network/blog/kusama-rollout-and-governance/)
[Polkadot wiki "参与民主"](https://wiki.polkadot.network/docs/maintain-guides-democracy)
