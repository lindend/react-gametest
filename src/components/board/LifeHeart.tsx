import lifeHeartUrl from "../../../art/board/life_heart.png";
import lifeRedUrl from "../../../art/board/life_red.png";
import lifeEmptyUrl from "../../../art/board/life_empty.png";

export interface LifeHeartProps {
  currentHealth: number;
  maxHealth: number;
}

export const LifeHeart = ({ currentHealth, maxHealth }: LifeHeartProps) => {
  const healthFraction =
    1 - Math.max(Math.min(currentHealth / maxHealth, 1.0), 0.0);
  const healthPercent = Math.round(healthFraction * 100);
  return (
    <div className="relative w-20 h-20 select-none">
      <img src={lifeRedUrl} className="absolute top-0 w-full h-full" />
      <div
        className=" absolute top-0 overflow-hidden w-full"
        style={{ height: `${healthPercent}%` }}
      >
        <img src={lifeEmptyUrl} className="w-full" />
      </div>
      <img
        src={lifeHeartUrl}
        className="absolute w-full h-full drop-shadow-md"
      />
      <div className="text-white absolute top-0 w-full h-full flex justify-center items-center">
        <span className="select-none text-4xl">{currentHealth}</span>
      </div>
    </div>
  );
};
