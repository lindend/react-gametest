import cardIcon from "./dowar_arch_wolf_pxl.png";
import { cardDbEntry } from "../../model/entities/cardDb";
import { cardTemplate, cardType } from "../../model/entities/cardTemplate";
import { element } from "../../model/entities/element";

export const testCard: cardTemplate = {
  templateId: "test_card",
  name: "Test",
  cost: [{ element: element.life, amount: 1 }],
  picture: cardIcon,
  type: cardType.creature,
  health: 1,
  attack: 1,
};

export const testCardEntry: cardDbEntry = {
  description: () => <>Yes, this is test.</>,
};
