import { Entity } from "./Entity";

export const playerEntityType = "player";

export enum PlayerType {
  player = "player",
  opponent = "opponent",
}

export interface Player extends Entity {
  playerType: PlayerType;
}

export function newPlayer(props: Omit<Player, "type">): Player {
  return {
    type: playerEntityType,
    ...props,
  };
}

export type PlayerTypes = `${PlayerType}`;
