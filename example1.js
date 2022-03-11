var shotmap = uia.shotmap('wafer2')
    .size(600, 10)
    .notch("down")
    .wheel(true)
    .drag(true)
    .diePalette(function(value) {
      switch(value) {
        case 0:
          return 0x00ff00;
        case 1:
          return 0xff0000;
        case 2:
          return 0xff0000;
        default:
          return 0xffffff;
      }
    });

var data = shotmap.data(101, 98, 1, 1)
    .layer("1", 0, layerData)
    .layer("2", 1, layerData)
    .layer("3", layer3result, layerData);

data.layer("2").enabled(false);

shotmap.create(true);

function layer3result() {
  return Math.random() > 0.2 ? 0 : 1;
}  

function layerData(row, col) {
  return "" + row  + "," + col;
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