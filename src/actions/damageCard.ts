import { queueAnimation } from "../animation/queueAnimation";
import { attackCard } from "../model/actionsSlice";
import { getCardPosition } from "../model/cardSlotSlice";
import { cardSlotId } from "../model/entities/card";
import { damageEntity } from "../model/gameSlice";
import { AppListenerEffectAPI } from "../store";
import { cardAttackAnimation } from "./animations/cardattack";

export const damageCardAcion = {
  actionCreator: damageEntity,
  effect: async (
    { payload: { target, amount } }: ReturnType<typeof damageEntity>,
    api: AppListenerEffectAPI
  ) => {},
};
