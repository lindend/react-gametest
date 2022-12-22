import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { card } from "./entities/card";
import { cardSlot, slotId } from "./entities/cardSlot";

export const numberOfCardsInShop = 3;

export type sliceState = {
  gold: number;
  spirit: number;

  shop: cardSlot[];

  bench: cardSlot[];
  board: cardSlot[];
};

export const initialState: sliceState = {
  gold: 15,
  spirit: 10,
  shop: [],

  bench: [
    {
      id: "bench_1",
      card: undefined,
    },
    {
      id: "bench_2",
      card: undefined,
    },
  ],
  board: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    newRound: (state) => {
      state.shop = [];
    },
    buyCard: (
      state,
      { payload }: PayloadAction<{ card: card; slotId: slotId }>
    ) => {
      const { card, slotId } = payload;

      if (card.costGold > state.gold) {
        return;
      }

      if (card.costSpirit > state.spirit) {
        return;
      }

      const benchSlot = state.bench.find((b) =>
        slotId ? b.id === slotId : !b.card
      );

      if (!benchSlot) {
        return;
      }

      if (!state.shop.some((shopCard) => shopCard.card?.id === card.id)) {
        return;
      }

      state.shop = state.shop.map((shopCard) =>
        shopCard.card?.id === card.id
          ? { ...shopCard, card: undefined }
          : shopCard
      );
      benchSlot.card = card;
      state.gold -= card.costGold;
      state.spirit -= card.costSpirit;
    },
    moveCard: (
      state,
      { payload }: PayloadAction<{ card: card; slotId: slotId }>
    ) => {
      const { card, slotId } = payload;

      const oldSlot =
        state.bench.find((slot) => slot.card === card) ||
        state.board.find((slot) => slot.card === card);

      const newSlot =
        state.bench.find((slot) => slot.id === slotId) ||
        state.board.find((slot) => slot.id === slotId);

      if (!oldSlot || !newSlot) {
        return;
      }

      const temp = newSlot.card;
      newSlot.card = card;
      oldSlot.card = temp;
    },
  },
});

export const { buyCard, moveCard } = inventorySlice.actions;

export default inventorySlice.reducer;
