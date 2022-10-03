# KMA Staking Guide

## Important information to know before we get started
- Minimum delegation stake - 5000 KMA.
- Maximum delegators per collator - 100.
- Round duration - 6 hours.
- Delay from reward accrual to reward payout - 2 rounds.
- Unbond duration - 7 days.
- Rewards for each round are distributed amongst the largest 100 delegators for a particular collator 2 rounds later.
- Rewards are not compounded.
- You can delegate up to 25 collators, dividing your stake amongst your selection.
- The less total stake your active collator has, the higher your return as a delegator.
- There is (currently) no slashing.

## Whitelist program for early collator runners ( throughout the rest of 2022 )
We believe this is a good solution to recognize your early service to the Calamari Network community and initial support during the crowdloans. It allows everyone who’s been with us for the year to accumulate a large part of the missing KMA to continue collating for Calamari during the early low-competition days of staking over the October through December period of 2022 without creating an unfair advantage for other players.

- We will freeze the set of collators to the current participants (as of today) until staking launches.
- New collators will then join the set at 4,000,000 KMA minimum bond.
- Current collators will be allowed to join the staking set ***once*** at the previous 400,000 minimum bond through the rest of 2022.
    - If you leave the set of collators for any reason, you will need 4,000,000 KMA to rejoin.
    - Early 2023 will see a runtime upgrade or governance motion that disables this mechanism AND will forcibly off-board any collator in the set below 4,000,000 KMA self-bond.
    - If staking becomes so popular that your nodes will be outcompeted before the end of 2022, we will not intervene in your favor.
- We ( or either one of you for that matter, we’d like to encourage you to make your case before the community yourselves ) *may* ask the Calamari community to launch a program to support decentralization of the network by helping collators running on bare-metal hardware stay competitive with larger cloud players.
- In addition to the above monetary rewards, you’ll also be eligible for future NFT and swag drops.

If you’re curious what “a large part” means above, we ran some simulations below.
The following estimations are informational content only and not to be taken as financial or investing advice.

These numbers represent the staking reward, which is *independent* of the network usage, so unlike TX fees ( which go on top of this listed APY ), which are fairly low in the beginning, this reward is likely highest on day 1 - which is when you’ll be able to participate.

TODO: Normal staking rewards APY in here

 ### Single Whitelisted Collator KMA gained after 3 months:

| Collators Total | 0 KMA delegated | 1M KMA delegated to each collator | 5M KMA delegated to each collator | 10M KMA delegated to each collator |
| --- | --- | --- | --- | --- |
| 33 | 2,272,727 | 811,688 | 378,788 | 305,944 |
| 63 | 1,190,476 | 425,170 | 198,413 | 160,256 |

### Annualized 3-month Return-on-Investment:

| Collators Total | 0 KMA delegated | 1M KMA delegated to each collator | 5M KMA delegated to each collator | 10M KMA delegated to each collator |
| --- | --- | --- | --- | --- |
| 33 | 2272.73% | 811.69% | 378.79% | 305.94% |
| 63 | 1190.48% | 425.17% | 198.41% | 160.26% |

<!-- 
TODO: Support early collators:
1. Whitelist for current community collators (around 28 collators)
2. Keep the bonding as 400k KMA for the first three months of staking launch. 
3. If early collators drop the collators during the three months, or they have less staking KMA than new collators, they will get out of the whitelist.
4. After three months, if early collators have collected enough KMA, they will keep running the collator if they have enough bond, otherwise they can quit the program. 
5. Giant Squid Program, to give away NFTs and other physical gifts to the collators
6. 25% transaction fees will goes to collators

TODO: Collator information:

1. Community Collator Program
2. How to apply to run a Calamari collator (need to update the requirements based on tokenomics)
3. Setup and run a Collator
4. Leaving the collator program
5. FAQ (new)
-->