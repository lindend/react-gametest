import { card, cardSlotId as cardSlotId } from "../../model/entities/card";
import CardSlot from "./CardSlot";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { HTMLAttributes } from "react";
import { players } from "../../model/gameSlice";
import { SlotPositionTracker } from "./SlotPositionTracker";

const maxCardAngleFullHand = 8;

const CardHandSlot = ({
  i,
  id,
  angle,
  unitCircleLength,
}: {
  i: number;
  id: string;
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
  const cards = useSelector(
    (state: RootState) => state.game.players[players.player].hand
  );
  const cardSlotPositions = useSelector(
    (state: RootState) => state.cardSlots.slotPositions
  );

  const handSlotPositions = cards
    .map((card) => cardSlotPositions[cardSlotId(card)])
    .filter((slot) => !!slot);
  const numCardSlots = cards.length;
  const maxCardAngle = lerp(3, maxCardAngleFullHand, cards.length / 10);
  const minCardX = Object.values(handSlotPositions).reduce(
    (prev, curr) => Math.min(prev, curr.x),
    0
  );
  const maxCardX = Object.values(handSlotPositions).reduce(
    (prev, curr) => Math.max(prev, curr.x),
    0
  );
  const unitCircleLength =
    (maxCardX - minCardX) / (2 * Math.sin((maxCardAngle / 180) * Math.PI));
  return (
    <>
      <SlotPositionTracker cards={cards} />
      <div
        className="flex flex-row justify-center w-full px-16 overflow-hidden"
        {...props}
      >
        {cards.map((card, i) => (
          <CardHandSlot
            key={card.id}
            id={cardSlotId(card)}
            i={i}
            unitCircleLength={unitCircleLength}
            angle={lerp(-maxCardAngle, maxCardAngle, i / (numCardSlots - 1))}
          />
        ))}
      </div>
    </>
  );
};

export default CardHand;
