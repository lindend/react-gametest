import { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { cardSlotId } from "../../model/entities/card";
import { dropTarget } from "../../model/entities/dropTarget";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import CardSlot from "../card/CardSlot";
import { SlotPositionTracker } from "../card/SlotPositionTracker";

export const PlayerBoard = (props: HTMLAttributes<HTMLDivElement>) => {
  const cards = useSelector(
    (state: RootState) => state.game.players[players.player].board
  );
  return (
    <div
      className="bg-slate-300 opacity-40"
      {...props}
      drop-target={dropTarget.playerBoard}
    >
      <SlotPositionTracker cards={cards} />
      <div className="flex flex-row justify-center w-full px-16" {...props}>
        {cards.map((card) => (
          <div className="w-44">
            <CardSlot
              key={card.id}
              id={cardSlotId(card)}
              zIndex={0}
              angle={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
