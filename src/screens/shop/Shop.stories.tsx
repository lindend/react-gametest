import CardRenderer from "../../components/card/CardRenderer";
import CardsRenderer from "../../components/card/CardsRenderer";
import Shop from "./Shop";

export default {
  component: Shop,
  title: "shop/Shop",
};

const Template = () => (
  <>
    <CardsRenderer cards={[]} />
    <Shop />
  </>
);

export const Primary = Template.bind({});
