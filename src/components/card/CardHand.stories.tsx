import { useArgs } from "@storybook/addons";
import { Story } from "@storybook/react";
import { card } from "../../model/entities/card";
import { slotId } from "../../model/entities/cardSlot";
import CardHand from "./CardHand";
import CardPositioning, { CardPositioningProps } from "./CardPositioning";

export default {
  component: CardHand,
  title: "card/CardHand",
};

const card1: card = {
  id: 1,
  name: "test",
  costGold: 1,
  costSpirit: 1,
};

let cards = [card1];

const defaultArgs: CardPositioningProps = {
  card: card1,
  slotId: new slotId("shop", "1"),
  canDrag: true,
};

const Template: Story<CardPositioningProps> = (args) => {
  const [_, updateArgs] = useArgs();

  return (
    <div>
      <CardHand cards={cards} />
      <CardPositioning {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
