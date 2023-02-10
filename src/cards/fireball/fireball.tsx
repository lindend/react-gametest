import cardIcon from "./fireball.png";
import { addCardEntry, CardDbEntry } from "../../model/entities/cardDb";
import { CardTemplate, CardType } from "../../model/entities/cardTemplate";
import { ElementType } from "../../model/entities/element";
import { Entity } from "../../model/entities/Entity";
import { Card, cardEntityType, cardSlotId } from "../../model/entities/card";
import { AppListenerEffectAPI, RootState } from "../../store";
import { damageEntity } from "../../model/gameSlice";
import { addAnimation } from "../../animation/animationDb";
import { fireballDamageAnimation } from "./fireballAnimation";
import { queueAnimation } from "../../animation/queueAnimation";
import { getCardPosition } from "../../model/cardSlotSlice";
import { getCenter, SlotPosition } from "../../model/entities/SlotPosition";
import { playerEntityType } from "../../model/entities/Player";

const fireballDamage = 5;

export const fireball: CardTemplate = {
  templateId: "fireball",
  name: "Fireball",
  cost: [{ element: ElementType.fire, amount: 3 }],
  picture: cardIcon,
  cardType: CardType.targetedSpell,
  attack: 0,
  health: 0,
};

function getEntityPosition(state: RootState, target: Entity): SlotPosition {
  if (target.type == cardEntityType) {
    return getCardPosition(state, target as Card);
  } else if (target.type == playerEntityType) {
    return {
      position: { x: 566, y: 182 },
      height: 0,
      width: 145,
      rotation: "0deg",
      zIndex: "0",
    };
  } else {
    return {
      height: 0,
      position: { x: 0, y: 0 },
      rotation: "0deg",
      width: 0,
      zIndex: "0",
    };
  }
}

export const fireballCardEntry: CardDbEntry = {
  description: () => <>Deal {fireballDamage} damage to target.</>,
  canTarget: (c: Card, target: Entity) => {
    return true;
  },
  onCast: async (card: Card, target: Entity, api: AppListenerEffectAPI) => {
    const state = api.getState();
    const { animationEnded } = queueAnimation(
      cardSlotId(card),
      api,
      fireballDamageAnimation,
      {
        source: getCardPosition(state, card).position,
        target: getCenter(getEntityPosition(state, target)),
      }
    );
    await api.condition(animationEnded);
    api.dispatch(damageEntity({ target: target, amount: fireballDamage }));
  },
};

export const registerFireball = () => {
  addCardEntry(fireball.templateId, fireballCardEntry);
  addAnimation(fireballDamageAnimation);
};
