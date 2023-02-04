import { players } from "../gameSlice";
import { cardTemplate } from "./cardTemplate";

export interface card extends cardTemplate {
  id: number;
  owner: players;
}

export const cardSlotId = (card: card) => `card-${card.id}`;
