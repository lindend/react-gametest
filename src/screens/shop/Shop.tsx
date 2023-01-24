import Card from "../../components/card/Card";
import { GiBrokenSkull } from "react-icons/gi";
import CardSlot from "../../components/card/CardSlot";
import { slotId, slotIdElement } from "../../model/entities/cardSlot";

const slotIds: slotId[] = [
  ["shop", "1"],
  ["shop", "2"],
  ["shop", "3"],
  ["shop", "4"],
];

const Shop = () => {
  return (
    <div className="p-4">
      {slotIds.map((i) => (
        <CardSlot
          key={slotIdElement(i)}
          id={i}
          onDrop={(_card, _slotId) => {}}
        />
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
