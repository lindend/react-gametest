import { HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { cardSlotId } from "../../model/entities/card";
import { dropTarget } from "../../model/entities/dropTarget";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import CardSlot from "../card/CardSlot";
import { SlotPositionTracker } from "../card/SlotPositionTracker";

export interface PlayerBoardProps {
  player: players;
}

export const PlayerBoard = ({
  player,
  ...props
}: PlayerBoardProps & HTMLAttributes<HTMLDivElement>) => {
  const cards = useSelector(
    (state: RootState) => state.game.players[player].board
  );
  return (
    <div
      className="bg-slate-300 opacity-40"
      {...props}
      drop-target={player == players.player ? dropTarget.playerBoard : null}
    >
      <SlotPositionTracker cards={cards} />
      <div
        className="flex flex-row justify-center w-full h-full px-16 py-4"
        {...props}
      >
        {cards.map((card) => (
          <div className="w-card" key={card.id}>
            <CardSlot id={cardSlotId(card)} zIndex={0} angle={0} />
          </div>
        ))}
      </div>
    </div>
  );
};
