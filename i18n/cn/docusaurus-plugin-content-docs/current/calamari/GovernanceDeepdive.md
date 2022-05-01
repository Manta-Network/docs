# 深入探讨治理模式

本文将对 Calamari 的治理运作进行更深入探究。

Calamari 是建立在 Polkadot 和 Substrate 之上；治理系统直接受到 Polkadot 的启发。主要区别在于我们的理事会管理自己的成员。

注意: 此处所讨论的功能并非全部已发布，请查看我们的[路线图](https://emphasized-seed-161.notion.site/3b1b61e0aee8484396d674f4653e0813?v=451a4ad2105d4f9cb35fb74680359c1d)了解最新产品动态_

## 需要了解的一些概念

如果您正在阅读此文档，我们假设您知道[extrinsic](https://docs.substrate.io/v3/concepts/extrinsics/)是什么，并且熟悉 [Substrate 运作原理](https://docs.substrate.io/v3/concepts/runtime/)。

## 参与者介绍

共有三种参与者可以参与 Calamari 的治理: *_代币持有者,  _理事会_*, and  *_技术委员会_，*它们共同参与链上治理。

****公共代币持有者****  **公共代币持有者**是持有 Calamari 代币的人。他们可以使用他们的质押份额来支持公投提案，并根据他们质押代币份额进行投票。

****理事会****  **理事会**代表被动代币持有者，其存在是因为民主制度通常存在投票率低的问题。理事会成员共有三名，他们的职责是为系统开发和维护提建议。在我们的案例中，委员会还负责引导 Manta 网络，因此由 Manta 核心开发团队的成员组成。技术委员会的成员也由理事会管理。

****技术委员会**** **技术委员会**负责处理突发技术问题。他们有能力快速推进投票的三个阶段，而这些阶段具体缩短多少时间取决于有多少委员会成员认为有必要采取行动。任何更改都需要一致同意。共有三名技术委员会成员，他们也是 Manta 核心开发团队的成员。

## 启动阶段

提交提案的过程从提交提案的初始哈希开始，以验证它在过程中没有被修改。

有两种方法可以提交提案。

### 1. 公开代币持有者提案

代币持有者可以使用`democracy.externalProposeDefault()` extrinsic 提交提案的初始哈希。 这些提案都进入`公共提案队列`。 然后利益相关者可以对提案进行投票支持，最终，支持权益最多的提案将被提升为全民公投。

### 2. 议会提案

理事会可以创建 "事会商议"(council motions)，也称为"外部提案"。他们可以使用三种方法提交提案的初始哈希，

- `democracy.externalPropose()`
- `democracy.externalProposeMajority()`
- `democracy.externalProposeDefault()`

我们将在 [投票阶段](#voting-phase)中介绍的投票阈值的差异。

理事会可以在内部对提案进行投票，每位理事会成员投一票，如果通过，提案将移至 `外部提案队列`，等待该期限结束并自动升级为全民投票。我们每次只提交一个提案，以避免两个相反的提案同时通过的情况。

在此期间，技术委员会可以使用 `democracy.externalPropose()`或 `democracy.externalProposeDefault()` extrinsics 对提出的任何提案取消。

## 投票阶段

在投票期开始时，公投已经从外部提案队列或公共提案队列产生。现在，代币持有者有机会对公投进行投票，`赞成` 或`反对` 。

公投通过所需的通过阈值取决于用于投票率，并根据使用称为 ****Adaptive Quorum Biasing**** 的方法所定义的选民投票率而有所不同。这个想法是预计在实践中选民投票率不是“100%”，并且不同的提案将具有不同程度的争议性和可信度。

如果应用****正投票率偏差****，则在投票率较低时需要一个超多数阈值 *_通过_* *，*并且该阈值随着投票率的增加而降低。另一方面，应用**负投票率偏差**意味着在投票率较低时需要绝大多数来否决，并且阈值随着投票率的增加而增加。在所有情况下，这些偏差都会起作用，因此如果总质押的`51%` 投向一个方向（简单多数），则执行该选择。

现在让我们看看的不同投票率偏差情况：

| 提案情况                 | 投票偏差               | 低投票率行为            |

|---------------------------|-------------------------|---------------------------------|

| `外部提议`         | `无` 偏差               | 简单的 `50% + 1`         |

| 公开提案           | `正的` 投票率偏差 | 通过的起始阈值 `高` |

| `externalProposeMajority` | `正的` 投票率偏差 | 通过的起始阈值 `高` |

| `externalProposeDefault`  | `负的` 投票率偏差 | 通过的起始阈值 `低`  |

让我们考虑一个由`democracy.externalProposeDefault()`生成的外部提案的示例。

查阅上表，我们看到这个外部因素应用了负投票率偏差。换句话说，通过的门槛很低，但随着投票率的增加而增加。

例如，在`25%`投票率时，它需要`34%` 赞成可以通过，在`75%` 投票率时，它需要 `46%` 赞成才能通过。

随着投票率的增加，通过投票率接近`50% + 1` 的简单多数变得更加困难。

在投票期间，技术委员会可使用 `democracy.externalPropose()` 或 `democracy.externalProposeDefault()` 加速 extrinsics 创建的外部提案。理事会也有权取消公投。

##生效期

一旦公投通过，平行链会使用`pallet_scheduler`自动实现公投提案。 在正式实施开始之前有一个冷静期，以便利益相关者可以做好准备。

与前几个阶段一样，技术委员会可以使用`democracy.externalPropose()` 或 `democracy.externalProposeDefault()`加速提案的冷静期。

##国库

国库是由议会控制的预留代币，用于资助社区项目。 国库的目标是用于激励社区项目。 任何人都可以提交总支出当前国库`1%` 金额的支出提案，该提案可以被议会批准或拒绝。

国库中的资金通过以下方式产生：

1. ****交易费用****: `40%` 的链上交易费用转入国库。

2. ******国库裁减******: 当一个资金支出提案没有通过时，存款金额（提案总额的`1%` ）被“削减”，这意味着它被转移到国库。

3. ****民主裁减****: 当任何民主提案被取消时，押金将转入国库，而不是退还。

## API参考

函数命名规范遵循 Substrate 调用方法，`[pallet].[extrinsic]`

| Extrinsic                                         | Who can invoke       |
|---------------------------------------------------|----------------------|
| `democracy.propose(preImageHash)`                 | Public Token Holders |
| `democracy.externalPropose(preImageHash)`         | Council              |
| `democracy.externalProposeDefault(preImageHash)`  | Council              |
| `democracy.externalProposeMajority(preImageHash)` | Council              |
| `democracy.emergencyCancel(index)`                | Technical Committee  |
| `democracy.fastTrack(proposalHash)`               | Technical Committee  |
| `democracy.vetoExternal(proposalHash)`            | Technical Committee  |
| `democracy.cancelProposal(index)`                 | Technical Committee  |
| `treasury.approveSpend(index)`                    | Council              |
| `treasury.rejectSpend(index)`                     | Council              |
| `treasury.proposeSpend()`                         | Treasury             |
| `councilMembership.add()`                         | Council              |
| `councilMembership.remove()`                      | Council              |
| `councilMembership.swap()`                        | Council              |