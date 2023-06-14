# Consolidate UTXOs

## What is UTXO Consolidation?

UTXO, or Unspent Transaction Output, represents a transaction output that can be spent as input in a new transaction. UTXO consolidation is the process of taking multiple UTXOs and merging them into fewer or a single UTXO.

## How does UTXO Consolidation work?

In systems like MantaPay, users can transfer funds to themselves in a manner that merges smaller UTXOs into larger ones. This process effectively reduces the number of UTXOs to be included in future transactions, like publicizing transactions, making those transactions faster and less computationally expensive.

## When do you need UTXO Consolidation?

A large number of UTXOs linked to your account can slow down your transactions or even cause them to fail due to the computational complexity of generating multiple Zero-Knowledge Proofs (ZKPs). In such cases, UTXO consolidation is an effective way to speed up transactions and enhance efficiency.

## What factors affect the gas fee?

The number of UTXOs being consolidated significantly influences the gas fee. More UTXOs consolidated means higher gas fees due to the increased computational demands. Therefore, users should consider their gas fee budget when consolidating UTXOs.

## How to Consolidate UTXOs?

Here is a step-by-step guide to consolidating UTXOs in Manta wallet:

1. Click on the "Account" option in your Manta wallet.
   <div style={{textAlign: 'center'}}>
     <img alt="view-phrase" src="/img/guides/manta-wallet/utxo/step1.png" width="50%"/>
   </div>

2. Select the "Consolidate UTXOs" feature located within the Account.
   <div style={{textAlign: 'center'}}>
     <img alt="view-phrase" src="/img/guides/manta-wallet/utxo/step2.png" width="50%"/>
   </div>

3. Select the token and UTXOs that you wish to consolidate. And ensure that you have sufficient token in your Manta wallet's public address to cover the gas fees for this operation.
   <div style={{textAlign: 'center'}}>
     <img alt="view-phrase" src="/img/guides/manta-wallet/utxo/step3.png" width="50%"/>
   </div>

4. Click on the "Consolidate now" button to start the process.
   <div style={{textAlign: 'center'}}>
     <img alt="view-phrase" src="/img/guides/manta-wallet/utxo/step4.png" width="50%"/>
   </div>

5. When the page shows "Consolidation Finished", it means that the "Consolidate UTXOs" operation has been completed successfully.
   <div style={{textAlign: 'center'}}>
     <img alt="view-phrase" src="/img/guides/manta-wallet/utxo/step5.png" width="50%"/>
   </div>

UTXO consolidation is a potent tool for streamlining your blockchain transactions. It's vital to comprehend its implications and thoughtfully consider your requirements before initiating UTXO consolidation.
