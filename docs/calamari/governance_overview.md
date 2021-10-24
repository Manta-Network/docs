---
sidebar_position: 3
title: Governance Overview
---


_Note: Calamari is just beginning to implement Governance features, so a lot 
of the planned features aren't available yet. This doc describes what is 
currently available, and will be updated as features are released._

Welcome to our Governance docs! Here you'll find a high level overview of
how token holders make decisions about how the Calamari system is updated.
As a decentralized system, it's crucial that the Manta Network core development 
can't implement or remove any features without community consent. The roadmap 
of planned feature development lives [here](https://squadgame.manta.network/event-details). 

The [Calamari Governance Deep Dive doc](./governance_deep_dive)
is a great resource if you're looking for more of the technical details about 
show Calamari governance works.

## Intro
At a high level, changes to Calamari follow three steps:
- **Launch Period:** Token holders submit proposals that turn into referendums.
- **Voting Period:** Token holders vote on referendums.
- **Enactment Period:** Successful referendums are automatically enacted.

There are three key actors in this system:
- **Public token holders:** This is you!
- **The Council:** Represents passive token holders.
- **Technical Committee:** Handles emergencies.

## 1) Launch Period
Changes to the Calamari system start out as a **proposal**. Token holders 
or the Council submit the [preimage hash of a proposal](https://wiki.polkadot.network/docs/maintain-guides-democracy#proposing-an-action) 
to the proposal queue. Other token holders can then second the proposal with 
their stake, and at the end of a Launch Period the proposal with the most 
backing stake is promoted to a **referendum**. We only promote one proposal 
at a time to avoid the situation where two opposing proposals pass simultaneously.

Right now, only the council can submit new proposals. The method they use 
is called `democracy.externalProposeDefault`, and it will be available to
all token holders in upcoming releases. 


## 2) Voting Period
All token holders get to vote aye or nay on referendums. The percent of ayes required
for a referrendum to pass changes based on turnout. The method `democracy.externalProposeDefault`
has a "negative turnout bias", meaning if there's low turnout, the 
threshold to pass is lower, and as turnout increases, the threshold increases. 
For example, if the turnout is 25%, then 34% ayes are needed to pass. But if the 
turnout is 100%, then 51% of ayes are needed (a simple majority). 

This approach to voting is called [Adaptive Quorum Biasing](https://wiki.polkadot.network/docs/learn-governance#adaptive-quorum-biasing). 
The idea behind it is to anticipate that voter turnout in practice is
never going to be 100%, and that different proposals will have varying levels of 
contientiousness and trustworthiness. For example, we assume that a proposal 
submittes by the Council is more trust worthy than a proposal from any public 
token holder, so we want to apply a negative turnout bias to the vote.

## 3) Enactment Period
Once a referendum passes, it is automatically implemented by the chain according to 
the referendum code. There's a delay before the implementation starts so that
stake holders can prepare for the change. 

### A note on the responsibilities of the Council and Technical Committee
The Technical Committee can fast-track the launch period, voting period, and enactment
period in the case of an emergency. How much the periods are shortened depends 
on how many committee members believe the action is necessary, with unanimous 
agreement required for instantaneous changes. Similarly, the Council can cancel 
a referendum during the voting period.

Clearly the Council and the Technical Committe have a lot of influence over
what proposals and referrendums get passed! The Council offsets the usual low 
voter turnout in democratic systems, and is expected to submit proposals for 
regular operations and maintenance of the system. The Technical Committe exists
to handle emergency situations where fast technical updates are needed.

## How To: Vote on a Referendum
The actions you can take as a public token holder can all be executed by connecting 
to a Calamari node using the [Polkadot.JS apps interface](https://polkadot.js.org/apps/).
Polkadot has a lot of [nice vidoe tutorials](https://wiki.polkadot.network/docs/learn-video-tutorials#getting-started) 
on how to use the Apps UI.

Screenshots coming soon!

## More Resources
If you'd like to learn more about governance in the Polkadot ecosystem, these links 
are a great place to start:
- [Calamari Governance Deep Dive](./governance_deep_dive)
- [Polkadot docs](https://wiki.polkadot.network/docs/learn-governance) 
- [Polkadot blog on governance systems](https://polkadot.network/blog/polkadot-governance/)
- [Polkadot blog on the governance of the Kusama rollout](https://polkadot.network/blog/kusama-rollout-and-governance/)
- [Polkadot wiki "Participate in Democracy"](https://wiki.polkadot.network/docs/maintain-guides-democracy)


