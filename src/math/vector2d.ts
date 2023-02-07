export type vector2d = {
  x: number;
  y: number;
};

export function length(v: vector2d) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: vector2d) {
  const len = length(v);
  return { x: v.x / len, y: v.y / len };
}

export function subtract(v0: vector2d, v1: vector2d) {
  return { x: v0.x - v1.x, y: v0.y - v1.y };
}

export function multiply(v: vector2d, c: number) {
  return { x: v.x * c, y: v.y * c };
}

export function add(v0: vector2d, v1: vector2d) {
  return { x: v0.x + v1.x, y: v0.y + v1.y };
}

export function toPixelPosition(v: vector2d) {
  return `${v.x}px ${v.y}px`;
}
