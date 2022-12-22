import { Story } from "@storybook/react";
import { card } from "../../model/entities/card";
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

const Template: Story<CardRendererProps> = (args) => (
  <div>
    <CardSlot id="bench_1" />
    <CardSlot id="bench_2" />
    <CardSlot id="bench_3" />
    <CardSlot id="shop_1" />
    <CardSlot id="shop_2" />
    <CardRenderer {...args} />
  </div>
);

const defaultArgs: CardRendererProps = {
  card: card1,
  slotId: "shop_1",
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
