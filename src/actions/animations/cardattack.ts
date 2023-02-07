import "./cardattack.css";
import { radToDeg } from "../../math/math";
import {
  vector2d,
  subtract,
  normalize,
  add,
  multiply,
} from "../../math/vector2d";
import { AnimationProperties } from "../../animation/AnimationProperties";
import { AnimationRegistration } from "../../animation/animationDb";

const pullBackLength = 50;

export interface CardAttackAnimationProperties extends AnimationProperties {
  cardPosition: vector2d;
  targetPosition: vector2d;
}
const duration = 0.6;
export const cardAttackAnimation: AnimationRegistration<CardAttackAnimationProperties> =
  {
    animation: { name: "cardAttack" },
    duration,
    style: ({ targetPosition, cardPosition }) => {
      const delta = subtract(targetPosition, cardPosition);
      const normDelta = normalize(delta);
      const rotation = radToDeg(Math.asin(normDelta.x));
      const pullBackPosition = add(
        multiply(normDelta, -pullBackLength),
        cardPosition
      );
      return {
        animationName: "cardattack",
        animationDuration: `${duration}s`,
        animationIterationCount: 1,
        "--card-attack-rotation": `${rotation}deg`,
        "--card-attack-pull-back-position": `${pullBackPosition.x}px ${pullBackPosition.y}px`,
        "--card-attack-target-position": `${targetPosition.x}px ${targetPosition.y}px`,
      };
    },
  };
