import { CardTemplate } from "./cardTemplate";
import { Entity } from "./Entity";
import { PlayerType } from "./Player";

export const cardEntityType = "card";

export interface Card extends CardTemplate, Entity {
  id: number;
  owner: PlayerType;
}

export function newCard(props: Omit<Card, "type">): Card {
  return {
    type: cardEntityType,
    ...props,
  };
}

export const cardSlotId = (card: Card) => `card-${card.id}`;
