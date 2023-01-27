import { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { endTurn } from "../../model/gameSlice";
import { Button } from "../common/Button";

export const EndTurnButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const dispatch = useDispatch();

  const endTurnAction = () => {
    dispatch(endTurn());
  };

  return (
    <div {...props}>
      <Button onClick={endTurnAction} text="End turn" />
    </div>
  );
};
