---
title: 'Typescript SDK'
description: 'zkShuffle SDK Overview'
---

# Overview

zkShuffles SDK provides [IZKShuffle](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L47-L58) as a standard interface to interact with shuffle manager contract.
The goal is to simplify zk proof generation and key management.
With IZKShuffle interface, game developer can build zk game without any experience on cryptography including zero knowledge proof, and thus can focus on the game logic.

# IZKShuffle

### joinGame
```async joinGame(gameId: number): Promise<number>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L128)

Joins the game specified by `gameId`, and returns the player ID per game.

**Parameters:**
  - `gameId` : number

**Return:**
  - `playerId` : number

### checkTurn
```async checkTurn(gameId: number, startBlock: any = 0): Promise<GameTurn>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#LL140C3-L140C74)

Queries a player's current turn in game `gameId`, specified by `GameTurn:`

  ```typescript
  enum GameTurn {
    NOP, // Not Your Turn
    Shuffle, // Shuffle Turn
    Deal, // Deal Decrypt Turn
    Open, // Open Card
    Error, // Game Error
    Complete, // Game End
  }
  ```

**Parameters:**
- `gameId` : number

**Return:**
- `turn` : `GameTurn`


### shuffle
```async shuffle(gameId: number): Promise<boolean>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#LL240C3-L240C50)

Shuffles the deck in game `gameId` and submits a proof on-chain.

**Parameters:**
- `gameId` : number

**Return:**
- `result` : boolean. `True` is shuffle successs, otherwise `False`.

### draw
```async draw(gameId: number): Promise<boolean>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L280)

Draws a card in game `gameId`, and submits a proof on-chain.

**Parameters:**
- `gameId` : number

**Return:**
- `result` : boolean. `True` is draw successs, otherwise `False`

### open
```async open(gameId: number, cardIds: number[]): Promise<number[]>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L361)

Opens cards specified by `cardIds` and submits a proof on-chain.
> `open` automatically sends data to blockchain, such that it is not suitable for opening cards that are only visible to players. Use `openOffchain` instead in this case.

**Parameters:**
- `gameId` : number
- `cardIds` : number[]

**Return:**
- `cards` : the index of decrypted cards if open successfully; otherwise -1

### openOffchain
```async openOffchain(gameId: number, cardIds: number[]): Promise<number[]>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L342)

Opens cards specified by `cardIds`. Returns card's original value if open successs, otherwise returns -1 for the card.
> Different from `open` that sends the decryption onchain, `openOffchain` only shows decrypted card on user machine and does not send to blockchain.

**Parameters:**
- `gameId` : number
- `cardIds` : number[]

**Return:**
- `cards` : number[]

### getPlayerId
```async getPlayerId(gameId: number): Promise<number>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L135)

Gets player's id from onchain game `gameId`.

**Parameters:**
- `gameId` : number

**Return:**
- `playerId` : number

### queryCards
```async queryCards(gameId: number, cardIds: number[]): Promise<number[]>```[[src]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/jssdk/src/shuffle/zkShuffle.ts#L352)

Gets the card value specified by `cardIds` from on-chain game `gameId`.

**Parameters:**
- `gameId` : number
- `cardIds` : number[]

**Return:**
- `cards` : number[]
