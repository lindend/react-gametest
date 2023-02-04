import { element } from "./element";

export interface cardCost {
  amount: number;
  element: element;
}

export enum cardType {
  spell,
  creature,
}

export interface cardTemplate {
  templateId: string;
  cost: cardCost[];
  name: string;
  type: cardType;
  picture: string;
  attack: number;
  health: number;
}
