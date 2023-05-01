/**
 * @file collection of sorting algorithms
 * implement with `ArrayWrap` methods, like other functions
 * i'm afraid i didn't implement some of them correctly
 */
import { ArrayWrap } from "./sortcore.js";

export async function bubbleSort(arr: ArrayWrap) {
  for (let i = 0; i < arr.array.length - 1; ++i) {
    let cnt = 0;
    for (let j = 0; j < arr.array.length - i - 1; ++j) {
      if (await arr.leftBigger(j, j + 1)) {
        cnt = 0;
        await arr.swap(j, j + 1);
      } else {
        cnt++;
      }
    }
    i += cnt;
  }
  return arr;
}

export async function shakersort(arr: ArrayWrap) {
  for (let left = 0, right = arr.array.length - 1; left <= right; ) {
    let rightcnt = 0;
    for (let i = left; i < right; ++i) {
      if (await arr.leftBigger(i, i + 1)) {
        rightcnt = 0;
        await arr.swap(i, i + 1);
      } else {
        rightcnt++;
      }
    }
    right -= rightcnt;
    right--;

    let leftcnt = 0;
    for (let i = right; i > left; --i) {
      if (await arr.leftBigger(i - 1, i)) {
        leftcnt = 0;
        await arr.swap(i - 1, i);
      } else {
        leftcnt++;
      }
    }
    left += leftcnt;
    left++;
  }
  return arr;
}

export async function mergesort(arr: ArrayWrap) {
  await mergesort_core(arr, 0, arr.array.length - 1);
  return arr;
}
/** includes left and right */
async function mergesort_core(arr: ArrayWrap, left: number, right: number) {
  if (left == right) {
    return;
  }
  let mid = Math.floor(left + (right - left) / 2);
  await mergesort_core(arr, left, mid);
  await mergesort_core(arr, mid + 1, right);
  const memo: number[] = [];
  let lp = left,
    rp = mid + 1;
  const le = mid,
    re = right;
  while (lp <= le && rp <= re) {
    if (await arr.leftBigger(lp, rp)) {
      memo.push(arr.array[rp]);
      rp++;
    } else {
      memo.push(arr.array[lp]);
      lp++;
    }
  }
  for (; lp <= le; ++lp) {
    memo.push(arr.array[lp]);
  }
  for (; rp <= re; ++rp) {
    memo.push(arr.array[rp]);
  }
  for (let i = 0; left <= right && i < memo.length; ++left, ++i) {
    await arr.equals(left, memo[i]);
  }
  return;
}

export async function gnomesort(arr: ArrayWrap) {
  let cur = 0;
  while (cur < arr.array.length) {
    if (cur == 0 || (await arr.leftBigger(cur, cur - 1))) {
      cur++;
    } else {
      await arr.swap(cur - 1, cur);
      cur--;
    }
  }

  return arr;
}

export async function radixsort(arr: ArrayWrap) {
  const base = "ABCDE";
  const memo: { [key: string]: [string, number][] } = {};
  const initmemo = () => {
    for (let c of base) {
      memo[c] = [];
    }
    memo[" "] = [];
  };
  const cparr: [string, number][] = [];
  for (let i = 0; i < arr.array.length; ++i) {
    cparr[i] = [convertRadix(arr.array[i], base), arr.array[i]];
  }

  let cur = 0;
  while (1) {
    initmemo();
    for (let item of cparr) {
      memo[item[0][item[0].length - 1 - cur] || " "].push(item);
    }
    if (memo[" "].length == arr.array.length) {
      break;
    }
    let p = 0;
    for (let item of memo[" "]) {
      cparr[p] = item;
      p++;
    }
    for (let c of base) {
      for (let item of memo[c]) {
        cparr[p] = item;
        p++;
      }
    }

    for (let i = 0; i < cparr.length; ++i) {
      await arr.equals(i, cparr[i][1]);
    }

    cur++;
  }

  return arr;
}
function convertRadix(n: number, base: string): string {
  let ret = "";
  while (n) {
    ret = base[n % base.length] + ret;
    n = Math.floor(n / base.length);
  }

  return ret;
}
export async function insertionsort(arr: ArrayWrap) {
  for (let i = 0; i < arr.array.length - 1; ++i) {
    for (let j = i; j >= 0 && (await arr.leftBigger(j, j + 1)); --j) {
      await arr.swap(j, j + 1);
    }
  }

  return arr;
}
export async function insertionsort_bin(arr: ArrayWrap) {
  for (let i = 0; i < arr.array.length - 1; ++i) {
    if (await arr.leftBigger(i, i + 1)) {
      const to = await binary_search(arr, 0, i, arr.array[i + 1]);
      let j = i;
      for (; j >= to; --j) {
        await arr.swap(j, j + 1);
      }
      // since this binary search sometimes points wrong index, but why?
      j++;
      if (await arr.leftBigger(j, j + 1)) {
        await arr.swap(j, j + 1);
      }
    }
  }

  return arr;
}
/** includes left and right */
async function binary_search(
  arr: ArrayWrap,
  left: number,
  right: number,
  value: number
): Promise<number> {
  if (left >= right) {
    return left;
  }
  const mid = left + Math.floor((right - left) / 2);
  if (await arr.valueBigger(value, mid)) {
    const ret = await binary_search(arr, mid + 1, right, value);
    return ret;
  } else if (await arr.valueSmaller(value, mid)) {
    // in this case no same value exists
    // so checking if smaller is meaningless
    // but common binary search checks through, so this does too
    const ret = await binary_search(arr, left, mid - 1, value);
    return ret;
  } else {
    return mid;
  }
}

export async function selectionsort(arr: ArrayWrap) {
  for (let i = 0; i < arr.array.length - 1; ++i) {
    let max = 0;
    for (let j = 1; j < arr.array.length - i; ++j) {
      if (await arr.leftBigger(j, max)) {
        max = j;
      }
    }
    await arr.swap(max, arr.array.length - 1 - i);
  }

  return arr;
}
export async function selectionsort_double(arr: ArrayWrap) {
  for (
    let left = 0, right = arr.array.length - 1;
    left < right;
    ++left, --right
  ) {
    let min = left,
      max = left;
    for (let j = left + 1; j <= right; ++j) {
      if (await arr.leftBigger(j, max)) {
        max = j;
      }
      if (await arr.leftBigger(min, j)) {
        min = j;
      }
    }
    await arr.swap(min, left);
    if (left == max) {
      max = min;
    }
    await arr.swap(max, right);
  }

  return arr;
}

export async function shellsort_div2(arr: ArrayWrap) {
  let gap = Math.floor(arr.array.length / 2),
    div = 2;
  await shellsort(arr, gap, div);

  return arr;
}
/**
 * improved gap
 * @see {@link https://en.wikipedia.org/wiki/Shellsort}
 */
export async function shellsort_div3(arr: ArrayWrap) {
  let gap,
    div = 3;
  const calcGap = (x: number) => (3 ** x - 1) / 2;
  for (let i = 2; ; ++i) {
    if (Math.ceil(arr.array.length / 3) < calcGap(i)) {
      gap = Math.floor(calcGap(i - 1));
      break;
    }
  }
  await shellsort(arr, gap, div);

  return arr;
}
async function shellsort(arr: ArrayWrap, gap: number, div: number) {
  while (gap) {
    for (let i = 0; i < arr.array.length - gap; ++i) {
      for (let j = i; j >= 0 && (await arr.leftBigger(j, j + gap)); j -= gap) {
        arr.swap(j, j + gap);
      }
    }

    gap = Math.floor(gap / div);
  }
}
