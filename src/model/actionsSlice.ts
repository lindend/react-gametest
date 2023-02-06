import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dragType } from "./cardSlotSlice";
import { card } from "./entities/card";
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
        card: card;
        drag: dragType;
        dropTargets: string[];
      }>
    ) => {},
    endTurn(_, action: PayloadAction<{ player: players }>) {},
    attackCard(_, action: PayloadAction<{ source: card; target: card }>) {},
    attackPlayer(
      _,
      action: PayloadAction<{ source: card; target: players }>
    ) {},
  },
});

export const { dropCard, endTurn, attackCard, attackPlayer } =
  gameSlice.actions;

export default gameSlice.reducer;
