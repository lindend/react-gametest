export enum targetType {
  friendlyBoard,
  enemyBoard,
  friendlyUnit,
  enemyUnit,
}

export interface target {
  type: targetType;
}
