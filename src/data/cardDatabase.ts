import { cardTemplate } from "../model/entities/cardTemplate";

function card(name: string, gold: number, spirit: number): cardTemplate {
  return {
    name,
    costGold: gold,
    costSpirit: spirit,
  };
}

export const fireball = card("Fireball", 3);
