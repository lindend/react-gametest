import cardIcon from "./dowar_arch_wolf_pxl.png";
import { CardDbEntry } from "../../model/entities/cardDb";
import { CardTemplate, CardType } from "../../model/entities/cardTemplate";
import { ElementType } from "../../model/entities/element";

export const testCard: CardTemplate = {
  templateId: "test_card",
  name: "Test",
  cost: [{ element: ElementType.life, amount: 1 }],
  picture: cardIcon,
  cardType: CardType.creature,
  health: 1,
  attack: 1,
};

export const testCardEntry: CardDbEntry = {
  description: () => <>Yes, this is test.</>,
};
