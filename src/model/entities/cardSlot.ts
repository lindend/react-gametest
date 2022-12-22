import { card } from "./card";

export type slotArea = undefined | "shop" | "board" | "bench";

export type slotId =
  | undefined
  | ["shop", "1"]
  | ["shop", "2"]
  | ["shop", "3"]
  | ["shop", "4"]
  | ["bench", "1"]
  | ["bench", "2"]
  | ["bench", "3"]
  | ["bench", "4"]
  | ["board", "front", "1"]
  | ["board", "front", "2"]
  | ["board", "front", "3"]
  | ["board", "front", "4"]
  | ["board", "back", "1"]
  | ["board", "back", "2"]
  | ["board", "back", "3"];

export type cardSlot = {
  id: slotId;
  card: card | undefined;
};
