import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSlotPosition, slotPosition } from "../../model/cardSlice";
import { elementId } from "../../model/entities/cardSlot";

export const SlotPositionTracker = () => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const cardSlots = useSelector((state: RootState) => state.cards.cardSlots);
  const dispatch = useDispatch();
  useEffect(() => {
    for (let card of cards) {
      const slotId = cardSlots[card.id];
      const slotElement = document.getElementById(elementId(slotId));
      if (!slotElement) {
        continue;
      }

      const slotPosition: slotPosition = {
        x: slotElement.offsetLeft + slotElement.offsetWidth / 2,
        y: slotElement.offsetTop,
        width: slotElement.offsetWidth,
        height: slotElement.offsetHeight,
        rotation: slotElement.style.rotate,
        zIndex: slotElement.style.zIndex,
      };
      dispatch(setSlotPosition({ slotId: slotId, position: slotPosition }));
    }
  });

  return <></>;
};
