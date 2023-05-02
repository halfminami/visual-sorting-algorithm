/**
 * @file config when using `mountAll()`
 */
import { SORTFUNC } from "./sortcommon.js";
import {
  bubbleSort,
  circlesort,
  combsort,
  cyclesort,
  gnomesort,
  heapsort,
  insertionsort,
  insertionsort_bin,
  mergesort,
  mergesort_parallel,
  oddevensort,
  quicksort,
  quicksort_parallel,
  radixsort,
  selectionsort,
  selectionsort_double,
  shakersort,
  shellsort_div2,
  shellsort_div3,
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
  mergesortpara: {
    selector: ".mergesort-para",
    sortFunc: mergesort_parallel,
    caption: "parallel merge",
    name: "merge sort (parallel)",
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
  selectionsort: {
    selector: ".selectionsort",
    sortFunc: selectionsort,
    caption: "selection sort",
    name: "selection sort (simple)",
  },
  selectionsort_d: {
    selector: ".selectionsort-double",
    sortFunc: selectionsort_double,
    caption: "double selection",
    name: "selection sort (double)",
  },
  shellsort_div3: {
    selector: ".shellsort3",
    sortFunc: shellsort_div3,
    caption: "improved shell",
    name: "shell sort (div 3)",
  },
  shellsort_div2: {
    selector: ".shellsort2",
    sortFunc: shellsort_div2,
    caption: "shell sort",
    name: "shell sort (div 2)",
  },
  combsort: {
    selector: ".combsort",
    sortFunc: combsort,
    caption: "comb sort",
    name: "comb sort",
  },
  quicksort: {
    selector: ".quicksort",
    sortFunc: quicksort,
    caption: "quick sort",
    name: "quick sort ((left + right)/2)",
  },
  quicksort_para: {
    selector: ".quicksort-para",
    sortFunc: quicksort_parallel,
    caption: "parallel quick sort",
    name: "quick sort ((left + right)/2) (parallel)",
  },
  circlesort: {
    selector: ".circlesort",
    sortFunc: circlesort,
    caption: "circle sort.",
    name: "circle sort",
  },
  heapsort: {
    selector: ".heapsort",
    sortFunc: heapsort,
    caption: "heap sort",
    name: "heap sort (max heap)",
  },
  oddevensort: {
    selector: ".oddevensort",
    sortFunc: oddevensort,
    caption: "odd even sort",
    name: "odd even sort (parallel)",
  },
  cyclesort: {
    selector: ".cyclesort",
    sortFunc: cyclesort,
    caption: "cycle sort",
    name: "cycle sort (simple)",
  },
};
