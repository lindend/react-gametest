import { Fragment, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { GiBrokenSkull } from "react-icons/gi";
import { card } from "../../model/entities/card";
import { slotId } from "../../model/entities/cardSlot";
import Card from "./BaseCard";

export type CardRendererProps = {
  card: card;
  slotId: slotId;

  canDrag: boolean;
};

const CardRenderer = (props: CardRendererProps) => {
  const { card, slotId, canDrag } = props;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "Card",
    item: card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => canDrag,
  }));

  const [cardSlotElement, setCardSlotElement] = useState(
    document.getElementById(slotId?.join("-") || "")
  );

  useEffect(() => {
    if (slotId) {
      setCardSlotElement(document.getElementById(slotId?.join("-")));
    }
  }, [slotId]);

  const style = {
    transform: `translate(${cardSlotElement?.offsetLeft || 0}px, ${
      cardSlotElement?.offsetTop || 0
    }px)`,
  };

  return (
    <div
      ref={dragRef}
      className={`absolute top-0 left-0 ${false ? "transition-transform" : ""}`}
      style={style}
    >
      {!isDragging ? (
        <Card
          name={card.name}
          icon={<GiBrokenSkull />}
          description={"Yes, this is test"}
          costGold={card.costGold}
          costSpirit={card.costSpirit}
        />
      ) : (
        <Fragment />
      )}
    </div>
  );
};

export default CardRenderer;
