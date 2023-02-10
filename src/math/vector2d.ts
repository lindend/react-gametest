export type Vector2d = {
  x: number;
  y: number;
};

export function length(v: Vector2d) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vector2d) {
  const len = length(v);
  return { x: v.x / len, y: v.y / len };
}

export function subtract(v0: Vector2d, v1: Vector2d) {
  return { x: v0.x - v1.x, y: v0.y - v1.y };
}

export function multiply(v: Vector2d, c: number) {
  return { x: v.x * c, y: v.y * c };
}

export function add(v0: Vector2d, v1: Vector2d) {
  return { x: v0.x + v1.x, y: v0.y + v1.y };
}

export function toPixelPosition(v: Vector2d) {
  return `${v.x}px ${v.y}px`;
}
