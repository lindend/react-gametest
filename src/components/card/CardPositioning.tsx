import { Fragment, useCallback, useEffect, useState } from "react";
import { card, cardSlotId } from "../../model/entities/card";
import { Card, cardFacing } from "./Card";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { mouseSlot, setIsDragging } from "../../model/cardSlotSlice";
import { dropCard } from "../../model/gameSlice";

export type CardPositioningProps = {
  card: card;
  facing: cardFacing;
};

function getDroppable(x: number, y: number): string[] {
  const elements = document.elementsFromPoint(x, y);

  let dropTargets = [];
  for (let element of elements) {
    const dropTarget = element.getAttribute("drop-target");
    if (!!dropTarget) {
      dropTargets.push(dropTarget);
    }
  }

  return dropTargets;
}

const CardPositioning = (props: CardPositioningProps) => {
  const { card, facing } = props;

  const dispatch = useDispatch();

  const [isDragging, setCardDragging] = useState(false);

  // Move this stuff into Card, maybe
  const startDrag = useCallback((mouseX: number, mouseY: number) => {
    dispatch(setIsDragging({ isDragging: true, mouseX, mouseY }));
    setCardDragging(true);
  }, []);

  const stopDragging = useCallback((mouseX: number, mouseY: number) => {
    dispatch(setIsDragging({ isDragging: false, mouseX, mouseY }));
    setCardDragging(false);

    const dropTargets = getDroppable(mouseX, mouseY);
    if (dropTargets.length > 0) {
      dispatch(dropCard({ card, dropTargets }));
    }
  }, []);

  let slotPosition = useSelector(
    (state: RootState) =>
      state.cardSlots.slotPositions[isDragging ? mouseSlot : cardSlotId(card)]
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
        onMouseUp={(ev) => stopDragging(ev.clientX, ev.clientY)}
      />
    </div>
  );
};

export default CardPositioning;
