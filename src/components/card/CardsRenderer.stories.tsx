import { cardSlot } from "../../model/entities/cardSlot";
import CardsRenderer from "./CardsRenderer";

export default {
  component: CardsRenderer,
  title: "card/CardsRenderer",
};

const cards: cardSlot[] = [
  {
    id: ["shop", "1"],
    card: {
      id: 1,
      name: "test",
      costGold: 1,
      costSpirit: 1,
    },
  },
  {
    id: ["shop", "2"],
    card: {
      id: 2,
      name: "test2",
      costGold: 1,
      costSpirit: 1,
    },
  },
];

const Template = () => <CardsRenderer cards={cards} />;

export const Primary = Template.bind({});
