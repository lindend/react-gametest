import { cardAttackAnimation } from "./animations/cardattack";
import { addAnimation } from "../animation/animationDb";

export const registerActionAnimations = () => {
  addAnimation(cardAttackAnimation);
};
