import { useSelector } from "react-redux";
import { players } from "../../model/gameSlice";
import { RootState } from "../../store";
import { LifeHeart } from "./LifeHeart";

export interface PlayerPortraitProps {
  player: players;
}

export const PlayerPortrait = ({ player }: PlayerPortraitProps) => {
  const health = useSelector(
    (state: RootState) => state.game.players[player].health
  );
  const maxHealth = useSelector(
    (state: RootState) => state.game.players[player].maxHealth
  );
  const portraitUrl = useSelector(
    (state: RootState) => state.game.players[player].portraitUrl
  );

  return (
    <div className="relative h-full w-full">
      <img
        src={portraitUrl}
        draggable="false"
        className="absolute h-[80%] mx-auto inset-x-0 select-none"
      />
      <div className="absolute bottom-0 mx-auto inset-x-0 w-fit">
        <LifeHeart maxHealth={maxHealth} currentHealth={health} />
      </div>
    </div>
  );
};
