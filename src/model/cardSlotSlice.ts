import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Card, cardSlotId } from "./entities/card";
import { Vector2d } from "../math/vector2d";
import { SlotPosition } from "./entities/SlotPosition";

export const mouseSlot = "slot-mouse";

export enum DragType {
  attackTarget,
  playCard,
  castSpell,
}

export type SliceState = {
  slotPositions: { [id: string]: SlotPosition };
  isDragging: boolean;
  dragStart?: Vector2d;
  dragType?: DragType;
  draggingCard?: Card;
};

export const initialState: SliceState = {
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
      { payload }: PayloadAction<{ id: string; position: SlotPosition }[]>
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
      { payload: { mouse } }: PayloadAction<{ mouse: Vector2d }>
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
        mousePosition: Vector2d;
        dragSource?: Vector2d;
        dragType?: DragType;
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
