import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMousePosition } from "../../model/cardSlotSlice";
import { store } from "../../store";

export const MouseSlotPositionTracker = () => {
  const dispatch = useDispatch();
  // const isDragging = useSelector((state: RootState) => state.cards.isDragging);
  useEffect(() => {
    document.addEventListener("mousemove", (ev) => {
      const isDragging = store.getState().cardSlots.isDragging;
      if (isDragging) {
        dispatch(setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY }));
      }
    });
  }, []);
  return <></>;
};
