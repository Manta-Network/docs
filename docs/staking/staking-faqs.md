# FAQs

## How do I stake my MANTA tokens?

Start by navigating to the [staking dashboard](#placeholder), and then choose an active operator of your choice. Follow our [step-by-step guide](./staking-howtos.md).

## How are staking rewards calculated?

Staking rewards are calculated differently for operators and token delegators.

- **Operators** earn rewards based on their contribution to the network through the submission of fast finality proofs. A fixed amount of $172,600$ MANTA is distributed every $3$ days, and the distribution is proportional to the number of proof submissions made by the operator during this period. Additionally, operators can choose set a commission rate, which denotes the portion of the rewards they will retain before distributing the remaining rewards to their respective delegators.
- **Delegators** receive rewards proportional to their staked amount in their chosen operator's vault. After the operator's commission is deducted, the remaining rewards are distributed among delegators based on their share of the total stake in that vault.

## Are staking rewards compounded?

No, your staking rewards will not be compounded automatically. Once you claim your rewards to your wallet, you can choose to delegate them manually to an operator. Check out the [How-to guides](./staking-howtos) for help.

## What's the minimum token amount I can delegate to an operator?

There is no lower limit on the token amount you can delegate to an operator.

## Is there an unbonding period for the staked tokens?

Yes. There is a *3 day waiting period* after you unstake your tokens before you can claim them on the [**My Stake**](#placeholder) page.

## Is slashing currently active on the staking layer?

Slashing is not active during the early stages of the staking layer. The operators that fail to contribute in the form of fast finality proofs will simply not receive any rewards.
