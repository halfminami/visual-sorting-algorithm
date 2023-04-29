import { SORTFUNC } from "./sortcommon.js";
import { bubbleSort, mergesort, shakersort } from "./sortfunc.js";

export const WIDTH = 150;
export const HEIGHT = 150;
export const SIZE = 60;
export const sortDict: {
  [key: string]: {
    selector: string;
    sortFunc: SORTFUNC;
    caption: string;
    name: string;
  };
} = {
  bubblesort: {
    selector: ".bubblesort",
    sortFunc: bubbleSort,
    caption: "bubble sort.",
    name: "bubble sort",
  },
  shakersort: {
    selector: ".shakersort",
    sortFunc: shakersort,
    caption: "(cocktail) shaker sort.",
    name: "shaker sort",
  },
  mergesort: {
    selector: ".mergesort",
    sortFunc: mergesort,
    caption: "merge sort.",
    name: "merge sort",
  },
};
