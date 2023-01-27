import { IconContext } from "react-icons/lib";
import { GiTwoCoins, GiPrayerBeads } from "react-icons/gi";
import { HTMLAttributes } from "react";
import { card } from "../../model/entities/card";
import cardFrameUrl from "../../../art/board/cardframe.png";

type CardProps = {
  card: card;
};

const Card = ({
  card,
  ...rest
}: CardProps & HTMLAttributes<HTMLDivElement>) => {
  const { name, icon, description, costGold, costSpirit } = card;

  return (
    <div
      className="shadow-lg flex-shrink-0 inline-flex flex-col p-2 gap-1 w-40 h-60 select-none relative"
      {...rest}
    >
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
        <div className="flex items-center">
          {costGold}
          <div className="text-yellow-600">
            <GiTwoCoins />
          </div>
          {costSpirit}
          <span className="text-blue-600">
            <GiPrayerBeads />
          </span>
        </div>
      </div>
      <div
        className="h-1/2 border-2 border-gray-400 shadow-inner bg-gray-200 p-1"
        style={{
          background: `no-repeat center/cover url(${card.icon})`,
        }}
      ></div>
      <div className="flex-1 border-2 border-gray-400 shadow-inner bg-gray-200 p-1 rounded-b-xl">
        {description}
      </div>
      <img
        src={cardFrameUrl}
        className="absolute w-full h-full inset-0 -z-10"
      />
    </div>
  );
};

export default Card;
