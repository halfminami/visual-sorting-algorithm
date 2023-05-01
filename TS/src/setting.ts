import { SORTFUNC } from "./sortcommon.js";
import {
  bubbleSort,
  gnomesort,
  insertionsort,
  insertionsort_bin,
  mergesort,
  radixsort,
  shakersort,
} from "./sortfunc.js";

export const WIDTH = 150;
export const HEIGHT = 150;
export const SIZE = 60;

/** for `wrapAll()` only (not needed when mounting individually) */
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
  gnomesort: {
    selector: ".gnomesort",
    sortFunc: gnomesort,
    caption: "gnome sort.",
    name: "gnome sort",
  },
  radixsort: {
    selector: ".radixsort",
    sortFunc: radixsort,
    caption: "radix sort (ABCDE)",
    name: "radix sort (5)",
  },
  insertionsort: {
    selector: ".insertionsort",
    sortFunc: insertionsort,
    caption: "simple insertion sort",
    name: "insertion sort (simple compare)",
  },
  insertionsort_bs: {
    selector: ".insertionsort-bin",
    sortFunc: insertionsort_bin,
    caption: "binary search insertion",
    name: "insertion sort (binary search)",
  },
};
