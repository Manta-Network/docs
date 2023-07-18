# Hardhat
Deploying Smart Contracts using Hardhat

## What is Hardhat?
Hardhat is a development environment for Ethereum that helps developers manage and automate the common tasks involved in building smart contracts and decentralized applications. It can directly interact with Manta Pacific's Ethereum API, allowing for the deployment of smart contracts into the Manta Pacific network. Additionally, Hardhat is a comprehensive set of tools for creating Ethereum-based software, which includes various components that aid in editing, compiling, debugging, and deploying smart contracts and decentralized applications. All of these components work together to create a complete development environment.

## Creating a Hardhat Project
1. Create a directory for your project
``` bash
mkdir hardhat && cd hardhat
```
2. Initialize the project which will create a package.json file
``` bash
npm init -y
```
3.Install Hardhat
``` bash
npm install hardhat
```
4.Create a project
``` bash
npx hardhat
```
5.Create an empty hardhat.config.js and install the Ethers plugin to use the Ethers.js library to interact with the network.
``` bash
npm install @nomiclabs/hardhat-ethers ethers
```

## Creating your Smart Contract
1. Create a contracts directory
``` bash
mkdir contracts && cd contracts
```
2. Create your_contract.sol file in contracts directory
``` bash
touch your_contract.sol
```

## Creating your Configuration File
Modify the Hardhat configuration file and create a secure file to store your private key in.
1. Create a secrets.json file to store your private key
``` bash
touch secrets.json
```
2. Add your private key to secrets.json
``` json
{
    "privateKey": "YOUR-PRIVATE-KEY-HERE"
}
```
3. Add the file to your project's .gitignore, and never reveal your private key.
4. Modify the hardhat.config.js file
- Import the Ethers plugin
- Import the secrets.json file
- Inside the module.exports add the Manta Pacific network configuration

``` js
//hardhat.config.js

require('@nomiclabs/hardhat-ethers');
const { privateKey } = require('./secrets.json');

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey]
    },
    caldera: {
      url: "RPC URL",  // Insert your RPC URL Here
      chainId: CHAINID, //Insert your ChainID Here
    }
  },
}
```

## Deploying your Smart Contract
1. Compile the contract
``` bash
npx hardhat compilejs
```
2. Create a new directory for the script and name it scripts and add a new file to it called deploy.js
``` bash
mkdir scripts && cd scripts
touch deploy.js
```
3. Create a deployment script, like the one below
``` js
// scripts/deploy.js
async function main() {
   // 1. Get the contract to deploy
   const Your_Contract = await ethers.getContractFactory('your_contract');
   console.log('Deploying Your_Contract...');

   // 2. Instantiating a new smart contract
   const your_contract = await Your_Contract.deploy();

   // 3. Waiting for the deployment to resolve
   await your_contract.deployed();

   // 4. Use the contract instance to get the contract address
   console.log('Your_Contract deployed to:', your_contract.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
```

4. Deploy your_contract.sol using the command below
``` bash
npx hardhat run scripts/deploy.js --network caldera
```