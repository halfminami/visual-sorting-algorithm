# make sorting visual (`element`)
This visualizes sorting algorithms like many other examples found when googling gif of sorts.
<img src="./screenshot.png" style="width:500px;display:block" alt="sorting screenshot">  
This uses html element `div`. It is easy to style.

# how to add sort
## in `sortfunc.ts`
- add function that satisfies type `SORTFUNC`
    - use `ArrayWrap` methods to compare/swap/copy and `await` them
    - `export` the function
    - implement like other sorts
## in `setting.ts`
- add sort into `sortDict` (import the function)
## in `index.html`
- add element that satisfies `sortDict` selector

# how to perform sort individually
- `new SortWrap()` all sorts
- put buttons and inputs to Object `: CONTROLS`
- `new Sort(...).mount()`
    - uncomment html and see `individual.ts`

# how to use
```bash
git clone https://github.com/halfminami/visual-sorting-algorithm.git
cd visual-sorting-algorithm
npm install
npm run tsc
```
For `script type="module"`, need to run a local server
```bash
npm run start
```
and enter the url into browser (only checked on chrome)

## notes
Clock for sorting (times to compare/swap/copy) is randomly chosen. The actual time differs by architecture.

## sorts i implemented
I'm afraid I might have implemented wrong!
- bubble sort
- cocktail shaker sort
- merge sort
- gnome sort
- radix sort
    - base 5 (`"ABCDE"`)
- insertion sort
    - simple swap
    - binary search
- selection sort
    - simple max select
    - double select
- shell sort
    - divide by 2
    - divide by 3 (improved gap)
- comb sort
