import { useDrop } from "react-dnd";
import { card } from "../../model/entities/card";
import { slotId } from "../../model/entities/cardSlot";

type CardSlotProps = {
  id: slotId;
  onDrop: (card: card, slotId: slotId) => void;
};

const CardSlot = ({ id, onDrop }: CardSlotProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Card",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item) => onDrop(item as card, id),
  }));

  return (
    <div
      id={id?.join("-")}
      ref={drop}
      className={`rounded relative border-2 border-dashed border-gray-400 shadow-lg inline-flex flex-col ${
        isOver ? "bg-blue-200" : "bg-gray-100"
      } p-1 gap-1 w-48 h-60`}
    ></div>
  );
};

export default CardSlot;
