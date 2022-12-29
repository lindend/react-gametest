import { elementId, slotId } from "../../model/entities/cardSlot";

type CardSlotProps = {
  id: slotId;
  zIndex: number;
  angle: number;
};

const CardSlot = ({ id, zIndex, angle }: CardSlotProps) => {
  return (
    <div
      id={elementId(id)}
      style={{zIndex: zIndex, rotate: `${angle}deg`}}
      className="relative p-1 gap-1 h-40 border-2 border-red-600 border-dashed"
    ></div>
  );
};

export default CardSlot;
