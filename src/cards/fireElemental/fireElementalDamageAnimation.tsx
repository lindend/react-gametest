import "./fireElementalDamageAnimation.css";
import projectileUrl from "./fire_projectile.png";
import { CSSProperties } from "react";
import {
  Vector2d,
  subtract,
  normalize,
  add,
  multiply,
  toPixelPosition,
} from "../../math/vector2d";
import { AnimationProperties } from "../../animation/AnimationProperties";
import { AnimationRegistration } from "../../animation/animationDb";

const arcHeight = 50;

export interface FireElementalDamageAnimationProperties
  extends AnimationProperties {
  cardPosition: Vector2d;
  targetPosition0?: Vector2d;
  targetPosition1?: Vector2d;
}

const SparkElement = (target: Vector2d, cardPosition: Vector2d) => {
  const delta = subtract(target, cardPosition);
  const rotation = delta.x > 0 ? 0 : 180;
  return (
    <div
      className="absolute z-[200] top-0 left-0 w-5 h-5 select-none pointer-events-none"
      style={
        {
          background: `no-repeat center/cover url(${projectileUrl})`,
          animationName: "fireelemental_damage_spark",
          animationDuration: `${duration}s`,
          animationIterationCount: 1,
          animationTimingFunction: "ease-in",
          "--fire-elemental-damage-card-position": "0 0",
          "--fire-elemental-damage-target-position": toPixelPosition(
            subtract(target, cardPosition)
          ),
          "--fire-elemental-damage-rotation": `${rotation}deg`,
        } as CSSProperties
      }
    >
      <img src={projectileUrl} className="w-full h-full" draggable="false" />
    </div>
  );
};

const duration = 0.3;

export const fireElementalDamageAnimation: AnimationRegistration<FireElementalDamageAnimationProperties> =
  {
    animation: {
      name: "fireelemental_damage",
    },
    duration,
    style: ({ cardPosition }) => {
      return {
        animationName: "fireelemental_damage",
        animationDuration: `${duration}s`,
        animationIterationCount: 1,
      } as CSSProperties;
    },
    elements: ({ targetPosition0, targetPosition1, cardPosition }) => {
      return (
        <div>
          {targetPosition0 && SparkElement(targetPosition0, cardPosition)}
          {targetPosition1 && SparkElement(targetPosition1, cardPosition)}
        </div>
      );
    },
  };
