import { IconContext } from "react-icons/lib";
import { GiTwoCoins, GiPrayerBeads } from "react-icons/gi";
import { HTMLAttributes } from "react";

type CardProps = {
  name: string;
  icon: JSX.Element;
  description: string;
  costGold: number;
  costSpirit: number;
};

const Card = ({
  name,
  icon,
  description,
  costGold,
  costSpirit,
  ...rest
}: CardProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className="rounded relative border-4 border-gray-700 shadow-lg flex-shrink-0 inline-flex flex-col bg-gray-100 p-1 gap-1 w-30 h-40 select-none"
    {...rest}
  >
    <div className="flex justify-between">
      <h5>{name}</h5>
      <div className="flex items-end">
        {costGold}
        <span className="text-yellow-600">
          <GiTwoCoins />
        </span>
        {costSpirit}
        <span className="text-blue-600">
          <GiPrayerBeads />
        </span>
      </div>
    </div>
    <div className="h-1/2 border-2 border-gray-400 shadow-inner bg-gray-200 p-1">
      <IconContext.Provider value={{ className: "w-full h-full" }}>
        {icon}
      </IconContext.Provider>
    </div>
    <div className="flex-1 border-2 border-gray-400 shadow-inner bg-gray-200 p-1">
      {description}
    </div>
  </div>
);

export default Card;
