type CardSlotProps = {
  id: string;
  zIndex: number;
  angle: number;
};

const CardSlot = ({ id, zIndex, angle }: CardSlotProps) => {
  return (
    <div
      id={id}
      style={{ zIndex: zIndex, rotate: `${angle}deg` }}
      className="relative p-1 gap-1 h-40 border-2 border-red-600 border-dashed"
    ></div>
  );
};

export default CardSlot;
