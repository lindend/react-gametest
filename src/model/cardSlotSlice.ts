import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { card } from "./entities/card";

export const mouseSlot = "slot-mouse";

export interface slotPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: string;
  zIndex: string;
}

export interface dragStartPosition {
  x: number;
  y: number;
}

export enum dragType {
  target,
  card,
}

export type sliceState = {
  slotPositions: { [id: string]: slotPosition };
  isDragging: boolean;
  dragStart?: dragStartPosition;
  dragType?: dragType;
  draggingCard?: card;
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
      { payload }: PayloadAction<{ mouseX: number; mouseY: number }>
    ) => {
      state.slotPositions[mouseSlot] = {
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
        card?: card;
        isDragging: boolean;
        mouseX?: number;
        mouseY?: number;
        dragSourceX?: number;
        dragSourceY?: number;
        dragType?: dragType;
      }>
    ) => {
      state.draggingCard = payload.card;
      state.isDragging = payload.isDragging;

      if (payload.mouseX && payload.mouseY) {
        state.slotPositions[mouseSlot] = {
          x: payload.mouseX,
          y: payload.mouseY,
          width: 0,
          height: 0,
          rotation: "0deg",
          zIndex: "100",
        };
      }

      state.dragType = payload.dragType;

      if (payload.dragSourceX && payload.dragSourceY) {
        state.dragStart = { x: payload.dragSourceX, y: payload.dragSourceY };
      } else {
        state.dragStart = undefined;
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

export default cardSlotSlice.reducer;
