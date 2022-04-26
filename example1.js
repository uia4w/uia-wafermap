var shotmap = uia.shotmap('wafer2')
  .size(600, 10)
  .notch("down")
  .wheel(true)
  .drag(true)
  .diePalette(function(value) {
    switch (value) {
      case 0:
        return 0xdddddd;
      case 1: // bad
        return 0xff0000;
      case 2: // good to bad
        return 0x00ff00;
      case 3: // good to good
        return 0x0000ff;
      default:
        return 0xffffff;
    }
  })
  .attachHoverIn(function(oEvent) {
    var die = oEvent.source; // pixi.js graphics object
    document.getElementById("position").innerHTML = "Map " + die.info.drawRow + "," + die.info.drawCol;
  })
  .attachHoverOut(function(oEvent) {
    document.getElementById("position").innerHTML = "Map";
  })

var data = shotmap.data(101, 98, 1, 1)
  .layer("1", layer1result, layerData)
  .layer("2", 0, layerData)
  .layer("3", layer3result, layerData)
  .layer("4", layer4result, layerData);

data.layer("2").enabled(false);
data.layer("3").enabled(false);
data.layer("4").enabled(false);

var dies = shotmap.scan();
shotmap.create(true);

function layer1result() {
  return Math.random() > 0.8 ? 1 : -1;
}

function layer3result() {
  return Math.random() > 0.9 ? 1 : -1;
}

function layer4result() {
  return Math.random() > 0.8 ? 0 : -1;
}

function layerData(row, col) {
  return "" + row + "," + col;
}

function showLayer(id, enabled) {
  data.layer(id).enabled(enabled);
}

function reset() {
  shotmap.reset();
}

function zoomIn() {
  shotmap.zoomIn();
}

function zoomOut() {
  shotmap.zoomOut();
}

function wheel(enabled) {
  shotmap.wheel(enabled);
}

function drag(enabled) {
  shotmap.drag(enabled);
}