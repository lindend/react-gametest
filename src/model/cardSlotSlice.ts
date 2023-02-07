import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Card, cardSlotId } from "./entities/card";
import { vector2d } from "../math/vector2d";

export const mouseSlot = "slot-mouse";

export interface slotPosition {
  position: vector2d;
  width: number;
  height: number;
  rotation: string;
  zIndex: string;
}

export enum dragType {
  target,
  card,
}

export type sliceState = {
  slotPositions: { [id: string]: slotPosition };
  isDragging: boolean;
  dragStart?: vector2d;
  dragType?: dragType;
  draggingCard?: Card;
};

export const initialState: sliceState = {
  slotPositions: {},
  isDragging: false,
  dragStart: undefined,
};

const cardSlotSlice = createSlice({
  name: "cardSlots",
  initialState,
  reducers: {
    setSlotPositions: (
      state,
      { payload }: PayloadAction<{ id: string; position: slotPosition }[]>
    ) => {
      for (let i of payload) {
        state.slotPositions[i.id] = i.position;
      }
    },
    removeSlotPosition: (state, { payload }: PayloadAction<{ id: string }>) => {
      delete state.slotPositions[payload.id];
    },
    setMousePosition: (
      state,
      { payload: { mouse } }: PayloadAction<{ mouse: vector2d }>
    ) => {
      state.slotPositions[mouseSlot] = {
        position: mouse,
        width: 0,
        height: 0,
        rotation: "0deg",
        zIndex: "100",
      };
    },
    setIsDragging: (
      state,
      {
        payload: { mousePosition, card, isDragging, dragType, dragSource },
      }: PayloadAction<{
        card?: Card;
        isDragging: boolean;
        mousePosition: vector2d;
        dragSource?: vector2d;
        dragType?: dragType;
      }>
    ) => {
      state.draggingCard = card;
      state.isDragging = isDragging;
      state.dragType = dragType;
      state.dragStart = dragSource;

      if (mousePosition) {
        state.slotPositions[mouseSlot] = {
          position: mousePosition,
          width: 0,
          height: 0,
          rotation: "0deg",
          zIndex: "100",
        };
      }
    },
  },
});

export const {
  setSlotPositions,
  removeSlotPosition,
  setMousePosition,
  setIsDragging,
} = cardSlotSlice.actions;

export const getCardPosition = (state: RootState, c: Card) => {
  const slotId = cardSlotId(c);
  return state.cardSlots.slotPositions[slotId];
};

export default cardSlotSlice.reducer;
