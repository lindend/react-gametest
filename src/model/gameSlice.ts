import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, cardEntityType } from "./entities/card";
import { ElementType } from "./entities/element";
import { Entity } from "./entities/Entity";
import { Player, playerEntityType, PlayerType } from "./entities/Player";

export interface ElementEnergy {
  element: ElementType;
  energy: number;
  maxEnergy: number;
}

export interface PlayerState {
  health: number;
  maxHealth: number;
  portraitUrl: string;
  elements: ElementEnergy[];
  surgingElement: number;
  hand: Card[];
  board: Card[];
  deck: Card[];
}

export enum GameStateId {
  none,
  inTurn,
}

export type SliceState = {
  players: { [key in PlayerType]: PlayerState };
  currentTurn: PlayerType;
  state: GameStateId;
};

export const initialGameState: PlayerState = {
  health: 0,
  maxHealth: 0,
  portraitUrl: "",
  elements: [],
  surgingElement: 0,
  hand: [],
  board: [],
  deck: [],
};

export const initialState: SliceState = {
  players: {
    [PlayerType.player]: initialGameState,
    [PlayerType.opponent]: initialGameState,
  },
  currentTurn: PlayerType.player,
  state: GameStateId.none,
};

function getPlayerCards(player: PlayerState) {
  return [...player.board, ...player.hand, ...player.deck];
}

export function getCardById(
  cardId: number,
  state: SliceState
): Card | undefined {
  const allCards = [
    ...getPlayerCards(state.players[PlayerType.player]),
    ...getPlayerCards(state.players[PlayerType.opponent]),
  ];
  return allCards.find((c) => c.id == cardId);
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    beginGame: (
      state,
      { payload }: PayloadAction<{ player: PlayerState; opponent: PlayerState }>
    ) => {
      const { player, opponent } = payload;

      state.players[PlayerType.player] = player;
      state.players[PlayerType.opponent] = opponent;
      state.state = GameStateId.none;
    },
    drawCard: (state, { payload }: PayloadAction<{ player: PlayerType }>) => {
      const player = state.players[payload.player];
      const drawnCard = player.deck.pop();
      if (drawnCard) {
        player.hand.push(drawnCard);
      } else {
        player.health -= 1;
      }
    },
    gainEnergy: (state, { payload }: PayloadAction<{ player: PlayerType }>) => {
      const player = state.players[payload.player];
      player.elements[player.surgingElement].maxEnergy += 1;
      player.surgingElement =
        (player.surgingElement + 1) % player.elements.length;
    },
    resetEnergy: (
      state,
      { payload }: PayloadAction<{ player: PlayerType }>
    ) => {
      const player = state.players[payload.player];
      for (let e of player.elements) {
        e.energy = e.maxEnergy;
      }
    },
    damageEntity(
      state,
      {
        payload: { target, amount },
      }: PayloadAction<{ target: Entity; amount: number }>
    ) {
      switch (target.type) {
        case cardEntityType:
          let card = getCardById((target as Card).id, state);
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
          break;
        case playerEntityType:
          state.players[(target as Player).playerType].health -= amount;
          break;
      }
    },
    playCard: (state, { payload: { card } }: PayloadAction<{ card: Card }>) => {
      const player = state.players[state.currentTurn];
      const cardHandIndex = player.hand.findIndex((c) => c.id == card.id);

      if (cardHandIndex == -1) {
        return;
      }

      player.hand.splice(cardHandIndex, 1);

      // Deduct energy cost
      for (let cost of card.cost) {
        const e = player.elements.find((e) => e.element == cost.element);
        if (!e) {
          continue;
        }

        e.energy -= cost.amount;
      }
    },
    addCardToBoard(
      state,
      {
        payload: { card, player, index },
      }: PayloadAction<{ card: Card; player: PlayerType; index: number }>
    ) {
      const p = state.players[player];
      p.board.splice(index, 0, card);
    },
  },
});

export const {
  beginGame,
  drawCard,
  gainEnergy,
  resetEnergy,
  damageEntity,
  playCard,
  addCardToBoard,
} = gameSlice.actions;

export default gameSlice.reducer;
