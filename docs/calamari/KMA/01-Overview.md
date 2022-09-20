# Overview

KMA is the first community-driven deflationary native token of Calamari Network, the Kusama-deployed canary-net of Manta Network. At genesis in Nov 2021 an initial supply of 10 billion KMA tokens was created. Around 24% of this supply was distributed to crowdloan participants as part of the rewards for helping Calamari Network secure the first parachain slot. Furthermore, KMA does not have any private sales or team tokens.

The KMA token has multiple uses on Calamari Network:
1. Every transaction on Calamari (including MantaPay on Calamari) collects a Network Usage Fee in the form of KMA token. This network fee is split three ways:
    - 45% will be burned.  
    - 45% is sent to the treasury to fund future parachain slot auctions and community expenses like a development fund.
    - 10% is distributed to the collator who produced the block containing this transaction.
2. The KMA token serves as a medium of exchange.
3. The KMA token represents governance rights on Calamari.
4. MantaPay on Calamari public-to-private and vice versa transactions will not charge any additional premium for now. 
5. For the first 3 years after launch of staking, 3% of total KMA issuance will be distributed per year as staking rewards to incentivize decentralization.
KMA distributed are created through minting of new KMA. All newly minted KMA will periodically be burned from the treasury to compensate for this inflation. After 3 years, the Calamari community will decide on further incentives.

:::note
1. and 5. become active with the launch of Staking on Calamari Network ( Runtime v3.4.0 ) and 4. with the launch of MantaPay on Calamari
:::

## Disclaimer

The content contained in this website does not constitute an offer or sale of securities in or into the United States, or to or for the account or benefit of U.S. persons, or in any other jurisdictions where it is unlawful to do so.

Transfer of KMA tokens may be subject to legal restrictions under applicable laws. Under no circumstances shall KMA tokens be reoffered, resold or transferred within the United States or to, or for the account or benefit of, U.S. persons, except pursuant to an exemption from, or in a transaction not subject to, the registration requirements of the U.S. Securities Act of 1933, as amended. Any public offering of the KMA tokens to be made in the United States will be made by means of a prospectus that may be obtained from the issuer or the selling token holder and that will contain detailed information about the company and management, as well as financial statements.

# Technical Overview

| Property            | Value              | Remark                                    |
|---------------------|--------------------|-------------------------------------------|
| Token Name          | `Calamari`         |                                           |
| Token Symbol        | `KMA`              |                                           |
| Total Supply        | 10,000,000,000 KMA | 10 Billion KMA                            |
| Decimals            | 12                 | 1 KMA = 1,000,000,000,000 basic units     |
| Existential Deposit | 0.1 KMA            | minimal balance to keep the account alive |

The **Existential Deposit** is the minimal amount that a user needs to hold in order to keep the account active. For example, if Bob creates an account with zero balance, by default, the account will not appear in the ledger state. Now, if Alice sends Bob no less than `0.1 KMA`, then Bob's balance will be added to `pallet_balances` as part of ledger state. However, if Alice tried to send Bob less than `0.1 KMA`, the transaction would be rejected since if ledger the accepted the transaction, Bob will have a `KMA` balance less than `0.1`, which will violate the *existential deposit* requirement. Similarly, Alice cannot transfer out her balance such that she has less than `0.1 KMA` left. She can either choose to leave more than `0.1 KMA` or send all the remaining balances and remove the account from the ledger state. 