import { HTMLAttributes } from "react";
import cardStackUrl from "../../../art/board/cardstack.png";

export const CardStack = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <img
        src={cardStackUrl}
        draggable="false"
        className="h-card w-card select-none drop-shadow-lg"
      />
    </div>
  );
};
