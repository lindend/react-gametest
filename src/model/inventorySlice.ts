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
      id: ["bench", "1"],
      card: undefined,
    },
    {
      id: ["bench", "2"],
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
      { payload }: PayloadAction<{ card: card; targetSlotId: slotId }>
    ) => {
      const { card, targetSlotId } = payload;

      if (card.costGold > state.gold) {
        return;
      }

      if (card.costSpirit > state.spirit) {
        return;
      }

      const benchSlot = state.bench.find((b) =>
        targetSlotId ? b.id === targetSlotId : !b.card
      );

      if (!benchSlot) {
        return;
      }

      if (!state.shop.some((shopCard) => shopCard.card?.id === card.id)) {
        return;
      }

      state.shop = state.shop.map((shopCardSlot) =>
        shopCardSlot.card?.id === card.id
          ? { ...shopCardSlot, card: undefined }
          : shopCardSlot
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
