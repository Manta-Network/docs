# Overview

Manta Network's [NPO platform](https://npo-evm.manta.network) (NFT private offering platform) is set to revolutionize how users generate and mint zkNFTs/zkSBTs. NPO is an NFT/SBT launchpad that leverages Manta Network's zkAddress tooling and MantaPay ZK circuits to privately mint NFTs/SBTs on zkAddress, while using public tokens to pay for minting fees. With Manta's zkNFTs/zkSBTs, developers can build web3 or web2 applications without in-depth knowledge of cryptography or ZKP. The plug-and-play connection with zkNFTs/zkSBTs enables applications to be quickly developed on mobile, opening up new opportunities for developers to create zkNFT/zkSBT projects, including mobile applications, DApps, and projects based on NPO.

## General use cases of zkSBTs:

In general, zkSBT is a great private onchain data verification method, especially for mobile applications. Although some account abstraction/MPC wallets like Particle and Unipass bring a great seedless and gasless user experience for mobile apps, it’s still very hard to verify KYC info, credentials, game items, crypto assets that are not connected to these wallets in mobile. There are mainly four use cases for NPO:

1. Decentralized user friendly compliance: KYC is a $1.6 trillion market and has huge demand from both the web2 and web3 world; even in the fully decentralized dark forest, it's very important to know whether it's a real user or its a bot. For example, there are more than 300m addresses on BNB Chain while only 30m active users use Binance. How to identify the bots is a real issue. With zkBAB and zkGalxe, users can use their proof key to prove they are a KYCed real user without disclosing their identity information and without connecting their wallet. This product gives users an option to use existing KYC info at Binance or Galxe to verify their identity in Web2 and Web3 Apps. Currently [many apps already support](https://twitter.com/MantaNetwork/status/1661538809585221636?s=20) the zkSBT as a KYC tool.

2. Private credential for onchain activities campaigns: Onchain campaign platforms like Galxe and Cyberconnect have huge volume, but a lack of on-chain privacy–everyone can see the platform activities. Also, users have to approve the wallet everytime they verify their onchain credentials. Furthermore, it’s also limited to different chains for different credentials. Using zkSBT, the credentials can be verified with privacy. There is no need to connect a wallet to verify the onchain credentials with proof keys, and the credentials can be verified in a multichain or multiplatform manner.

3. zkSBT as Game/Social Items: A good example of it is Ultiverse and ReadON zkSBTs. These are able to launch on Manta and use in their mobile apps. These items users mint on Manta chain can also be used in other apps at the same time, but mainly are in their own apps that provide in-app utility without connecting a wallet.

4. Assets verification: This should be the most important and frequently used product for zkSBT. With [Pomp](https://twitter.com/AppPOMP) (Proof of my possession), users can generate zkSBTs to prove their certain token assets range (like 100+ Ethereum, 8-figure PEPE etc.) or they are a certain NFT holder like Milady NFT holder zkSBT. This will be needed like an onchain bank statement but with privacy. Also based on this information, there can be products like private degen score and private credit score system. This can be used in Web2/Web3 financial or membership user scenarios.

<br/>
   <div style={{textAlign: 'center'}}>
    <img alt="npo" src="/img/guides/npo/npo.png" width="70%"/>
   </div>
<br/>