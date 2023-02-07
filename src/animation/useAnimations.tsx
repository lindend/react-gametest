import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animationEnded } from "../model/animationSlice";
import { RootState } from "../store";
import { getAnimation } from "./animationDb";

export function useAnimations(entityId: string) {
  const dispatch = useDispatch();
  const animations = useSelector(
    (state: RootState) => state.animation.animations[entityId]
  );

  if (!animations || animations.length == 0) {
    return {
      animationElements: <Fragment />,
      animationStyle: {},
      onAnimationEnd: () => {},
    };
  }

  // Only displaying the first animation for now
  const animation = animations[0];
  const animationEntry = getAnimation(animation.name);
  const animationStyle = animationEntry.properties(animation.props);
  const animationElements = animationEntry.elements(animation.props);
  const onAnimationEnd = () => {
    dispatch(animationEnded({ entity: entityId, animationId: animation.id }));
  };

  return {
    animationElements,
    animationStyle,
    onAnimationEnd,
  };
}
