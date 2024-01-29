# Cookbook.dev

## What is Cookbook.dev?

Cookbook.dev is an open-source smart contract registry where developers can find solidity primitives, libraries, and smart contracts for protocols across dozens of blockchains, including Manta Pacific. 

In this tutorial, we'll walk through searching for or importing a protocol or smart contract on Cookbook.dev and deploying it to Manta Pacific using Cookbook.dev's no-code deploy and using Cookbook with Remix, Hardhat and Foundry.

## Getting Started with Cookbook.dev

Navigate to [cookbook.dev/chains/Manta-Pacific](https://www.cookbook.dev/chains/Manta-Pacific?utm=mantadocs) and explore **Protocols** on Manta Pacific, or search for specific smart contracts or keywords in the search bar or **Contracts** menu tab. 

To learn about a smart contract on Cookbook.dev, select the protocol, and select `Expand`. This opens the code alongside ChefGPT, Cookbook.dev's AI Solidity assistant. 

Highlight selections of the code and press **Analyze Snippet** to get more information about the smart contract code you're looking at, or ask ChefGPT questions about Manta Pacific, Solidity, or your smart contract.

### Import any Smart Contract Code into Cookbook.dev

Import verified smart contract code into Cookbook to fork, learn about, or build with by inputting any smart contract address that's verified on an EVM-based block explorer into the Cookbook.dev search bar.  

## Deploy your Smart Code code to Manta Pacific using Cookbook.dev and Remix

### Method #1 - Using the Cookbook.dev website with open in Remix

On a smart contract or protocol page in Cookbook, select the **Open in Remix** option. Your smart contract will automatically be opened in a new Remix workspace.

**Compile** your smart contract within Remix. Most contracts opened with Cookbook will automatically compile within Remix. 

Once compiled, **deploy** the smart contract in Remix. 

To deploy the smart contract to Manta Pacific Network, make sure your wallet is set to the Manta Pacific mainnnet or testnet and then connect to Remix by selecting injected provider - Metamask Wallet in the **environments** tab within the **deploy** screen. 

Once deployed, we can interact with our smart contract within Remix.

### Method #2 - Using the Cookbook Remix Plug-in within the Remix IDE

Go to [Remix.Ethereum.org](https://remix.ethereum.org)

Add The Cookbook Plugin to Remix by clicking the Chef Hat Logo under **Featured Plugins** on the Remix Homepage.

Alternatively, search Cookbook and select **Activate** in the Remix Plugin Manager. 

Search for any protocol or smart contract and click the search result to import the smart contract code into Remix.

Cookbook's AI solidity co-pilot, ChefGPT, is available within the Remix plugin to answer questions about Manta Pacific, Solidity, or the smart contract you're working with.

Compile and deploy the smart contract as described in **Method 1** above. 

## Deploy your Smart Code code to Manta Pacific using Cookbook.dev and Hardhat

After finding the smart contract or protocol you want to work with in [Cookbook](https://www.cookbook.dev/?utm=mantadocs), select the **Download Source** option and select **Hardhat** to download the contract boilerplate. For this guide, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token?utm=mantadocs).

To install the required packages and dependencies, run
```
npm install
```
To compile your smart contract, run 
```
npx hardhat compile
``` 
Add arguments to the `constructorArgs` array in the `deploy.js` file in the `scripts` folder and save.  If you do not need any arguments please leave the array empty.

In your .env.example file, add your Manta Pacifc RPC API key and add your wallet private key. Afterward change the name of the file to .env and create a gitignore to ignore your .env file.

Add the following code to your hardhat.config.js file. Be sure to change your RPC URL and the ChainID to match either mainnet or testnet

```
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey]
    },
    manta: {
      url: "RPC URL",  // Insert your RPC URL Here
      chainId: CHAINID, //Insert your ChainID Here
    }
  },
}
```

To deploy your smart contract to the Manta Pacific Network, run

```
npx hardhat run --network (manta) scripts/deploy.js

```

## Deploy your Smart Code code to Manta Pacific using Cookbook.dev and Foundry

After finding the smart contract or protocol you want to work with in [Cookbook](https://www.cookbook.dev/chains/Manta-Pacific?utm=mantadocs), select the **Download Source** option and select **Foundry** to download the contract boilerplate.For this guide, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token?utm=mantadocs).

Before you can use Foundry, you need to install Rust, a programming language required to run Foundry. Follow the installation instructions provided [here](https://doc.rust-lang.org/book/ch01-01-installation.html).

Once Rust is installed, you can install Foundry. Follow the installation instructions provided [here](https://book.getfoundry.sh/getting-started/installation#using-foundryup).


To build your contracts, Run
```sh
forge build
```

If you encounter a "stack too deep" error, try running the following command instead

```sh
forge build --via
```

In the scripts folder, uncomment all the code in the `contract.s.sol` file. Replace `"ARG1"`, `"ARG2"`, `2000` with your `Token Name`, `Token Symbol` and desired `Token Quantity` where you see the code below
```
FixedToken _contract = new FixedToken("ARG1", "ARG2", 2000);
```

Before deploying your contracts, populate the `.env` file with your Manta Pacific Network RPC URL, followed by your Wallet private key and your [Etherscan API key token values](https://etherscan.io/apis). Then, run the following command to define your environment variables globally

```
source .env
```

Deploy your contracts with the following command

```
forge script script/contract.s.sol:ContractScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
```

Your contract will be verified on the Manta Pacific block explorer automatically upon deployment.

**Further Guidance**

For more information on using Cookbook to find, learn about or build with smart contracts, check out the following resources:

- [Documentation](https://docs.cookbook.dev/)
- [Blog](https://medium.com/@cookbookdev)
- [Twitter](https://twitter.com/cookbook_dev)
- [Community](https://discord.gg/cookbook)
