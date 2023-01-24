import { HTMLAttributes } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";

interface LifebarProps {
  player: players;
}

export const Lifebar = ({
  player,
  ...rest
}: LifebarProps & HTMLAttributes<HTMLDivElement>) => {
  const hp = useSelector(
    (state: RootState) => state.game.players[player].health
  );
  return (
    <div
      {...rest}
      className="relative flex items-center justify-center h-full w-full"
    >
      <AiFillHeart className="text-red-500 w-full h-full absolute"></AiFillHeart>
      <span className="text-white font-bold text-lg z-10 grow-0">{hp}</span>
    </div>
  );
};
