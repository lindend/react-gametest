import { AppListenerEffectAPI, RootState } from "../../store";
import { Card } from "./card";

export interface cardDbEntry {
  description: (c: Card) => JSX.Element;
  onEndTurn?: (c: Card, api: AppListenerEffectAPI) => Promise<void>;
}

const cardDb: { [cardTemplateId: string]: cardDbEntry } = {};

export const getCardEntry = (cardTemplateId: string) => cardDb[cardTemplateId];
export const addCardEntry = (cardTemplateId: string, entry: cardDbEntry) => {
  if (!!cardDb[cardTemplateId]) {
    console.error("DUPLICATE CARD REGISTRATION " + cardTemplateId);
    return;
  }
  cardDb[cardTemplateId] = entry;
};
