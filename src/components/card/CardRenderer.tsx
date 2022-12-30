import { Fragment, useCallback, useEffect, useState } from "react";
import { GiBrokenSkull } from "react-icons/gi";
import { card } from "../../model/entities/card";
import { elementId, mouseSlot, slotId } from "../../model/entities/cardSlot";
import Card from "./BaseCard";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setIsDragging } from "../../model/cardSlice";

export type CardRendererProps = {
  card: card;
  slotId: slotId;

  canDrag: boolean;
};

const CardRenderer = (props: CardRendererProps) => {
  const { card, slotId, canDrag } = props;

  const dispatch = useDispatch();

  const [isDragging, setCardDragging] = useState(false);

  const setDragging = useCallback(
    (isDragging: boolean, mouseX: number, mouseY: number) => {
      dispatch(setIsDragging({ isDragging, mouseX, mouseY }));
      setCardDragging(isDragging);
    },
    []
  );

  let slotPosition = useSelector(
    (state: RootState) =>
      state.cards.slotPositions[elementId(isDragging ? mouseSlot : slotId)]
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
        name={card.name}
        icon={<GiBrokenSkull />}
        description={"Yes, this is test"}
        costGold={card.costGold}
        costSpirit={card.costSpirit}
        onMouseDown={(ev) => setDragging(true, ev.clientX, ev.clientY)}
        onMouseUp={(ev) => setDragging(false, ev.clientX, ev.clientY)}
      />
    </div>
  );
};

export default CardRenderer;
