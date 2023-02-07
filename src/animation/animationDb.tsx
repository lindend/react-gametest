import { CSSProperties, Fragment } from "react";
import { Animation } from "./Animation";
import { AnimationProperties } from "./AnimationProperties";

export type PropertyGenerator = (props: AnimationProperties) => CSSProperties;
export type ElementGenerator = (props: AnimationProperties) => JSX.Element;

export interface AnimationDbEntry {
  properties: PropertyGenerator;
  elements: ElementGenerator;
}

export interface AnimationRegistration<T extends AnimationProperties> {
  animation: Animation<T>;
  duration: number;
  style: (props: T) => CSSProperties;
  elements?: (props: T) => JSX.Element;
}

const animationDb: { [animationName: string]: AnimationDbEntry } = {};

export const getAnimation = (animationName: string) =>
  animationDb[animationName];

export function addAnimation<T extends AnimationProperties>({
  animation,
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
    properties: (props) => {
      const typedProps = props as T;
      return style(typedProps);
    },
    elements: (props) => {
      const typedProps = props as T;
      return elements!(typedProps);
    },
  };
}
