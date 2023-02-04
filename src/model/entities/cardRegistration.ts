import { addCardEntry } from "./cardDb";
import { fireElemental, fireElementalCard } from "./cards/fireElemental";
import { testCard, testCardEntry } from "./cards/testCard";

export const registerCards = () => {
  addCardEntry(testCard.templateId, testCardEntry);
  addCardEntry(fireElemental.templateId, fireElementalCard);
};
