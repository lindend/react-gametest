import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dragType } from "./cardSlotSlice";
import { card } from "./entities/card";
import { element } from "./entities/element";

export interface elementEnergy {
  element: element;
  energy: number;
  maxEnergy: number;
}

export interface playerState {
  health: number;
  maxHealth: number;
  portraitUrl: string;
  elements: elementEnergy[];
  surgingElement: number;
  hand: card[];
  board: card[];
  deck: card[];
}

export enum players {
  player = "player",
  opponent = "opponent",
}

export type playersType = `${players}`;

export enum gameStateId {
  none,
  inTurn,
}

export type sliceState = {
  players: { [key in players]: playerState };
  currentTurn: players;
  state: gameStateId;
};

export const initialGameState: playerState = {
  health: 0,
  maxHealth: 0,
  portraitUrl: "",
  elements: [],
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

function getPlayerCards(player: playerState) {
  return [...player.board, ...player.hand, ...player.deck];
}

export function getCardById(
  cardId: number,
  state: sliceState
): card | undefined {
  const allCards = [
    ...getPlayerCards(state.players[players.player]),
    ...getPlayerCards(state.players[players.opponent]),
  ];
  return allCards.find((c) => c.id == cardId);
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    beginGame: (
      state,
      { payload }: PayloadAction<{ player: playerState; opponent: playerState }>
    ) => {
      const { player, opponent } = payload;

      state.players[players.player] = player;
      state.players[players.opponent] = opponent;
      state.state = gameStateId.none;
    },
    drawCard: (state, { payload }: PayloadAction<{ player: players }>) => {
      const player = state.players[payload.player];
      const drawnCard = player.deck.pop();
      if (drawnCard) {
        player.hand.push(drawnCard);
      } else {
        player.health -= 1;
      }
    },
    gainEnergy: (state, { payload }: PayloadAction<{ player: players }>) => {
      const player = state.players[payload.player];
      player.elements[player.surgingElement].maxEnergy += 1;
      player.surgingElement =
        (player.surgingElement + 1) % player.elements.length;
    },
    resetEnergy: (state, { payload }: PayloadAction<{ player: players }>) => {
      const player = state.players[payload.player];
      for (let e of player.elements) {
        e.energy = e.maxEnergy;
      }
    },
    damageCard(
      state,
      { payload }: PayloadAction<{ cardId: number; amount: number }>
    ) {
      const { cardId, amount } = payload;
      let card = getCardById(cardId, state);
      if (!card) {
        return;
      }
      card.health -= amount;
      if (card.health <= 0) {
        let player = state.players[card.owner];
        player.board.splice(
          player.board.findIndex((c) => c.id == card?.id),
          1
        );
      }
    },
    damagePlayer(
      state,
      {
        payload: { player, amount },
      }: PayloadAction<{ player: players; amount: number }>
    ) {
      state.players[player].health -= amount;
    },
    playCard: (state, { payload: { card } }: PayloadAction<{ card: card }>) => {
      const player = state.players[state.currentTurn];
      const cardHandIndex = player.hand.findIndex((c) => c.id == card.id);

      if (cardHandIndex == -1) {
        return;
      }

      player.hand.splice(cardHandIndex, 1);
      player.board.push(card);

      // Deduct energy cost
      for (let cost of card.cost) {
        const e = player.elements.find((e) => e.element == cost.element);
        if (!e) {
          continue;
        }

        e.energy -= cost.amount;
      }
    },
  },
});

export const {
  beginGame,
  drawCard,
  gainEnergy,
  resetEnergy,
  damageCard,
  playCard,
  damagePlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
