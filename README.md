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

## Example
sample1.html & sample1.js
```js

// create a shotmap
var shotmap = uia.shotmap('wafer2')         // element id
    .size(600, 10)                          // size of canvas
    .notch("down")                          // notch direction
    .wheel(true)                            // use the wheel to control zoom in & out 
    .drag(true)                             // drag and drop the map
    .diePalette(function(value) {           // color palette, the value passed from result function.
      switch(value) {
        case 0:                             // pass
          return 0x00ff00;                  // green
        case 1:                             // fail
          return 0xff0000;                  // red
        default:                            // unknown
          return 0xffffff;                  // white
      }
    })

// bind data to the shotmap
var data = shotmap.data(101, 98, 1, 1)      // maxRow, maxCol, minRow, minCol, origin="leftdown", pickMode="testing"
    .layer("1", 0, layerData)               // layer #1, all good, dataset
    .layer("2", 1, layerData)               // layer #2, all bad, dataset
    .layer("3", layer3result, layerData);   // layer #3, random result, dataset

shotmap.create(true);                       // create a map with boundary checking. 

function layer3result() {                   // random result of layer 3
  return Math.random() > 0.2 ? 0 : 1;       
}  

function layerData(row, col) {              // information of a die
  return "" + row  + "," + col;
}  
```

The output:

![WaferMap](WaferMap.png)

## Documentation

### ShotMap

* __attachClick__ (_function_ clickHandler)

  ```js
  pickerFunc = function({
    source: Die,
    data: WaferData,
    pick: function()
  }) {

  }
  ```

* __create__ (_boolean_ checkBounding)

* __data__ (_int_ maxX, _int_ maxY, _int_ minX = 1, _int_ maxY = 1, _string_ origin = "leftdown", _string_ pickMode = "testing"): ___WaferData___

  The __origin__ is one of `leftdown`, `leftup`, `rightdown` and `rightup`.

  The __pickMode__ is one of `testing` and `counting`.
  * testing - check if a die is pass or not.
  * counting - count the failure of number.


* __diePalette__ (_function_ pickerFunc)
  ```js
  pickerFunc = function(int value) {
    return color;
  }
  ```


* __drag__ (_boolean_ enabled)

* __draw__ (_boolean_ enabled))

* __notch__ (_string_ direction)

* __reset__ ()

* __size__ (_int_ diameter, _int_ margin = 10)

* __wheel__ (_boolean_ enabled)

* __zoomIn__ (_int_ offsetX, _int_ offsetY)

* __zoomOut__ (_int_ offsetX, _int_ offsetY)


### WaferData

* __layer__ (_string_ id, _function_ resultTester, _function_ dataPicker): ___Layer___
  ```js
  resultTester = function(int rowOffset, int colOffset) {
    return 0; // 0:pass, 1: failed
  }

  dataPicker = function(int rowOffset, int colOffset) {
    return any;
  }
  ```

* __mode__ (_string_ mode)
  mode is one of `counting` and `testing`.


### Layer

* __enabled__ (__boolean__ enabled)

