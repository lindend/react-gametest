import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSlotPositions, slotPosition } from "../../model/cardSlotSlice";
import { Card, cardSlotId } from "../../model/entities/card";

export const SlotPositionTracker = (props: { cards: Card[] }) => {
  const { cards } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const cardPositions = cards
      .map((card) => {
        const slotElement = document.getElementById(cardSlotId(card));
        if (!slotElement) {
          return undefined;
        }

        const slotPosition: slotPosition = {
          position: {
            x: slotElement.offsetLeft + slotElement.offsetWidth / 2,
            y: slotElement.offsetTop,
          },
          width: slotElement.offsetWidth,
          height: slotElement.offsetHeight,
          rotation: slotElement.style.rotate,
          zIndex: slotElement.style.zIndex,
        };
        return { id: cardSlotId(card), position: slotPosition };
      })
      .filter((p) => !!p) as { id: string; position: slotPosition }[];

    dispatch(setSlotPositions(cardPositions));
  }, [cards]);

  return <></>;
};
