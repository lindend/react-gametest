import { card } from "./card";

export type slotArea = undefined | "shop" | "board" | "bench";

export type slotId = {
  area: string;
  position: string;
}

export function elementId(slot: slotId) {
  return `${slot.area}-${slot.position}`;
}

export type cardSlot = {
  id: slotId;
  card: card | null;
};
