import { CONTROLS, insertSortBox, randomArray } from "./sortcommon.js";
import { Sort, SortWrap } from "./sortcore.js";
import { gnomesort } from "./sortfunc.js";

const par = document.querySelector<HTMLDivElement>(".gnomesort-ind");
if (par) {
  const SIZE = 50;
  const box = insertSortBox(
    par,
    SIZE,
    300,
    250,
    "it's gnomesort!!! short code!"
  );
  const sw = [new SortWrap("gnome sort", box, [0], gnomesort)];
  const obj: CONTROLS = {
    startBtn: document.querySelector<HTMLButtonElement>("#start"),
    shuffleBtn: document.querySelector<HTMLButtonElement>("#shuffle"),
  };
  new Sort(randomArray(SIZE), sw, obj).mount();
}
