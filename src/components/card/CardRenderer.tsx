import { useEffect, useRef, useState } from "react";
import { GiBrokenSkull } from "react-icons/gi";
import { card } from "../../model/entities/card";
import { slotId } from "../../model/entities/cardSlot";
import Card from "./BaseCard";

export type CardRendererProps = {
  card: card;
  slotId: slotId;
};

const CardRenderer = ({ card, slotId }: CardRendererProps) => {
  const [cardSlotElement, setCardSlotElement] = useState(
    document.getElementById(slotId || "")
  );

  useEffect(() => {
    if (slotId) {
      setCardSlotElement(document.getElementById(slotId));
    }
  }, [slotId]);

  debugger;

  const style = {
    transform: `translate(${cardSlotElement?.offsetLeft || 0}px, 
      ${cardSlotElement?.offsetTop || 0}px)`,
  };

  return (
    <div className="absolute top-0 left-0 transition-transform" style={style}>
      <Card
        name={card.name}
        icon={<GiBrokenSkull />}
        description="Yes, this is test"
        costGold={card.costGold}
        costSpirit={card.costSpirit}
      />
    </div>
  );
};

export default CardRenderer;
