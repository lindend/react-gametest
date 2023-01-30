import { Fragment, HTMLAttributes } from "react";
import { card } from "../../model/entities/card";
import cardFrameUrl from "../../../art/board/cardframe.png";
import cardBackUrl from "../../../art/board/cardback.png";
import { ElementIcon } from "./icons/ElementIcon";

export enum cardFacing {
  front,
  back,
}

type CardProps = {
  card: card;
  facing: cardFacing;
};

const CardFront = ({ name, icon, description, cost }: card) => {
  return (
    <>
      <div className="flex justify-between items-center h-3">
        <div className="h-full flex-grow">
          <span className="text-white">{name}</span>
          {/* <svg viewBox="0 0 100 15" className="text-white overflow-visible">
            <text
              x="1"
              y="13"
              fontSize="14pt"
              fontWeight="bold"
              fill="white"
              stroke="black"
              strokeWidth="0"
            >
              {name}
            </text>
          </svg> */}
        </div>
        <div>
          {cost.map((c, i) => (
            <div className="flex items-center" key={i}>
              {c.amount}
              <ElementIcon e={c.element} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="h-1/2 border-2 border-gray-400 shadow-inner bg-gray-200 p-1"
        style={{
          background: `no-repeat center/cover url(${icon})`,
        }}
      ></div>
      <div className="flex-1 border-2 border-gray-400 shadow-inner bg-gray-200 p-1 rounded-b-xl">
        {description}
      </div>
    </>
  );
};

export const Card = ({
  card,
  facing,
  ...rest
}: CardProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="drop-shadow-md hover:drop-shadow-lg transition-all flex-shrink-0 inline-flex flex-col p-2 gap-1 w-card h-card select-none relative"
      {...rest}
    >
      {facing == cardFacing.front ? <CardFront {...card} /> : <Fragment />}
      <img
        src={facing == cardFacing.front ? cardFrameUrl : cardBackUrl}
        draggable="false"
        className="absolute w-full h-full inset-0 -z-10"
      />
    </div>
  );
};
