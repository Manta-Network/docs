# How do network fees on Manta work

Every transaction consists of two costs: an L2 (execution) fee and an L1 (security) fee. The L2 fee is the cost to execute your transaction on the L2, and the L1 fee is the estimated cost to publish the transaction on the L1. Typically the L1 security fee is higher than the L2 execution fee.

The L1 fee will vary depending on the amount of transactions on the L1. If the timing of your transaction is flexible, you can save costs by submitting transactions during periods of lower gas on the L1.

Similarly, the L2 fee can increase and decrease depending on how many transactions are being submitted to the L2. This adjustment mechanism has the same implementation as the L1.

## How to estimate L1 Fee

### JS SDK (Code Example)

Repo Link: [estimate-gas.ts](https://github.com/Manta-Network/manta-pacific-tutorial/blob/main/examples/estimate-gas/src/estimate-gas.ts)

```typescript
import { ethers } from "ethers";
import { asL2Provider } from "@constellation-labs/bedrock-sdk";

async function main() {
  const l2RpcProvider = asL2Provider(
    new ethers.providers.JsonRpcProvider("https://manta-pacific.drpc.org")
  );

  const tx = {
    type: 2,
    from: "0xc9070fB1ef16f704dfb60d205aD33B27B2CdAC0A",
    to: "0xc9070fB1ef16f704dfb60d205aD33B27B2CdAC0A",
    value: ethers.utils.parseUnits("0.000001", "ether"),
  };

  const totalGasCost = await l2RpcProvider.estimateTotalGasCost(tx);
  const l1GasCost = await l2RpcProvider.estimateL1GasCost(tx);
  const l2GasCost = await l2RpcProvider.estimateL2GasCost(tx);

  console.log(`Total Gas Cost: ${totalGasCost.toString()} wei`);
  console.log(`L1 Gas Cost: ${l1GasCost.toString()} wei`);
  console.log(`L2 Gas Cost: ${l2GasCost.toString()} wei`);
}

main();
```

### Contract (Code Example)

Repo Link: [estimate-l1-gas-contract.ts](https://github.com/Manta-Network/manta-pacific-tutorial/blob/main/examples/estimate-gas/src/estimate-l1-gas-contract.ts)

```typescript
import { Contract, ethers } from "ethers";
import { asL2Provider } from "@constellation-labs/bedrock-sdk";

async function main() {
  const l2RpcProvider = asL2Provider(
    new ethers.providers.JsonRpcProvider("https://manta-pacific.drpc.org")
  );

  const contractAddress = "0x420000000000000000000000000000000000000F";
  const abi = [
    {
      inputs: [{ internalType: "bytes", name: "_data", type: "bytes" }],
      name: "getL1Fee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new Contract(contractAddress, abi, l2RpcProvider);

  const tx = {
    type: 2,
    from: "0xc9070fB1ef16f704dfb60d205aD33B27B2CdAC0A",
    to: "0xc9070fB1ef16f704dfb60d205aD33B27B2CdAC0A",
    value: ethers.utils.parseUnits("0.000001", "ether"),
  };

  const transactionData = ethers.utils.serializeTransaction(tx);
  const l1Fee = await contract.getL1Fee(transactionData);

  console.log(`Estimate L1 Fee: ${l1Fee.toString()} wei`);
}

main();
```

## Query Transaction Consumed Gas Fee

Repo Link: [query-consumed-gas.ts](https://github.com/Manta-Network/manta-pacific-tutorial/blob/main/examples/estimate-gas/src/query-consumed-gas.ts)

```typescript
import { ethers } from "ethers";
import { asL2Provider } from "@constellation-labs/bedrock-sdk";
import BigNumber from "bignumber.js";

async function main() {
  const l2RpcProvider = asL2Provider(
    new ethers.providers.JsonRpcProvider("https://manta-pacific.drpc.org")
  );

  // https://pacific-explorer.manta.network/tx/0xe38d0f744a2e99b7384e40b868cd685e9f47267cc7082fe8389052e8576642aa
  const result = await l2RpcProvider.getTransactionReceipt(
    "0xe38d0f744a2e99b7384e40b868cd685e9f47267cc7082fe8389052e8576642aa"
  );
  // @ts-ignore
  const l1Fee = new BigNumber(result.l1Fee.toString());
  // or
  // const l1Fee = new BigNumber(result.l1GasUsed.toString()).times(result.l1GasPrice.toString()).times(result.l1FeeScalar.toString());

  const l2Fee = new BigNumber(result.gasUsed.toString()).times(
    result.effectiveGasPrice.toString()
  );

  const totalFee = l1Fee.plus(l2Fee);

  console.log(`Total Fee: ${totalFee.toFixed(0)} wei`);
  console.log(`L1 Fee: ${l1Fee.toFixed(0)} wei`);
  console.log(`L2 Fee: ${l2Fee.toFixed(0)} wei`);
}

main();s
```

For additional details about fee calculation on Manta Pacific, please refer to the [op-stack developer documentation](https://community.optimism.io/docs/developers/build/transaction-fees/).
