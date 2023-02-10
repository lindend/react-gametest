import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DragType } from "./cardSlotSlice";
import { Card } from "./entities/card";
import { PlayerType } from "./entities/Player";

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
        drag: DragType;
        dropTargets: string[];
      }>
    ) => {},
    endTurn(_, action: PayloadAction<{ player: PlayerType }>) {},
    attackCard(_, action: PayloadAction<{ source: Card; target: Card }>) {},
    attackPlayer(
      _,
      action: PayloadAction<{ source: Card; target: PlayerType }>
    ) {},
  },
});

export const { dropCard, endTurn, attackCard, attackPlayer } =
  gameSlice.actions;

export default gameSlice.reducer;
