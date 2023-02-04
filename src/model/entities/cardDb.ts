import { AppListenerEffectAPI, RootState } from "../../store";
import { card } from "./card";

export interface cardDbEntry {
  description: (c: card) => JSX.Element;
  onEndTurn?: (c: card, api: AppListenerEffectAPI) => Promise<void>;
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
