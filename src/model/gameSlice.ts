import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { card } from "./entities/card";
import { element } from "./entities/element";

export interface gameState {
  health: number;
  elements: element[];
  elementEnergy: number[];
  surgingElement: number;
  hand: card[];
  board: card[];
  deck: card[];
}

export enum players {
  player,
  opponent,
}

export enum gameStateId {
  none,
  inTurn,
}

export type sliceState = {
  players: { [key in players]: gameState };
  currentTurn: players;
  state: gameStateId;
};

export const initialGameState: gameState = {
  health: 0,
  elements: [],
  elementEnergy: [],
  surgingElement: 0,
  hand: [],
  board: [],
  deck: [],
};

export const initialState: sliceState = {
  players: {
    [players.player]: initialGameState,
    [players.opponent]: initialGameState,
  },
  currentTurn: players.player,
  state: gameStateId.none,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    beginGame: (
      state,
      { payload }: PayloadAction<{ player: gameState; opponent: gameState }>
    ) => {
      const { player, opponent } = payload;

      state.players[players.player] = player;
      state.players[players.opponent] = opponent;
      state.state = gameStateId.none;
    },
    dropCard: (
      state,
      { payload }: PayloadAction<{ card: card; dropTargets: string[] }>
    ) => {
      const { card } = payload;
      const player = state.players[state.currentTurn];

      // todo: check cost

      const cardHandIndex = player.hand.findIndex((c) => c.id == card.id);

      if (cardHandIndex == -1) {
        return;
      }

      player.hand.splice(cardHandIndex, 1);
      player.board.push(card);
      // TODO: deduct cost
    },
    endTurn: (state) => {
      const player = state.players[state.currentTurn];

      const drawnCard = player.deck.pop();
      if (drawnCard) {
        player.hand.push(drawnCard);
      } else {
        player.health -= 1;
      }
    },
  },
});

export const { beginGame, dropCard, endTurn } = gameSlice.actions;

export default gameSlice.reducer;
