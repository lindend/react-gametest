import { Fragment, useCallback } from "react";
import { Card as CardEntity, cardSlotId } from "../../model/entities/card";
import { Card, cardFacing } from "./Card";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  DragType as DragType,
  mouseSlot,
  setIsDragging,
} from "../../model/cardSlotSlice";
import { useAnimations } from "../../animation/useAnimations";
import { CardType } from "../../model/entities/cardTemplate";

export enum CardArea {
  hand,
  board,
  deck,
}

export type CardPositioningProps = {
  card: CardEntity;
  facing: cardFacing;
  area: CardArea;
  draggable: boolean;
};

function getDragType(card: CardEntity, area: CardArea) {
  if (area == CardArea.board) {
    return DragType.attackTarget;
  }

  if (card.cardType == CardType.targetedSpell) {
    return DragType.castSpell;
  } else {
    return DragType.playCard;
  }
}

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
    isDragging && drag == DragType.playCard ? mouseSlot : cardSlotId(card);

  const slotPosition = useSelector(
    (state: RootState) => state.cardSlots.slotPositions[slot]
  );

  const animationEntityId = cardSlotId(card);
  const { animationStyle, animationElements, onAnimationEnd } =
    useAnimations(animationEntityId);

  // Move this stuff into Card, maybe
  const startDrag = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!draggable) {
        return;
      }
      const dragType = getDragType(card, area);
      dispatch(
        setIsDragging({
          card,
          isDragging: true,
          mousePosition: { x: mouseX, y: mouseY },
          dragSource: { x: mouseX, y: mouseY },
          dragType: getDragType(card, area),
        })
      );
    },
    [card, area, draggable]
  );

  if (!slotPosition) {
    return <Fragment />;
  }

  const style = {
    translate: `${slotPosition.position.x}px ${slotPosition.position.y}px`,
    rotate: slotPosition.rotation,
    zIndex: slotPosition.zIndex,
    ...animationStyle,
  };

  return (
    <>
      <div
        className={`
        absolute 
        top-0 left-0
        hover:!z-50
        hover:scale-110
        w-0
        flex
        justify-center
        ${!isDragging ? "transition-all" : "align-middle"}
        `}
        style={style}
        onAnimationEnd={onAnimationEnd}
      >
        <Card
          card={card}
          facing={facing}
          onMouseDown={(ev) => startDrag(ev.clientX, ev.clientY)}
        />
      </div>
      {animationElements}
    </>
  );
};

export default CardPositioning;
