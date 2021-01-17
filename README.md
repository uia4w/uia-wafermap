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
  .visibility('wafer2_cross', 'hidden');  // hide cross line

var data = shotmap.data(49, 51)           // create waferdata, (row,col) = (49,51)
  .layer('1', sampleLayer1);              // add layer1 sample data
  .layer('2', sampleLayer2);              // add layer2 sample data

shotmap.bind(data, 1, 0)                  // bind data to shotmap, offset of (x,y) is (1,0)
  .draw();                                // draw
```
![WaferMap](WaferMap.png)


## ShotMap Helper Methods

### create(diesGrid)

Draw grid line of dies or not.

```js
var shotmap = uia.shotmap('wafer2')
  .wafer(200, 3, 9, 'bottom')
  .die(3.76, 3.74)
  .reticle(5, 6, 0.3, -9.81)
  .create(true)               // show grid
```

### visibility(id, value)

Change visibility of some SVG elements.

* id - the naming pattern is {shotmap}___{target}__.
* value = one of ['hidden' / 'visible']

__{target}__ can be one of:
* _cross
* _rect_area
* _reticles
* _dies


```js
var shotmap = uia.shotmap('wafer2')             // id
  .wafer(200, 3, 9, 'bottom')
  .die(3.76, 3.74)
  .reticle(5, 6, 0.3, -9.81)
  .create()
  .visibility('wafer2_cross', 'hidden')         // wafer2_xxxx
  .visibility('wafer2_rect_area', 'hidden');
```

### diePalette(colorPicker)

Draw customize color depending on the grade of the die.

```js
var shotmap = uia.shotmap('wafer2')
  .wafer(200, 3, 9, 'bottom')
  .die(3.76, 3.74)
  .reticle(5, 6, 0.3, -9.81)
  .diePalette(failedOnly)
  .create()

function failedOnly(grade) {
  if(grade === 'f') {
    return "red";
  }
  return 'none';
}
```
