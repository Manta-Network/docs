## Deploy the contract of ERC20 Token on Ethereum to Manta Pacific

> [!TIP]
> If you want to deploy Ethereum Token on Manta Pacific, <b>it's recommended to contact the Manta Team to deploy the token contract</b>.
> Canonical Bridge only supports Ethereum’s ERC20 Token, If the token is from another chain/protocol, please consider using a third-party bridge.

Repo Link: [standard-bridge-custom-token](https://github.com/Manta-Network/bridging-tutorial/tree/main/standard-bridge-custom-token)

> [!IMPORTANT]  
> The Canonical Bridge <strong>does not</strong> support <a href="https://github.com/d-xo/weird-erc20#fee-on-transfer" target="_blank" rel="noreferrer"><strong>fee on transfer tokens</strong></a> or <a href="https://github.com/d-xo/weird-erc20#balance-modifications-outside-of-transfers-rebasingairdrops" target="_blank" rel="noreferrer"><strong>rebasing tokens</strong></a> because these types of tokens may cause bridge accounting errors.

#### Steps to Deploy Token

1. `cd ./standard-bridge-custom-token`

2. Add `.env` file
   
   ```properties
   PRIVATE_KEY=
   DEPLOY_TOKEN_NAME=
   ```

3. Add new token in `config.js`, no need to fill `l2TokenAddress`
   
   ```js
   {
     tokenSymbol: {
       name: "Token Name",
       symbol: "Symbol",
       decimals: 18,
       l1TokenAddress: "Token Address on Ethereum",
       l2TokenAddress: "",
     }
   }
   ```

4. Update `.env` file, and update DEPLOY_TOKEN_NAME=`tokenSymbol`

5. Deploy Contract
   
   ```sh
   npx hardhat run scripts/deploy.js --network manta-mainnet
   ```

6. Update `l2TokenAddress` in console to `config.js`

7. Submit PR
