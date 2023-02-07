import { AnyAction } from "@reduxjs/toolkit";
import { playAnimation, animationEnded } from "../model/animationSlice";
import { AppListenerEffectAPI } from "../store";
import { AnimationRegistration } from "./animationDb";
import { getAnimationId } from "./AnimationId";
import { AnimationProperties } from "./AnimationProperties";

export function queueAnimation<T extends AnimationProperties>(
  entityId: string,
  api: AppListenerEffectAPI,
  animation: AnimationRegistration<T>,
  props: T
) {
  const animationId = getAnimationId();
  api.dispatch(
    playAnimation({
      animationId,
      entity: entityId,
      animation: animation.animation,
      props,
    })
  );
  const animationEndedPredicate = (a: AnyAction) => {
    if (a.type != animationEnded.type) {
      return false;
    }
    const { payload } = a as ReturnType<typeof animationEnded>;
    return payload.animationId == animationId;
  };
  return { animationEnded: animationEndedPredicate };
}
