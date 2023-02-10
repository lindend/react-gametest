import { normalize, Vector2d } from "./vector2d";

export function radToDeg(rad: number) {
  return (rad / Math.PI) * 180;
}

export function rotationFromDelta(delta: Vector2d) {
  const normalized = normalize(delta);
  let angle = Math.acos(normalized.x);
  if (normalized.y < 0) {
    angle = 2 * Math.PI - angle;
  }
  return radToDeg(angle);
}
