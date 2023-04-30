# make sorting visual
This visualises sorting algorithms like many other examples found when googling gif of sorts.

# how to add sort
## in `sortfunc.ts`
- add function that satisfies type `SORTFUNC`
    - use `ArrayWrap` methods to compare/swap/copy and `await` them
    - `export` the function
    - implement like other sorts
## in `setting.ts`
- add sort into `sortDict`
## in `index.html`
- add element that satisfies `sortDict` selector

# how to use
```bash
git clone https://github.com/halfminami/visual-sorting-algorithm.git
cd visual-sorting-algorithm
npm install
npm run tsc
npm run start
```
and enter the url into browser (only checked on chrome)

## notes
Clock for sorting (times to compare/swap/copy) is randomly chosen. The actual time differs by architecture.
