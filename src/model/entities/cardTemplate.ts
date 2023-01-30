import { element } from "./element";

export interface cardCost {
  amount: number;
  element: element;
}

export interface cardTemplate {
  cost: cardCost[];
  name: string;
  icon: string;
  description: string;
}
