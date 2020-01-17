uia-wafermap
===

## How to build
1. Install __rollup.js__ package.
```
npm install -g rollup
```

2. Change to the project directory and install dependencies modules.
```
npm install
```

3. Test the project.
```
npm run test
```

4. Build the project and output the result to __dist/uia-wafermap.js__.
```
npm run build
```

5. Click the __index.html__ to see the sample.

## Example.js
```js
var shotmap = uia.shotmap('wafer2')       // element id
  .wafer(200, 3, 9, 'bottom')             // wafer size
  .die(3.76, 3.74)                        // die size
  .reticle(5, 6, 0.3, -9.81)              // reticle size
  .create()                               // create shotmap
  .visibility('wf2_cross', 'hidden');     // hide cross line

var data = shotmap.data(49, 51)           // create waferdata, (row,col) = (49,51)
  .layer('1', sampleLayer1);              // add layer1 sample data
  .layer('2', sampleLayer2);              // add layer2 sample data

shotmap.bind(data, 1, 0)                  // bind data to shotmap, offset of (x,y) is (1,0)
  .draw();                                // draw
```
![WaferMap](WaferMap.png)
