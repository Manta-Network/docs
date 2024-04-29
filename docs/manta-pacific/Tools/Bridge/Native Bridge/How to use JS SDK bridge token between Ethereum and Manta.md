## Bridge ETH/ERC20 Between L1 and L2

Repo Link: [bridge-between-l1-l2](https://github.com/Manta-Network/manta-pacific-tutorial/tree/main/examples/bridge)

#### Install

```
yarn
```

#### Setting Account

Prepare an account private key on L1 Sepolia and need some ETH

```typescript
// open .env file
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

#### Choose Network

```typescript
// mainnet
const networkConfig = config.mainnet;

// sepolia testnet
const networkConfig = config.sepoliaTestnet;
```

#### Bridge ETH from L1 to L2

```typescript
await depositETH();
```

#### Bridge ERC20 Token from L1 to L2

```typescript
// need to fill in the corresponding token address and decimals first
const erc20Token = {
  l1Address: "",
  l2Address: "",
  decimals: 18,
};
await depositERC20();
```

#### Bridge ETH/ERC20 from L2 to L1

1. Initiate Withdrawal
   
   ```typescript
   // withdraw ETH
   const withdrawTxhash = await withdrawETH();
   ```

// withdraw ERC20 token
const withdrawTxhash = await withdrawERC20();

```
2. Wait for 45 minutes
3. Prove Withdrawal
```typescript
await proveWithdrawMessage(withdrawTxhash);
```

4. Wait for 3 days (Testnet: one minute)

5. Claim Withdrawal
   
   ```typescript
   await finalizeWithdrawMessage(withdrawTxhash);
   ```

#### Bridge History

- Check history and status on SocialScan
  - Mainnet: https://manta.socialscan.io/address/${address}#exitTxns
  - Testnet: https://manta-sepolia-testnet.socialscan.io/address/${address}#exitTxns
- Check history and status via SocialScan's API
  - Mainnet: https://api.w3w.ai/manta-pacific/v1/explorer/l2_to_l1_transactions?address=${address}
  - Testnet: https://api.w3w.ai/manta-sepolia-testnet/v2/explorer/l2_to_l1_transactions?address=${address}

#### Withdraw Status

```typescript
export enum WithdrawStatus {
  WAIT_TO_PROVE = 1,
  READY_TO_PROVE = 2,
  IN_CHALLENGE_PERIOD = 3,
  READY_FOR_RELAY = 4,
  RELAYED = 5,
}
```
