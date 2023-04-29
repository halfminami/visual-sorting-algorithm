import { SIZE, WIDTH, HEIGHT, sortDict } from "./setting.js";
import {
  SORTFUNC,
  initUnit,
  insertSortBox,
  randomArray,
  CONTROLS,
  controlForms,
  arrswapClock,
} from "./sortcommon.js";

export function mountAll(size = SIZE, width = WIDTH, height = HEIGHT) {
  const sorts = wrapAll(size, width, height, new Array(size).fill(0));

  const first = document.querySelector(".sort-mounted");

  if (first) {
    const ret = controlForms(first);

    if (ret) {
      new Sort(randomArray(size), sorts, ret).mount();
    }
  }
}
class Sort {
  /** represents array that is set before sorting starts */
  array: number[];
  components: SortWrap[];
  controls: CONTROLS;
  constructor(array: number[], components: SortWrap[], controls: CONTROLS) {
    this.array = array;
    this.components = components;
    this.controls = controls;
  }
  mount() {
    for (let item of this.components) {
      item.setArray(this.array);
    }
    this.controls.shuffleBtn.addEventListener("click", () => {
      this.array = randomArray(
        this.array.length,
        this.controls.almostSortedChk.checked,
        this.controls.reverseChk.checked
      );
      for (let item of this.components) {
        item.setArray(this.array);
      }
    });
    this.controls.startBtn.addEventListener("click", () => {
      console.log("click");
    });
  }
}
function wrapAll(
  size: number,
  width: number,
  height: number,
  array: number[]
): SortWrap[] {
  const ret: SortWrap[] = [];
  for (let item in sortDict) {
    const divs = document.querySelectorAll<HTMLDivElement>(
      sortDict[item].selector
    );
    for (let div of divs) {
      div.classList.add("sort-mounted");
      const sortBox = insertSortBox(
        div,
        size,
        width,
        height,
        sortDict[item].caption
      );
      ret.push(new SortWrap(sortBox, array, sortDict[item].sortFunc));
    }
  }
  return ret;
}
class SortWrap {
  sortBox: HTMLDivElement;
  /** sort function swaps this */
  array: number[];
  sortFunc: SORTFUNC;
  constructor(sortBox: HTMLDivElement, array: number[], sortFunc: SORTFUNC) {
    this.sortBox = sortBox;
    this.array = array.concat();
    this.sortFunc = sortFunc;
    this.#setUnit();
  }
  /** copy array and update unit */
  setArray(arr: number[]): void {
    this.array = arr.concat();
    this.#setUnit();
  }
  runSort() {
    return this.sortFunc(this.array, this.sortBox);
  }
  #setUnit() {
    initUnit(this.sortBox, this.array);
  }
}
class ArrayWrap {
  array: number[];
  sortBox: HTMLDivElement;
  #swapClock = arrswapClock;
  constructor(arr: number[], box: HTMLDivElement) {
    this.array = arr;
    this.sortBox = box;
  }
  async swap(idx1: number, idx2: number) {
    await this.#swapClock(this.array, idx1, idx2, this.sortBox);
  }
}
