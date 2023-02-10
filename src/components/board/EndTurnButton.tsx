import { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { endTurn } from "../../model/actionsSlice";
import { PlayerType } from "../../model/entities/Player";
import { Button } from "../common/Button";

export const EndTurnButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useDispatch();

  const endTurnAction = () => {
    dispatch(endTurn({ player: PlayerType.player }));
  };

  return (
    <div {...props}>
      <Button onClick={endTurnAction} text="End turn" />
    </div>
  );
};
