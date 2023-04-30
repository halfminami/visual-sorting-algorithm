import { sortDict } from "./setting.js";
import { ArrayWrap, SortWrap } from "./sortcore.js";

export type SORTFUNC = (arr: ArrayWrap) => Promise<ArrayWrap>;

export type CONTROLS = {
  shuffleBtn?: HTMLButtonElement | null;
  almostSortedChk?: HTMLInputElement | null;
  reverseChk?: HTMLInputElement | null;
  startBtn?: HTMLButtonElement | null;
  sleepInput?: HTMLInputElement | null;
};

/** create buttons and inputs */
export function controlForms(first: Element): CONTROLS | undefined {
  if (first.parentElement) {
    const div = first.parentElement.insertBefore(
      document.createElement("div"),
      first
    );
    const shuffleBtn = div.appendChild(document.createElement("button"));
    shuffleBtn.textContent = "shuffle";
    const almostSortedChk = document.createElement("input");
    almostSortedChk.type = "checkbox";
    {
      const label = div.appendChild(document.createElement("label"));
      label.textContent = "almost sorted";
      label.appendChild(almostSortedChk);
    }
    const reverseChk = document.createElement("input");
    reverseChk.type = "checkbox";
    {
      const label = div.appendChild(document.createElement("label"));
      label.textContent = "reverse array";
      label.appendChild(reverseChk);
    }
    const startBtn = div.appendChild(document.createElement("button"));
    startBtn.textContent = "sort start";
    const sleepInput = div.appendChild(document.createElement("input"));
    sleepInput.type = "range";
    sleepInput.min = "0";
    sleepInput.max = "200";
    sleepInput.value = "10";
    return { shuffleBtn, almostSortedChk, reverseChk, startBtn, sleepInput };
  }
  return undefined;
}

export function wrapAll(
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
      ret.push(
        new SortWrap(
          sortDict[item].name,
          sortBox,
          array,
          sortDict[item].sortFunc
        )
      );
    }
  }
  return ret;
}
function sleep(time: number) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}

/**
 * random array (0~size-1) by *Algorithm P (Shuffling)*
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle}
 * @param size array size
 * @param almostSorted if true, the array is not shuffled completely
 * @param reverse if true, reverse the array (for `almostSorted=true`)
 */
export function randomArray(
  size = 0,
  almostSorted = false,
  reverse = false
): number[] {
  let cnt = -1;
  const ret = new Array(size).fill(0).map((item) => {
    cnt++;
    return cnt;
  });

  // randomise
  if (almostSorted) {
    // limit shuffle range
    const mgn = 3;
    for (let i = 0; i < size - 1; ++i) {
      arrswap(ret, i, mathrandint(i, Math.min(size - 1, i + mgn)));
    }
  } else {
    // shuffling
    for (let i = 0; i < size - 1; ++i) {
      arrswap(ret, i, mathrandint(i, size - 1));
    }
  }

  if (reverse) {
    for (let i = 0; i < Math.floor(size / 2); ++i) {
      arrswap(ret, i, size - 1 - i);
    }
  }
  return ret;
}

/** check if sort finished correctly */
export function isSorted(arr: number[]): boolean {
  let ret = true;
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] != i) {
      ret = false;
    }
  }
  return ret;
}

/**
 * create `div.sort-box`
 * @param parent create element inside this
 * @param size array size
 * @param width element width (px)
 * @param height element height (px)
 * @param caption figcaption (any string is ok)
 * @returns div filled with sorting elements
 */
export function insertSortBox(
  parent: HTMLDivElement,
  size: number,
  width: number,
  height: number,
  caption: string
): HTMLDivElement {
  const figure = parent.appendChild(document.createElement("figure"));
  const sortBox = figure.appendChild(document.createElement("div"));

  const figcaption = figure.appendChild(document.createElement("figcaption"));
  figcaption.textContent = caption;

  sortBox.classList.add("sort-box");
  sortBox.style.width = `${width}px`;
  sortBox.style.height = `${height}px`;
  sortBox.style.gridTemplateColumns = `repeat(${size},1fr)`;

  for (let i = 0; i < size; ++i) {
    sortBox
      .appendChild(document.createElement("div"))
      .classList.add("sort-unit");
  }

  return sortBox;
}

/** set height of existing unit */
export function initUnit(box: HTMLDivElement, arr: number[]): number[] {
  for (let i = 0; i < arr.length; ++i) {
    const unit = indexUnit(box, i);
    if (unit) {
      unit.style.height = unitHeight(arr, i);
    }
  }

  return arr;
}

export async function arrswapClock(
  arr: number[],
  idx1: number,
  idx2: number,
  sortBox: HTMLDivElement,
  sleepCnt: () => number
) {
  arrswap(arr, idx1, idx2);
  for (let i of [idx1, idx2]) {
    const item = indexUnit(sortBox, i);
    if (item) {
      item.style.height = unitHeight(arr, i);
    }
  }

  toggleChange([idx1, idx2], sortBox);
  await sleep(sleepCnt());
  toggleChange([idx1, idx2], sortBox);
  return;
}

export async function leftBiggerClock(
  arr: number[],
  idx1: number,
  idx2: number,
  sortBox: HTMLDivElement,
  sleepCnt: () => number
) {
  const ret = arr[idx1] > arr[idx2];

  toggleChange([idx1, idx2], sortBox);
  await sleep(sleepCnt() / 2); // 2 is random number
  toggleChange([idx1, idx2], sortBox);
  return ret;
}

/** for copy (mergesort) */
export async function equalsClock(
  arr: number[],
  idx1: number,
  sortBox: HTMLDivElement,
  sleepCnt: () => number,
  value: number
) {
  arr[idx1] = value;
  const item = indexUnit(sortBox, idx1);
  if (item) {
    item.style.height = unitHeight(arr, idx1);
  }

  toggleChange([idx1], sortBox);
  await sleep(sleepCnt());
  toggleChange([idx1], sortBox);
  return arr[idx1];
}
function toggleChange(indxs: number[], sortBox: HTMLDivElement) {
  for (let i of indxs) {
    const item = indexUnit(sortBox, i);
    if (item) {
      item.classList.toggle("change");
    }
  }
}

/** gets sort-unit */
function indexUnit(
  sortBox: HTMLDivElement,
  index: number
): HTMLDivElement | null {
  return sortBox.querySelector<HTMLDivElement>(
    `.sort-unit:nth-of-type(${index + 1})`
  );
}
/** `style.height` */
function unitHeight(arr: number[], index: number): string {
  return `${(arr[index] / (arr.length - 1)) * 100}%`;
}
/** includes begin and end */
function mathrandint(begin: number, end: number): number {
  end++;
  if (0 < end - begin && end - begin < 1) return Math.floor(end);
  begin = Math.ceil(begin);
  end = Math.floor(end);
  if (end - begin < 0) return 0;
  return Math.min(Math.floor(Math.random() * (end - begin)) + begin, end - 1);
}
function arrswap<T>(arr: T[], idx1: number, idx2: number): void {
  if (idx1 == idx2) {
    return;
  }
  if (idx1 < 0 || idx2 < 0 || idx1 > arr.length || idx2 > arr.length) {
    return;
  }
  const tmp = arr[idx2];
  arr[idx2] = arr[idx1];
  arr[idx1] = tmp;
  return;
}
