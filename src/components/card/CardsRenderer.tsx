import { Fragment } from "react";
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
          <CardRenderer card={slot.card} slotId={slot.id} />
        ) : (
          <Fragment />
        )
      )}
    </>
  );
};

export default CardsRenderer;
