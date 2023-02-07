import { addCardEntry } from "../model/entities/cardDb";
import { registerFireElemental } from "./fireElemental/fireElemental";
import { testCard, testCardEntry } from "./testCard/testCard";

export const registerCards = () => {
  addCardEntry(testCard.templateId, testCardEntry);
  registerFireElemental();
};
