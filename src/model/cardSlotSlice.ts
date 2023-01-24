import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const mouseSlot = "slot-mouse";

export interface slotPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: string;
  zIndex: string;
}

export type sliceState = {
  slotPositions: { [id: string]: slotPosition };
  isDragging: boolean;
};

export const initialState: sliceState = {
  slotPositions: {},
  isDragging: false,
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
        isDragging: boolean;
        mouseX?: number;
        mouseY?: number;
      }>
    ) => {
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
