import Card from "../../components/card/BaseCard";
import { GiBrokenSkull } from "react-icons/gi";
import CardSlot from "../../components/card/CardSlot";
import { slotId } from "../../model/entities/cardSlot";

const slotIds: slotId[] = ["shop_1", "shop_2", "shop_3", "shop_4"];

const Shop = () => {
  return (
    <div className="p-4">
      {slotIds.map((i) => (
        <CardSlot id={i} />
      ))}
    </div>
  );
};

/*
      <Card
        name="Test"
        icon={<GiBrokenSkull />}
        description="Yes, this is test"
        costGold={2}
        costSpirit={5}
      />
      */

export default Shop;
