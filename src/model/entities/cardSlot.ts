import { card } from "./card";

export type slotId =
  | undefined
  | "shop_1"
  | "shop_2"
  | "shop_3"
  | "shop_4"
  | "bench_1"
  | "bench_2"
  | "bench_3"
  | "bench_4"
  | "board_front_1";

export type cardSlot = {
  id: slotId;
  card: card | undefined;
};
