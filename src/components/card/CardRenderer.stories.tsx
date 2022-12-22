import { useArgs } from "@storybook/addons";
import { Story } from "@storybook/react";
import { card } from "../../model/entities/card";
import { slotId } from "../../model/entities/cardSlot";
import CardRenderer, { CardRendererProps } from "./CardRenderer";
import CardSlot from "./CardSlot";

export default {
  component: CardRenderer,
  title: "card/CardRenderer",
};

const card1: card = {
  id: 1,
  name: "test",
  costGold: 1,
  costSpirit: 1,
};

const defaultArgs: CardRendererProps = {
  card: card1,
  slotId: ["shop", "1"],
  canDrag: true,
};

const Template: Story<CardRendererProps> = (args) => {
  const [_, updateArgs] = useArgs();

  const onDrop = (args: CardRendererProps) => (_: any, slot: slotId) => {
    updateArgs({ ...args, slotId: slot });
  };

  return (
    <div>
      <CardSlot id={["bench", "1"]} onDrop={onDrop(args)} />
      <CardSlot id={["bench", "2"]} onDrop={onDrop(args)} />
      <CardSlot id={["bench", "3"]} onDrop={onDrop(args)} />
      <CardSlot id={["shop", "1"]} onDrop={onDrop(args)} />
      <CardSlot id={["shop", "2"]} onDrop={onDrop(args)} />
      <CardRenderer {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
