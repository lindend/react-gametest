import { Fragment } from "react";
import { useDragLayer } from "react-dnd";
import { card } from "../../model/entities/card";
import { cardSlot } from "../../model/entities/cardSlot";
import CardRenderer from "./CardRenderer";

type CardsRendererProps = {
  cards: cardSlot[];
};

const CardsRenderer = ({ cards }: CardsRendererProps) => {
  return (
    <>
      {cards.map((slot) =>
        slot.card ? (
          <CardRenderer
            key={slot.card.id}
            card={slot.card}
            slotId={slot.id}
            canDrag={true}
          />
        ) : (
          <Fragment />
        )
      )}
    </>
  );
};

export default CardsRenderer;
