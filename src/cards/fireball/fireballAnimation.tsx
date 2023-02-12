import "./fireballAnimation.css";
import projectileUrl from "./fireball_projectile.png";
import splashUrl from "./fireball_splash.png";
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
import { rotationFromDelta } from "../../math/math";

export interface FireballProjectileAnimationProperties
  extends AnimationProperties {
  source: Vector2d;
  target: Vector2d;
}

function FireballProjectile(
  source: Vector2d,
  target: Vector2d,
  rotation: number,
  duration: number
) {
  return (
    <div
      className="absolute z-[200] top-0 left-0 w-0 h-0 select-none pointer-events-none"
      style={
        {
          background: `no-repeat center/cover url(${projectileUrl})`,
          animationName: "fireball_projectile",
          animationDuration: `${duration}s`,
          animationIterationCount: 1,
          animationTimingFunction: "cubic-bezier(.66,-0.03,.94,.74)",
          "--fireball-source-position": toPixelPosition(source),
          "--fireball-target-position": toPixelPosition(target),
        } as CSSProperties
      }
    >
      <div className="w-32 h-32 translate-x-[-50%]">
        <img
          src={projectileUrl}
          style={{ rotate: `${rotation}deg` }}
          className="w-full h-full"
          draggable="false"
        />
      </div>
    </div>
  );
}

function FireballSplash(target: Vector2d, duration: number) {
  return (
    <div
      className="absolute z-[200] top-0 left-0 w-0 h-0 select-none pointer-events-none"
      style={
        {
          background: `no-repeat center/cover url(${splashUrl})`,
          animationName: "fireball_splash",
          animationDuration: `${duration}s`,
          animationIterationCount: 1,
          animationTimingFunction: "cubic-bezier(.66,-0.03,.94,.74)",
          "--fireball-target-position": toPixelPosition(target),
        } as CSSProperties
      }
    >
      <div className="w-64 h-64 translate-x-[-50%]">
        <img src={splashUrl} className="w-full h-full" draggable="false" />
      </div>
    </div>
  );
}

const FireballElement = (
  source: Vector2d,
  target: Vector2d,
  duration: number
) => {
  const delta = subtract(target, source);
  const rotation = rotationFromDelta(delta);
  return (
    <>
      {FireballProjectile(source, target, rotation, duration)}
      {FireballSplash(target, duration)}
    </>
  );
};

const default_duration = 2.0;

export const fireballDamageAnimation: AnimationRegistration<FireballProjectileAnimationProperties> =
  {
    animation: {
      name: "fireball_animation",
    },
    duration: default_duration,
    style: (_, duration) => {
      return {
        animationName: "fireball_cast",
        animationDuration: `${duration}s`,
        animationIterationCount: 1,
      } as CSSProperties;
    },
    elements: ({ source, target }, duration) => {
      return <>{FireballElement(source, target, duration)}</>;
    },
  };
