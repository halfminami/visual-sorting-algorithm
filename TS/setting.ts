import { SORTFUNC } from "./sortcommon.js";
import { bubbleSort, mergesort, shakersort } from "./sortfunc.js";

export const WIDTH = 150;
export const HEIGHT = 150;
export const SIZE = 60;
export const sortDict: {
  [key: string]: {
    /** select which element to mount by `document.querySelector()` */
    selector: string;
    /** the sorting async function  */
    sortFunc: SORTFUNC;
    /** to show sorting name under sorting box */
    caption: string;
    /** to `console.log()` sorting name */
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
