import { Card, cardSlotId as cardSlotId } from "../../model/entities/card";
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
  flipped,
}: {
  i: number;
  id: string;
  angle: number;
  unitCircleLength: number;
  flipped: boolean;
}) => {
  const offsetY = unitCircleLength * (1 - Math.cos((angle / 180) * Math.PI));
  return (
    <div
      className="w-halfcard flex-shrink-[10] min-w-0 h-fit"
      style={
        flipped
          ? { marginBottom: `${offsetY}px` }
          : { paddingTop: `${offsetY}px` }
      }
    >
      <CardSlot id={id} zIndex={i} angle={flipped ? -angle : angle}></CardSlot>
    </div>
  );
};

function lerp(min: number, max: number, progress: number): number {
  return Math.max(Math.min(min + (max - min) * progress, max), min);
}

export interface CardHandProps {
  player: players;
  flipped: boolean;
}

export const CardHand = ({
  player,
  flipped,
  ...props
}: CardHandProps & HTMLAttributes<HTMLDivElement>) => {
  const cards = useSelector(
    (state: RootState) => state.game.players[player].hand
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
    (prev, curr) => Math.min(prev, curr.position.x),
    0
  );
  const maxCardX = Object.values(handSlotPositions).reduce(
    (prev, curr) => Math.max(prev, curr.position.x),
    0
  );
  const unitCircleLength =
    (maxCardX - minCardX) / (2 * Math.sin((maxCardAngle / 180) * Math.PI));
  return (
    <div {...props} className="overflow-hidden">
      <SlotPositionTracker cards={cards} />
      <div
        className="flex flex-row justify-center w-full h-full px-16 overflow-hidden"
        style={{ alignItems: flipped ? "flex-end" : "flex-start" }}
      >
        {cards.map((card, i) => (
          <CardHandSlot
            key={card.id}
            id={cardSlotId(card)}
            i={i}
            flipped={flipped}
            unitCircleLength={unitCircleLength}
            angle={lerp(-maxCardAngle, maxCardAngle, i / (numCardSlots - 1))}
          />
        ))}
      </div>
    </div>
  );
};
