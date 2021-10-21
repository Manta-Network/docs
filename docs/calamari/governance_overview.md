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
can't implement or remove any features without community consent. For an 
overview of the currenlty approved roadmap of feature development, see here: 
[TODO: link]

If you're looking for a more technical deep dive into the Governance protocols,
please see the Governance Deep Dive doc. TODO: hyperlink

## Intro

At a high level, changes to Calamari follow three steps:
- **Launch Period:** Token holders submit proposals that turn into referendums.
- **Voting Period:** Token holders vote on referendums.
- **Enactment Period:** Successful referendums are automatically enacted.

There are three key actors in this system:
- **Public token holders:** This is you!
- **The Council:** Tepresent passive token holders.
- **Technical Committee:** Selected to handle emergencies.

## Launch Period
Changes to the Calamari system start out as a **proposal**. Token holders 
or the Council submit the [preimage hash of a proposal](TODO: link to deep dive) to the proposal queue. 
Other token holders can then second the proposal with their stake, and at 
the end of a Launch Period the proposal with the most backing stake is promoted
to a **referendum**. We only promote one proposal at a time to avoid the 
situation where two opposing proposals pass simultaneously.

Right now, only the council can submit new proposals. The method they use 
is called `democracy.externalProposeDefault`, and it will be available to
all token holders in upcoming releases. 


## Voting Period
All token holders get to vote aye or nay on referendums. The percent of ayes required
for a referrendum to pass changes based on turnout. If there's low turnout, the 
threshold to pass is lower, and as turnout increases, the threshold increases. 
For example, if the turnout is 25%, then 34% ayes are needed to pass. But if the 
turnout is 100%, then 51% of ayes are needed (a simple majority). 

This approach to voting is called "Adaptive Quorum Biasing". The idea behind it is
... TODO

## Enactment Period
Once a referendum passes, it is automatically implemented by the chain according to 
the referendum code. There's a delay before the implementation starts so that
stake holders can prepare for the change. 

### A note on the responsibilities of the Council and Technical Committee
The Technical Committee can fast-track the launch period, voting period, and enactment
period in the case of an emergency. How much the periods are shortened depends 
on how many committee members believe the action is necessary, with unanimous 
agreement required for instantaneous changes. 

The Council can cancel a referendum during the voting period. TODO: any other 
of these sorts of actions that the council can do?

Clearly the Council and the Technical Committe have a lot of influence over
what proposals and referrendums get passed! The idea here is that ... TODO

## How To: Vote on a Referendum
TODO: include screenshots

## How To: ...
TODO: any other features available to public token holders

## Questions:
TODO: What is Conviction Voting? Is it in play with this update?


