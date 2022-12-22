import { slotId } from "../../model/entities/cardSlot";

type CardSlotProps = {
  id: slotId;
};

const CardSlot = ({ id }: CardSlotProps) => {
  return (
    <div
      id={id}
      className="rounded relative border-2 border-dashed border-gray-400 shadow-lg inline-flex flex-col bg-gray-100 p-1 gap-1 w-48 h-60"
    ></div>
  );
};

export default CardSlot;
