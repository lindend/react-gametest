import { CSSProperties, Fragment } from "react";
import { Animation } from "./Animation";
import { AnimationProperties } from "./AnimationProperties";

export type PropertyGenerator<T extends AnimationProperties> = (
  props: T,
  duration: number
) => CSSProperties;
export type ElementGenerator<T extends AnimationProperties> = (
  props: T,
  duration: number
) => JSX.Element;

export interface AnimationDbEntry {
  duration: number;
  properties: PropertyGenerator<AnimationProperties>;
  elements: ElementGenerator<AnimationProperties>;
}

export interface AnimationRegistration<T extends AnimationProperties> {
  animation: Animation<T>;
  duration: number;
  style: (props: T, duration: number) => CSSProperties;
  elements?: (props: T, duration: number) => JSX.Element;
}

const animationDb: { [animationName: string]: AnimationDbEntry } = {};

export const getAnimation = (animationName: string) =>
  animationDb[animationName];

export function addAnimation<T extends AnimationProperties>({
  animation,
  duration,
  style,
  elements,
}: AnimationRegistration<T>) {
  if (!!animationDb[animation.name]) {
    console.error("DUPLICATE ANIMATION REGISTRATION " + animation.name);
    return;
  }

  if (elements == undefined) {
    elements = (_) => <Fragment />;
  }

  animationDb[animation.name] = {
    duration,
    properties: (props) => {
      const typedProps = props as T;
      return style(typedProps, duration);
    },
    elements: (props) => {
      const typedProps = props as T;
      return elements!(typedProps, duration);
    },
  };
}
