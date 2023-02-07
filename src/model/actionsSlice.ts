import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dragType } from "./cardSlotSlice";
import { Card } from "./entities/card";
import { players } from "./gameSlice";

const gameSlice = createSlice({
  name: "actions",
  initialState: {},
  reducers: {
    dropCard: (
      state,
      {
        payload,
      }: PayloadAction<{
        card: Card;
        drag: dragType;
        dropTargets: string[];
      }>
    ) => {},
    endTurn(_, action: PayloadAction<{ player: players }>) {},
    attackCard(_, action: PayloadAction<{ source: Card; target: Card }>) {},
    attackPlayer(
      _,
      action: PayloadAction<{ source: Card; target: players }>
    ) {},
  },
});

export const { dropCard, endTurn, attackCard, attackPlayer } =
  gameSlice.actions;

export default gameSlice.reducer;
