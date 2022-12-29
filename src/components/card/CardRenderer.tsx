import { Fragment, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { GiBrokenSkull } from "react-icons/gi";
import { card } from "../../model/entities/card";
import { elementId, slotId } from "../../model/entities/cardSlot";
import Card from "./BaseCard";
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';

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

  let slotPosition = useSelector((state: RootState) => state.cards.slotPositions[elementId(slotId)]);

  if (!slotPosition) {
    return (<Fragment />);
  }

  const style = {
    translate: `${slotPosition.x}px ${slotPosition.y}px`,
    rotate: slotPosition.rotation,
    zIndex: slotPosition.zIndex,
  };
  
  return (
    <div
      ref={dragRef}
      className={`
        absolute 
        top-0 left-0
        hover:scale-110
        hover:!z-50
        w-0
        flex
        justify-center
        transition-all
        `}
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
