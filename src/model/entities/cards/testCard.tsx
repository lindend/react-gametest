import { cardTemplate, cardType } from "../cardTemplate";
import { element } from "../element";
import cardIcon from "../../../../art/cards/dowar_arch_wolf_pxl.png";
import { cardDbEntry } from "../cardDb";

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
