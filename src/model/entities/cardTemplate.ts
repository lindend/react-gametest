import { ElementType } from "./element";

export interface CardCost {
  amount: number;
  element: ElementType;
}

export enum CardType {
  spell,
  targetedSpell,
  creature,
}

export interface CardTemplate {
  templateId: string;
  cost: CardCost[];
  name: string;
  cardType: CardType;
  picture: string;
  attack: number;
  health: number;
}
