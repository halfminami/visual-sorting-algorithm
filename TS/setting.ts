import { SORTFUNC } from "./sortcommon.js";
import { bubbleSort } from "./sortfunc.js";

export const WIDTH = 150;
export const HEIGHT = 150;
export const SIZE = 60;
export const sortDict: {
  [key: string]: {
    selector: string;
    sortFunc: SORTFUNC;
    caption: string;
  };
} = {
  bubblesort: {
    selector: ".bubblesort",
    sortFunc: bubbleSort,
    caption: "bubble sort.",
  },
};

export const swapSleep = 300;
