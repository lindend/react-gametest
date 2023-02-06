import { Fragment, useCallback, useState } from "react";
import { card, cardSlotId } from "../../model/entities/card";
import { Card, cardFacing } from "./Card";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { dragType, mouseSlot, setIsDragging } from "../../model/cardSlotSlice";

export enum cardArea {
  hand,
  board,
  deck,
}

export type CardPositioningProps = {
  card: card;
  facing: cardFacing;
  area: cardArea;
  draggable: boolean;
};

const CardPositioning = ({
  card,
  facing,
  area,
  draggable,
}: CardPositioningProps) => {
  const dispatch = useDispatch();

  const isDragging = useSelector(
    (state: RootState) => state.cardSlots.draggingCard?.id == card.id
  );

  const drag = useSelector((state: RootState) => state.cardSlots.dragType);

  const slot =
    isDragging && drag == dragType.card ? mouseSlot : cardSlotId(card);

  const slotPosition = useSelector(
    (state: RootState) => state.cardSlots.slotPositions[slot]
  );

  // Move this stuff into Card, maybe
  const startDrag = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!draggable) {
        return;
      }
      dispatch(
        setIsDragging({
          card,
          isDragging: true,
          mouseX,
          mouseY,
          dragSourceX: mouseX,
          dragSourceY: mouseY,
          dragType: area == cardArea.hand ? dragType.card : dragType.target,
        })
      );
    },
    [card, area, draggable]
  );

  if (!slotPosition) {
    return <Fragment />;
  }

  const style = {
    translate: `${slotPosition.x}px ${slotPosition.y}px`,
    rotate: slotPosition.rotation,
    zIndex: slotPosition.zIndex,
  };

  return (
    <div
      className={`
        absolute 
        top-0 left-0
        hover:scale-110
        hover:!z-50
        w-0
        flex
        justify-center
        ${!isDragging ? "transition-all" : "align-middle"}
        `}
      style={style}
    >
      <Card
        card={card}
        facing={facing}
        onMouseDown={(ev) => startDrag(ev.clientX, ev.clientY)}
      />
    </div>
  );
};

export default CardPositioning;
