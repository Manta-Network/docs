# Tokenomics

## Inflationary Pressure
- (starting with Manta v3.4.0) Inflationary staking rewards of **3% of total issuance per year**

## Deflationary Pressure
- (starting with Manta v3.4.0) 45% of all transaction fees is burned
- (if wanted, currently inactive) a *privacy premium* imposed on privatization of assets by the network that is burned

:::note
For the first 3 years of staking, the 3% annual inflation is negated by burning an equivalent amount of tokens from the treasury.

This makes KMA **strictly deflationary**.

After 3 years have passed, the community will decide how to continue incentivizing collators and stakers, for example by making KMA a Dynamic Inflation/Deflation model where inflation from staking rewards is countered by deflation from Network Usage Fee burn.
:::

## Token Utility
### 1. Network Usage Fee

As a network with privacy-preserving use cases, any crypto assets transactions or any contract/pallet executions need to charge a usage fee from users. The network charges the usage fee (gas fee) for both computation cost and storage cost on chain (including the computation cost spent on verifying zero-knowledge proofs). The Calamari Network collects these fees.

- **45%** of the network usage fees are burned. Higher network usage will increase the real yield for stakers and collator runners, as inflation from collation/staking rewards is countered by this token burn and can result in KMA becoming deflationary.
- **45%** is distributed to the treasury, which will be allocated by governance to incentives network development and future parachain auction.
- **10%** is distributed to the collator who produced the block containing this transaction

### 2. Medium of Exchange

KMA is the native currency of Calamari Network, it can be used to transfer value publicly and privately (among [zkAddresses](https://mantanetwork.medium.com/introducing-zkassets-and-zkaddresses-7b7a8e3e2af3)) across the Calamari Network. KMA can be transferred peer-to-peer or through interaction with contracts/pallets on the network without the need of trusting any third parties.

### 3. Governance Rights

The on-chain governance mechanism deciding on the future of the Calamari network uses KMA as voting weight and for proposing referenda, electing council members etc.

### 4. Privacy Premium

Transactions to privatize and de-privatize/redeem a token will initially only be charged the gas fee of the transaction. Calamari Governance may decide in the future to levy a “privacy premium” on these transactions to allow KMA stakers to benefit from network usage. For example, the KMA community could decide to impose a privacy premium of 0.1% which would be used to automatically repurchase and burn KMA.

### 5. Network Security

The main purpose of a collator is to bundle transactions into blocks and support block liveness on the network. From there, collators offer up blocks to validators on the relay chain for finalization. KMA token will be used to incentivize a robust network of collators and create a privacy-preserving decentralized network. For this purpose, the network will pay an annual 3% of total issuance to stakers for the first 3 years after launch of the staking model through newly minted KMA.

9% of initial total supply is allocated to be burned from the treasury to counter this inflation for the first 3 years. After that, the community can decide how to continue incentivizing collators and stakers, for example by making KMA a **Dynamic Inflation/Deflation** model where inflation from staking rewards is countered by deflation from Network Usage Fee burn.
