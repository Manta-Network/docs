---
sidebar_position: 1
---

# Manta Zero-Knowledge Proof Performance

## Verifer Time 
| Circuit | x86-64 Native Time (ms) | WASM Time (ms)|
--- | --- | ---
| Transfer | 10.9 | 109 |
| Exchange | 11   | 110 |
| Reclaim  | 8.3  | 89  | 

## Prover Time

| Circuit | x86-64 Native Time (sec) | WASM Time (sec)|
--- | --- | ---
|pedersen comm.| 0.86 | 2.61 |

Benchmark code can be found [here](https://github.com/stechu/wasm-prover). 