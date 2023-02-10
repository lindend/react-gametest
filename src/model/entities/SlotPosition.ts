import { add, Vector2d } from "../../math/vector2d";

export interface SlotPosition {
  position: Vector2d;
  width: number;
  height: number;
  rotation: string;
  zIndex: string;
}

export function getCenter(slotPosition: SlotPosition) {
  return add(slotPosition.position, { x: 0, y: slotPosition.height / 2 });
}
