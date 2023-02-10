import { useSelector } from "react-redux";
import { DragType, mouseSlot } from "../../model/cardSlotSlice";
import { RootState } from "../../store";
import arrowHeadUrl from "../../../art/board/arrow_head.png";
import arrowLineUrl from "../../../art/board/arrow_line.png";
import arrowEndUrl from "../../../art/board/arrow_end.png";
import { Fragment } from "react";

const linePosOffset = 20;
const mousePosXOffset = 27;

export const DragTarget = () => {
  const isDragging = useSelector(
    (state: RootState) => state.cardSlots.isDragging
  );
  const mouseSlotPos = useSelector(
    (state: RootState) => state.cardSlots.slotPositions[mouseSlot]
  );
  const dragSource = useSelector(
    (state: RootState) => state.cardSlots.dragStart
  );
  const drag = useSelector((state: RootState) => state.cardSlots.dragType);
  // const dragSource = { x: 100, y: 100 };
  // const mousePos = { x: 400, y: 330 };
  if (!isDragging || !dragSource || drag == DragType.playCard) {
    return <Fragment />;
  }

  const mousePos = {
    x: mouseSlotPos.position.x - mousePosXOffset,
    y: mouseSlotPos.position.y,
  };

  const dx = mousePos.x - dragSource.x;
  const dy = mousePos.y - dragSource.y;
  const dragLineLength = Math.sqrt(dx * dx + dy * dy);

  const linePos = {
    x: mousePos.x - (dx / dragLineLength) * linePosOffset,
    y: mousePos.y - (dy / dragLineLength) * linePosOffset,
  };
  let rotation = Math.acos(dx / dragLineLength) + Math.PI / 2;
  if (dy < 0) {
    rotation = Math.PI - rotation;
  }
  rotation = (rotation * 180) / Math.PI;
  return (
    <div className="pointer-events-none">
      <div
        className="absolute pixelated w-14 h-10 bg-contain bg-no-repeat z-[102]"
        draggable="false"
        style={{
          backgroundImage: `url(${arrowHeadUrl})`,
          translate: `${mousePos.x}px ${mousePos.y}px`,
          transformOrigin: "top",
          rotate: `${rotation}deg`,
        }}
      />
      <div
        className="absolute pixelated w-14 bg-contain bg-repeat-y z-[100]"
        draggable="false"
        style={{
          height: `${dragLineLength - 20}px`,
          backgroundImage: `url(${arrowLineUrl})`,
          translate: `${linePos.x}px ${linePos.y}px`,
          transformOrigin: "top",
          rotate: `${rotation}deg`,
        }}
      />
      <div
        className="absolute pixelated w-14 h-10 bg-contain bg-no-repeat z-[101]"
        draggable="false"
        style={{
          backgroundImage: `url(${arrowEndUrl})`,
          translate: `${dragSource.x}px ${dragSource.y}px`,
          transformOrigin: "top",
          rotate: `${rotation}deg`,
        }}
      />
    </div>
  );
};
