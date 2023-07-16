---
title: 'Tourial'
description: 'zkShuffle SDK Tourial Step-by-Step'
---


# Overview

This tutorial shows a simple game zkHilo. In particular, each of two players draw 1 card and bet, where the player with larger card value wins. The complete logic is:

```ts
    zkHiLo Game Logic :
    1. deal card 0 to player 0
    2. deal card 1 to player 1
    3. bet
    4. player 0 open card 0
    5. player 1 open card 1
    6. win/lose
```

# Game contract

Developers could write a game contract as follows:

```solidity
pragma solidity >=0.8.2 <0.9.0;
import "IBaseGame.sol";
import "IShuffleStateManager.sol";
contract Hilo is IBaseGame {
    IShuffleStateManager public shuffle;
    uint256 public shuffleId;
    // check whether the caller is the shuffle Manager
    modifier onlyShuffleManager() {
        require(
            address(shuffle) == msg.sender,
            "Caller is not shuffle manager."
        );
        _;
    }
    function cardConfig() external pure override returns (DeckConfig) {
        return DeckConfig.Deck52Card;
    }
    constructor(IShuffleStateManager _shuffle) {
        shuffle = _shuffle;
    }
    // create a game with 2 players
    function createGame() external {
        shuffleId = shuffle.createShuffleGame(2);
        bytes memory next = abi.encodeWithSelector(
            this.moveToShuffleStage.selector
        );
        shuffle.register(shuffleId, next);
    }
    // will be called after all the 2 players have registered
    function moveToShuffleStage() external onlyShuffleManager {
        bytes memory next = abi.encodeWithSelector(
            this.dealCardsToPlayer.selector
        );
        shuffle.shuffle(shuffleId, next);
    }
    // will be called after all the 2 players have shuffled, specify the deal state so that the other player can deal the first card to player 0
    function dealCard0ToPlayer0() external onlyShuffleManager {
        BitMaps.BitMap256 memory cards;
        cards._data = 1; // ...0001
        bytes memory next = abi.encodeWithSelector(
            this.dealCard1ToPlayer1.selector
        );
        shuffle.dealCardsTo(shuffleId, cards, 0, next);
    }
    // will be called after dealt card to player 0, specify the deal state so that the other player can deal the second card to player 1
    function dealCard1ToPlayer1() external onlyShuffleManager {
        BitMaps.BitMap256 memory cards;
        cards._data = 2; // ...0010
        bytes memory next = abi.encodeWithSelector(
            this.openCard0.selector
        );
        shuffle.dealCardsTo(shuffleId, cards, 1, next);
    }
    // will be called after dealt card to player 1, specify the open state so that the player 0 can open his 1 card
    function openCard0() external onlyShuffleManager {
        bytes memory next = abi.encodeWithSelector(
            this.openCard1.selector
        );
        shuffle.openCards(shuffleId, 0, 1, next);
    }
    // will be called after player 0 opened card, specify the open state so that the player 1 can open his 1 card
    function openCard1() external onlyShuffleManager {
        bytes memory next = abi.encodeWithSelector(
            this.endGame.selector
        );
        shuffle.openCards(shuffleId, 1, 1, next);
    }
    // will be called after player 1 opened card, and end the game.
    function endGame() onlyShuffleManager {
        shuffle.endGame(shuffleId);
    }
    ...
}
```

For the complete contract code, please see [[hilo]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/contracts/contracts/games/hilo/Hilo.sol).

# Front end with SDK

Developers can interact with shuffleManager contract using zkShuffle SDK. We provide the following examples.



- **step 1** : Creates a zkShuffle instance, with given shuffleManager contract address, and player signer

  ```ts
  const player = await zkShuffle.create(ShuffleManagerContract, signer);
  ```

- **step 2** : join the game

  ```ts
  const playerIdx = await player.joinGame(gameId);
  ```

- **step 3** : check player's turn in the game

  ```ts
  const turn = await player.checkTurn(gameId);
  ```

- **step 4.1** : if it's player's shuffle turn, shuffle the card

  ```ts
  await player.shuffle(gameId);
  ```

- **step 4.2** : if it's player's deal turn, draw the card

  ```ts
  await player.draw(gameId);
  ```

- **step 4.3** : if it's player's open turn, open the card

  ```ts
      const cards[] = await player.open(gameId, cardIds)
  ```

We provide an end-to-end front-end code as follows:

  ```ts
  // create zkShuffle instance
  const player = await zkShuffle.create(SM, owner);

  // join game
  const playerIdx = await player.joinGame(gameId);

  // play game
  let turn;
  while (turn != GameTurn.Complete) {
    turn = await player.checkTurn(gameId);

    if (turn != NOP) {
      switch (turn) {
        case GameTurn.Shuffle:
          await player.shuffle(gameId);
          break;
        case GameTurn.Deal:
          await player.draw(gameId);
          break;
        case GameTurn.Open:
          const cards = await player.open(gameId, cardIds);
          break;
        case GameTurn.Complete:
          break;
        case GameTurn.Error:
          break;
        default:
          console.log('err turn ', turn);
          exit(-1);
      }
    }
  }
  ```

For the complete end-to-end test, please see [[e2e]](https://github.com/Poseidon-ZKP/zkShuffle/blob/main/packages/contracts/tests/e2e.ts).