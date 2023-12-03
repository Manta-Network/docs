# Zero-Knowledge Proof Performance

## Verifer Time 

| Circuit  | x86-64 Native Time (ms) | WASM Time (ms)|
|:--------:|:-----------------------:|:-------------:|
| Transfer | 10.9                    | 109           |
| Exchange | 11                      | 110           |
| Reclaim  | 8.3                     | 89            | 

Note: All verifier times are obtained from `frame-benchmark`. 
The WASM time is substrate flavored WASM time using a compiled setting. 

## Prover Time

| Circuit             | x86-64 Native Time (sec) | WASM Time (sec) |
|:-------------------:|:------------------------:|:---------------:|
| pedersen commitment | 0.86                     | 2.61            |

Benchmark code can be found [here](https://github.com/stechu/wasm-prover). 
The WASM time is measured using Brave browser `Version 1.25.68 Chromium: 91.0.4472.77 (Official Build) (64-bit)`.
