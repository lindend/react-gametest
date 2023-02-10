import { AppListenerEffectAPI, RootState } from "../../store";
import { Card } from "./card";
import { Entity } from "./Entity";

export interface CardDbEntry {
  description: (c: Card) => JSX.Element;
  canTarget?: (c: Card, target: any) => boolean;

  onEndTurn?: (c: Card, api: AppListenerEffectAPI) => Promise<void>;
  onCast?: (
    c: Card,
    target: Entity,
    api: AppListenerEffectAPI
  ) => Promise<void>;
}

const cardDb: { [cardTemplateId: string]: CardDbEntry } = {};

export const getCardEntry = (cardTemplateId: string) => cardDb[cardTemplateId];
export const addCardEntry = (cardTemplateId: string, entry: CardDbEntry) => {
  if (!!cardDb[cardTemplateId]) {
    console.error("DUPLICATE CARD REGISTRATION " + cardTemplateId);
    return;
  }
  cardDb[cardTemplateId] = entry;
};
