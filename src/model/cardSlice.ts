import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { card } from "./entities/card";
import { elementId, mouseSlot, slotId } from "./entities/cardSlot";
import { numberOfCardsInShop } from "./inventorySlice";

export interface slotPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: string;
  zIndex: string;
}

export type sliceState = {
  cards: card[];
  cardSlots: { [id: string]: slotId };
  slotPositions: { [id: string]: slotPosition };
  isDragging: boolean;
};

export const initialState: sliceState = {
  cards: [],
  cardSlots: {},
  slotPositions: {},
  isDragging: false,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (
      state,
      { payload }: PayloadAction<{ card: card; slot: slotId }>
    ) => {
      state.cards = [...state.cards, payload.card];
      state.cardSlots[payload.card.id] = payload.slot;
    },
    setCardSlot: (
      state,
      { payload }: PayloadAction<{ card: card; slot: slotId }>
    ) => {
      state.cardSlots[payload.card.id] = payload.slot;
    },
    setSlotPosition: (
      state,
      { payload }: PayloadAction<{ slotId: slotId; position: slotPosition }>
    ) => {
      state.slotPositions[elementId(payload.slotId)] = payload.position;
    },
    setMousePosition: (
      state,
      { payload }: PayloadAction<{ mouseX: number; mouseY: number }>
    ) => {
      state.slotPositions[elementId(mouseSlot)] = {
        x: payload.mouseX,
        y: payload.mouseY,
        width: 0,
        height: 0,
        rotation: "0deg",
        zIndex: "100",
      };
    },
    setIsDragging: (
      state,
      {
        payload,
      }: PayloadAction<{
        isDragging: boolean;
        mouseX?: number;
        mouseY?: number;
      }>
    ) => {
      state.isDragging = payload.isDragging;

      if (payload.mouseX && payload.mouseY) {
        state.slotPositions[elementId(mouseSlot)] = {
          x: payload.mouseX,
          y: payload.mouseY,
          width: 0,
          height: 0,
          rotation: "0deg",
          zIndex: "100",
        };
      }
    },
  },
});

export const { addCard, setSlotPosition, setMousePosition, setIsDragging } =
  cardSlice.actions;

export default cardSlice.reducer;
