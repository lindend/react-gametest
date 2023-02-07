import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimationProperties } from "../animation/AnimationProperties";
import { Animation } from "../animation/Animation";

export type AnimationPlayState = {
  id: number;
  name: string;
  props: AnimationProperties;
};

export type sliceState = {
  animations: { [entity: string]: AnimationPlayState[] };
};

const initialState: sliceState = {
  animations: {},
};

const animationSlice = createSlice({
  name: "animation",
  initialState: initialState,
  reducers: {
    playAnimationReducer(
      state,
      {
        payload: { animationId, entity, animation, props },
      }: PayloadAction<{
        animationId: number;
        entity: string;
        animation: string;
        props: AnimationProperties;
      }>
    ) {
      state.animations[entity] = [
        {
          id: animationId,
          name: animation,
          props,
        },
      ];
    },
    animationEnded(
      state,
      {
        payload: { entity, animationId },
      }: PayloadAction<{ entity: string; animationId: number }>
    ) {
      const animations = state.animations[entity];
      if (animations) {
        const filteredAnimations = animations.filter(
          (a) => a.id != animationId
        );
        if (filteredAnimations.length > 0) {
          state.animations[entity] = filteredAnimations;
        } else {
          delete state.animations[entity];
        }
      }
    },
  },
});

const { playAnimationReducer } = animationSlice.actions;

type PlayAnimationPayload<T extends AnimationProperties> = {
  animationId: number;
  entity: string;
  animation: Animation<T>;
  props: T;
};
export function playAnimation<T extends AnimationProperties>({
  animationId,
  entity,
  animation,
  props,
}: PlayAnimationPayload<T>) {
  return playAnimationReducer({
    animationId,
    entity,
    animation: animation.name,
    props,
  });
}

export const { animationEnded } = animationSlice.actions;

export default animationSlice.reducer;
