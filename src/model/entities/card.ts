import { cardTemplate } from "./cardTemplate";

export interface card extends cardTemplate {
  id: number;
}

export const cardSlotId = (card: card) => `card-${card.id}`;
