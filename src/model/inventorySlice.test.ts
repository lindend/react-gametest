import { card } from "./entities/card";
import { cardSlot, slotId } from "./entities/cardSlot";
import reducer, {
  buyCard,
  moveCard,
  initialState,
  sliceState,
} from "./inventorySlice";

const makeCard = (id: number, costGold: number, costSpirit: number): card => {
  return {
    id,
    costGold,
    costSpirit,
    name: "test",
  };
};

const makeCardSlot = (id: slotId, card: card): cardSlot => {
  return {
    id,
    card,
  };
};

const defaultSlotId = undefined;

describe("inventorySlice", () => {
  describe("buyCard", () => {
    it("adds a card and reduces resources", () => {
      const card = makeCard(1, 3, 4);

      const state: sliceState = {
        ...initialState,
        gold: 10,
        spirit: 5,
        shop: [makeCardSlot(["shop", "1"], card)],
      };

      const result = reducer(state, buyCard({ card, slotId: defaultSlotId }));

      expect(result).toEqual({
        ...initialState,
        gold: 7,
        spirit: 1,
        shop: [],
        bench: initialState.bench.map((b) =>
          b.id === ["bench", "1"] ? { ...b, card } : b
        ),
      });
    });

    it("does not buy card with insufficient gold", () => {
      const card: card = makeCard(1, 2, 0);

      const state: sliceState = {
        ...initialState,
        gold: 1,
        shop: [makeCardSlot(["shop", "1"], card)],
      };

      const result = reducer(state, buyCard({ card, slotId: defaultSlotId }));

      expect(result).toEqual({
        ...state,
      });
    });

    it("does not buy a card with insufficient spirit", () => {
      const card: card = makeCard(1, 0, 2);

      const state: sliceState = {
        ...initialState,
        spirit: 1,
        shop: [makeCardSlot(["shop", "1"], card)],
      };

      const result = reducer(state, buyCard({ card, slotId: defaultSlotId }));

      expect(result).toEqual({
        ...state,
      });
    });

    it("does not buy a card if bench is full", () => {
      const shopCard = makeCard(5, 1, 1);

      const state: sliceState = {
        ...initialState,
        spirit: 1,
        gold: 1,
        shop: [makeCardSlot(["shop", "1"], shopCard)],
        bench: [
          {
            id: ["bench", "1"],
            card: makeCard(6, 1, 1),
          },
        ],
      };

      const result = reducer(
        state,
        buyCard({ card: shopCard, slotId: defaultSlotId })
      );

      expect(result).toEqual({
        ...state,
      });
    });

    it("does not buy card if does not exist in shop", () => {
      const card = makeCard(1, 1, 1);

      const state: sliceState = {
        ...initialState,
        spirit: 1,
        gold: 1,
        shop: [],
      };

      const result = reducer(state, buyCard({ card, slotId: defaultSlotId }));

      expect(result).toEqual({
        ...state,
      });
    });
  });
  describe("moveCard", () => {
    it("swaps places of cards in bench", () => {
      const card1 = makeCard(1, 1, 1);
      const card2 = makeCard(2, 2, 2);

      const state: sliceState = {
        ...initialState,
        bench: [
          {
            id: ["bench", "1"],
            card: card1,
          },
          {
            id: ["bench", "2"],
            card: card2,
          },
        ],
      };

      const result = reducer(
        state,
        moveCard({ card: card1, slotId: ["bench", "2"] })
      );

      expect(result).toEqual({
        ...initialState,
        bench: [
          {
            id: ["bench", "1"],
            card: card2,
          },
          {
            id: ["bench", "2"],
            card: card1,
          },
        ],
      });
    });
  });
});
