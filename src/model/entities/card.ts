import { players } from "../gameSlice";
import { cardTemplate } from "./cardTemplate";

export interface Card extends cardTemplate {
  id: number;
  owner: players;
}

export const cardSlotId = (card: Card) => `card-${card.id}`;
