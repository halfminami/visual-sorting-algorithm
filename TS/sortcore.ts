import {
  SORTFUNC,
  initUnit,
  randomArray,
  CONTROLS,
  arrswapClock,
  leftBiggerClock,
  isSorted,
  equalsClock,
} from "./sortcommon.js";
export class Sort {
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
    if (this.controls.sleepInput) {
      for (let item of this.components) {
        // console.log(this.controls.sleepInput);
        item.array.sleepInput = this.controls.sleepInput;
      }
    }

    this.controls.shuffleBtn?.addEventListener("click", () => {
      this.array = randomArray(
        this.array.length,
        this.controls.almostSortedChk?.checked ?? false,
        this.controls.reverseChk?.checked ?? false
      );
      for (let item of this.components) {
        item.setArray(this.array);
      }
    });

    this.controls.startBtn?.addEventListener("click", () => {
      if (this.controls.startBtn) {
        this.controls.startBtn.disabled = true;
      }
      if (this.controls.shuffleBtn) {
        this.controls.shuffleBtn.disabled = true;
      }
      const promiseArr: Promise<any>[] = [];
      for (let item of this.components) {
        promiseArr.push(item.runSort());
      }
      Promise.all(promiseArr)
        .then(() => {
          console.log("all sorts finished!");
        })
        .catch((err) => console.log(err))
        .then(() => {
          if (this.controls.startBtn) {
            this.controls.startBtn.disabled = false;
          }
          if (this.controls.shuffleBtn) {
            this.controls.shuffleBtn.disabled = false;
          }
        });
    });
  }
}
export class SortWrap {
  sortBox: HTMLDivElement;
  /** sort function swaps this */
  array: ArrayWrap;
  name: string;
  sortFunc: SORTFUNC;
  constructor(
    name: string,
    sortBox: HTMLDivElement,
    array: number[],
    sortFunc: SORTFUNC
  ) {
    this.name = name;
    this.sortBox = sortBox;
    this.sortFunc = sortFunc;
    this.array = new ArrayWrap(array, this.sortBox);
    this.#setUnit();
  }
  /** copy array and update unit */
  setArray(arr: number[]): void {
    // this.array = new ArrayWrap(arr, this.sortBox);
    this.array.setArray(arr);
    this.#setUnit();
  }
  async runSort() {
    const ret = await this.sortFunc(this.array);
    console.log(this.name, isSorted(ret.array) ? "sorted!" : "not sorted...");
    return ret;
  }
  #setUnit() {
    initUnit(this.sortBox, this.array.array);
  }
}

export class ArrayWrap {
  array: number[];
  sortBox: HTMLDivElement;
  sleepInput: HTMLInputElement | undefined;
  #swapClock = arrswapClock;
  constructor(arr: number[], box: HTMLDivElement) {
    this.array = arr.concat();
    this.sortBox = box;
    this.sleepInput = undefined;
  }

  #sleepCnt = () => (this.sleepInput && parseInt(this.sleepInput.value)) ?? 300;

  async swap(idx1: number, idx2: number) {
    await this.#swapClock(this.array, idx1, idx2, this.sortBox, this.#sleepCnt);
  }
  setArray(arr: number[]) {
    this.array = arr.concat();
  }
  async leftBigger(idx1: number, idx2: number) {
    const ret = await leftBiggerClock(
      this.array,
      idx1,
      idx2,
      this.sortBox,
      this.#sleepCnt
    );
    return ret;
  }
  async equals(idx: number, value: number) {
    const ret = await equalsClock(
      this.array,
      idx,
      this.sortBox,
      this.#sleepCnt,
      value
    );
    return ret;
  }
}
