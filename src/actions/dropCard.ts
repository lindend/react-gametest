import { dropCard, attackCard, attackPlayer } from "../model/actionsSlice";
import { DragType } from "../model/cardSlotSlice";
import { Card, cardEntityType } from "../model/entities/card";
import { getCardEntry } from "../model/entities/cardDb";
import { dropTarget } from "../model/entities/dropTarget";
import { Entity } from "../model/entities/Entity";
import {
  PlayerType,
  Player,
  newPlayer,
  playerEntityType,
} from "../model/entities/Player";
import {
  playCard,
  getCardById,
  SliceState,
  PlayerState,
  addCardToBoard,
} from "../model/gameSlice";
import { AppListenerEffectAPI, RootState } from "../store";

function getEntity(target: string, state: SliceState): Entity | undefined {
  const cardId = dropTarget.parseCard(target);
  if (cardId != undefined) {
    const targetedCard = getCardById(cardId, state);
    if (targetedCard != undefined) {
      return targetedCard;
    }
  } else {
    const player = dropTarget.parsePlayer(target);
    if (player != undefined) {
      return newPlayer({ playerType: player });
    }
  }
}

async function target(
  dropTargets: string[],
  rootState: RootState,
  targetCard: (target: Card) => {},
  targetPlayer: (target: PlayerType) => {}
) {
  const target = dropTargets[0];
  const state = rootState.game;

  const entityTarget = getEntity(target, state);
  if (entityTarget) {
    switch (entityTarget.type) {
      case playerEntityType:
        targetPlayer((entityTarget as Player).playerType);
        break;
      case cardEntityType:
        targetCard(entityTarget as Card);
        break;
    }
  }
}

function checkAffordsEnergy(card: Card, player: PlayerState) {
  for (let cost of card.cost) {
    const e = player.elements.find((e) => e.element == cost.element);
    if (!e || e.energy < cost.amount) {
      return false;
    }
  }
  return true;
}

export const dropCardAction = {
  actionCreator: dropCard,
  effect: async (
    { payload: { card, drag, dropTargets } }: ReturnType<typeof dropCard>,
    api: AppListenerEffectAPI
  ) => {
    const { getState, dispatch } = api;
    const rootState = getState();
    const state = rootState.game;
    const player = state.players[card.owner];

    if (drag == DragType.playCard) {
      if (!checkAffordsEnergy(card, player)) {
        return;
      }

      dispatch(playCard({ card }));
      dispatch(addCardToBoard({ card, player: card.owner, index: 0 }));
    } else if (drag == DragType.attackTarget) {
      target(
        dropTargets,
        rootState,
        async (target: Card) => {
          await dispatch(attackCard({ source: card, target }));
        },
        async (target: PlayerType) => {
          await dispatch(attackPlayer({ source: card, target }));
        }
      );
    } else if (drag == DragType.castSpell) {
      const cardEntry = getCardEntry(card.templateId);
      if (cardEntry.onCast) {
        const targetEntity = getEntity(dropTargets[0], state);
        if (targetEntity) {
          await cardEntry.onCast(card, targetEntity, api);
          dispatch(playCard({ card }));
        }
      }
    }
  },
};
