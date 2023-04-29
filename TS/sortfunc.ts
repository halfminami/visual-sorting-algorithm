import { ArrayWrap } from "./sortcore.js";

export async function bubbleSort(arr: ArrayWrap) {
  for (let i = 0; i < arr.array.length - 1; ++i) {
    let cnt = 0;
    for (let j = 0; j < arr.array.length - i - 1; ++j) {
      if (arr.array[j] > arr.array[j + 1]) {
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
  for (let left = 0; left < arr.array.length; ++left) {
    for (let right = arr.array.length; right > 0; --right) {
      if (left > right) {
        break;
      }
      let rightcnt = 0;
      for (let i = left; i < right; ++i) {
        if (i < arr.array.length - 1 && arr.array[i] > arr.array[i + 1]) {
          rightcnt = 0;
          await arr.swap(i, i + 1);
        } else {
          rightcnt++;
        }
      }
      right -= rightcnt;

      if (left > right) {
        break;
      }
      let leftcnt = 0;
      for (let i = right - 1; i >= left; --i) {
        if (i > 0 && arr.array[i - 1] > arr.array[i]) {
          leftcnt = 0;
          await arr.swap(i - 1, i);
        } else {
          leftcnt++;
        }
      }
      left += leftcnt;
    }
  }
  return arr;
}
