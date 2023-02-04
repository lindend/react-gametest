import { Fragment, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsDragging } from "../../model/cardSlotSlice";
import { dropCard } from "../../model/gameSlice";
import { store } from "../../store";

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

export const DragAndDrop = () => {
  const dispatch = useDispatch();

  const stopDragging = useCallback((mouseX: number, mouseY: number) => {
    const state = store.getState();
    const draggedCard = state.cardSlots.draggingCard;

    if (!state.cardSlots.isDragging) {
      return;
    }
    const dragType = state.cardSlots.dragType;

    dispatch(setIsDragging({ isDragging: false, mouseX, mouseY }));

    const dropTargets = getDroppable(mouseX, mouseY);
    if (dropTargets.length > 0 && draggedCard && dragType) {
      dispatch(dropCard({ card: draggedCard, drag: dragType, dropTargets }));
    }
  }, []);

  useEffect(() => {
    const mouseUpListener = (ev: MouseEvent) => {
      stopDragging(ev.clientX, ev.clientY);
    };

    window.addEventListener("mouseup", mouseUpListener);

    return () => {
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, []);

  return <Fragment />;
};
