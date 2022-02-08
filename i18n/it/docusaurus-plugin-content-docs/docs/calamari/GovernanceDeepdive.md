# Governance Deep Dive

This doc is a more technical dive into how governance on Calamari operates.
Calamari is built on Polkadot and Substrate; the governance system is 
directly inspired by what Polkadot uses. One of the main differences is that 
our Council manages its own membership.

_Note: not everything documented here is released yet. Check our 
[roadmap](https://emphasized-seed-161.notion.site/3b1b61e0aee8484396d674f4653e0813?v=451a4ad2105d4f9cb35fb74680359c1d)
for the up to date status of features._

## Concepts to know

If you're reading this doc we're assuming you know what an 
[extrinsic](https://docs.substrate.io/v3/concepts/extrinsics/) is, and that 
you're generally familiar with 
[how Substrate runtimes work](https://docs.substrate.io/v3/concepts/runtime/).

## System Actors

There are three kinds of actors that can participate in governance 
on Calamari: _Public Token Holders, the _Council_, and the _Technical Committee_.
They all have a different set of extrinsics they are allowed to submit to the chain.

The **Public Token Holders** are everyone who owns a Calamari token. They can use 
their stake to second proposals that are trying to become referendums, and 
vote on referendums, proportional to the amount of stake they have.

The **Council** represents passive token holders and exists because democratic
systems usually have issues with low voter turnout. There are three council
members, and their responsibility is to submit common sense proposals for the
regular development and maintenance of the system. In our case, the Council is
also responsible for bootstrapping the Manta Network and is thus made up of
members of the Manta Core Development Team. The Council manages the membership
of the Technical Committee.

The **Technical Committee** is responsible for handling emergencies. They
have the ability to fast track all three periods, and how much the periods 
are shortened depends on how many committee members believe the action is necessary. 
Unanimous agreement is required for instantaneous changes. There are three
technical committee members, and they are also part of the Manta Core
Development Team.

## Launch Phase

The process of submitting a proposal starts out by getting the preimage hash
of the proposal, in order to verify that it doesn't change at any point during
the process. 

There are two ways to submit a proposal, and the launch periods alternate 
between the two methods.

### 1. Public token holder proposals

Public token holders can submit a preimage hash using the 
`democracy.externalProposeDefault()` extrinsic. These proposals all go 
into the `public proposal queue`. Then stakeholders can second proposals,
and the proposal with the most stake backing it at the end of the period
is promoted to a referendum.

### 2. Council motions

The council can create "council motions" also called "external proposals".
They can submit the preimage hash using three methods,

* `democracy.externalPropose()`
* `democracy.externalProposeMajority()`
* `democracy.externalProposeDefault()`

which have differences in voting thresholds that we'll cover in the [Voting Phase](#voting-phase) 
section below. The council votes on the proposal internally, with one vote per 
council member, and if it passes, the proposal moves to the `external propose queue` 
where it waits for the end of the period and is automatically promoted to a referendum.

We only promote one proposal at a time to avoid the situation where two opposing 
proposals pass simultaneously. 

During this period, the Technical Committee has the ability to cancel any proposal
and fast track proposals made using the `democracy.externalPropose()` or 
`democracy.externalProposeDefault()` extrinsics.

## Voting Phase

At the start of the Voting Period a referendum has been tabled either from the
external proposal queue or the public proposal queue. Now token holders have 
the opportunity to vote on the referendum with an `aye` to pass or `nay` to 
reject.

The percent of ayes needed for a referendum to pass depends on the extrinsic 
used to submit the proposal, and varies based on voter turnout using a method 
called **Adaptive Quorum Biasing**. The idea is to anticipate that in practice
voter turnout is not `100%`, and that different proposals will have varying 
levels of contentiousness and trustworthiness.

If a **positive turnout bias** is applied, then a super-majority threshold is
required to _pass_ at low levels of turnout, and the threshold decreases as 
turnout increases. On the other hand applying a **negative turnout bias** means
that a super majority is needed to _reject_ at low levels of turnout, and the 
threshold increases as turnout increases. In all cases these biasings work out
so that if `51%` of the total stake votes in one direction (a simple majority), 
then that choice is executed.

Now let's look at the different biases that are applied to the different extrinsics:

| Extrinsic                 | Vote Bias               | Low turnout behavior            |
|---------------------------|-------------------------|---------------------------------|
| `externalPropose`         | `no` bias               | always simple `50% + 1`         |
| public proposal           | `positive` turnout bias | threshold to pass starts `high` |
| `externalProposeMajority` | `positive` turnout bias | threshold to pass starts `high` |
| `externalProposeDefault`  | `negative` turnout bias | threshold to pass starts `low`  |

Let's consider an example of an external proposal generated by `democracy.externalProposeDefault()`.
Consulting the table above we see that this extrinsic has a negative turnout bias applied. 
In other words, the threshold for passing starts low and increases as turnout increases. 
For example, at `25%` turnout it needs `34%` ayes to pass, at `75%` turnout it needs `46%` ayes to pass. 
As turnout increases, it becomes harder to pass approaching simple-majority of `50% + 1` of the turnout.

During the Voting Period the Technical Committee can fast-track external proposals created using 
the `democracy.externalPropose()` or `democracy.externalProposeDefault()` extrinsics. 
The Council also has the ability to cancel a referendum.

## Enactment Phase

Once a referendum passes, the chain automatically implements the referendum code 
using the `pallet_scheduler`. There's a delay before the implementation starts so that
stake holders can prepare for the change.

As with the previous periods, the Technical Committee can fast-track the delay on 
external proposals created using the `democracy.externalPropose()` or 
`democracy.externalProposeDefault()`.

## The Treasury

The Treasury is a reserve of tokens that is controlled by the Council and 
used to fund community projects. The goal of the Treasury is to have a source of funds 
that can incentivize projects on the network. Anyone can submit a treasury 
spend proposal with a `1%` deposit of the total spend amount, and the proposal 
will be approved or denied by the council. 

The funds in the treasury are collected through:

1. **Transaction fees**: `100%` of on-chain transaction fees are transferred to the Treasury.
2. **Treasury slashing**: when a treasury spend proposal doesn't pass, the 
deposit amount (`1%` of the total proposed amount) is "slashed", which means
that it is transferred to the Treasury. 
3. **Democracy slashing**: when any democracy proposal is canceled the
preimage deposit fee is transferred to the Treasury instead of being returned.

## API Reference

The naming of functions here follows the Substrate invocation method, `[pallet].[extrinsic]`.

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

