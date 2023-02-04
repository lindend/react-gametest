import { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { endTurn, players } from "../../model/gameSlice";
import { Button } from "../common/Button";

export const EndTurnButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useDispatch();

  const endTurnAction = () => {
    dispatch(endTurn({ player: players.player }));
  };

  return (
    <div {...props}>
      <Button onClick={endTurnAction} text="End turn" />
    </div>
  );
};
