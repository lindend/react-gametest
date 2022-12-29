import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { card } from "./entities/card";
import { elementId, slotId } from "./entities/cardSlot"

export interface slotPosition {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: string;
    zIndex: string;
}

export type sliceState = {
    cards: card[],
    cardSlots: { [id: string]: slotId },
    slotPositions: { [id: string]: slotPosition },
}

export const initialState: sliceState = {
    cards: [],
    cardSlots: {},
    slotPositions: {}
}

const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: (
            state,
            { payload }: PayloadAction<{ card: card, slot: slotId }>) => {
                state.cards = [...state.cards, payload.card];
                state.cardSlots[payload.card.id] = payload.slot;
        },
        setCardSlot: (
            state,
            { payload }: PayloadAction<{ card: card, slot: slotId }>) => {
                state.cardSlots[payload.card.id] = payload.slot;
        },
        setSlotPosition: (
            state,
            { payload }: PayloadAction<{ slotId: slotId, position: slotPosition }>) => {
                state.slotPositions[elementId(payload.slotId)] = payload.position;
        }
    }
})

export const { addCard, setSlotPosition } = cardSlice.actions;

export default cardSlice.reducer;