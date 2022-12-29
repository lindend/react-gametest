import { card } from "../../model/entities/card";
import { elementId, slotId } from "../../model/entities/cardSlot";
import CardRenderer from "./CardRenderer";
import CardSlot from "./CardSlot";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { HTMLAttributes } from "react";

const maxCardAngleFullHand = 8;

const CardHandSlot = ({
  i,
  id,
  angle,
  unitCircleLength,
}: {
  i: number;
  id: slotId;
  angle: number;
  unitCircleLength: number;
}) => {
  const offsetY = unitCircleLength * (1 - Math.cos((angle / 180) * Math.PI));
  return (
    <div
      className="w-24 flex-shrink-[10] min-w-0"
      style={{ paddingTop: `${offsetY}px` }}
    >
      <CardSlot id={id} zIndex={i} angle={angle}></CardSlot>
    </div>
  );
};

function lerp(min: number, max: number, progress: number): number {
  return Math.max(Math.min(min + (max - min) * progress, max), min);
}

const CardHand = (props: HTMLAttributes<HTMLDivElement>) => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const cardSlots = useSelector((state: RootState) => state.cards.cardSlots);
  const cardSlotPositions = useSelector(
    (state: RootState) => state.cards.slotPositions
  );

  const numCardSlots = Object.keys(cardSlots).length;
  const maxCardAngle = lerp(3, maxCardAngleFullHand, cards.length / 10);
  const minCardX = Object.values(cardSlotPositions).reduce(
    (prev, curr) => Math.min(prev, curr.x),
    0
  );
  const maxCardX = Object.values(cardSlotPositions).reduce(
    (prev, curr) => Math.max(prev, curr.x),
    0
  );
  const unitCircleLength =
    (maxCardX - minCardX) / (2 * Math.sin((maxCardAngle / 180) * Math.PI));
  return (
    <>
      <div className="flex flex-row justify-center w-full px-16" {...props}>
        {Object.values(cardSlots).map((slotId, i) => (
          <CardHandSlot
            key={elementId(slotId)}
            id={slotId}
            i={i}
            unitCircleLength={unitCircleLength}
            angle={lerp(-maxCardAngle, maxCardAngle, i / (numCardSlots - 1))}
          />
        ))}
      </div>
      {cards.map((card, i) => (
        <CardRenderer
          canDrag={true}
          key={card.id}
          slotId={cardSlots[card.id]}
          card={card}
        ></CardRenderer>
      ))}
    </>
  );
};

export default CardHand;
