var shotmap = uia.shotmap('wafer2')
  .size(600, 10)
  .notch("down")
  .highlight(3, 0x0000ff)
  .diePalette(function(value) {
    if (value < 0) {
      return 0xffffff;
    } else if (value == 0) {
      return 0x00aa00;
    } else {
      return 0xff0000;
    }
  })

var data = shotmap.data(101, 98, 1, 1)
  .layer("1", layer1result, layerData);
shotmap.create(true);

function layer1result() {
  var r = Math.random();
  if (r > 0.5) {
    return 0;
  }
  r = Math.floor(100 * r);
  r = r % 10;
  return r;
}

function layerData(row, col) {
  return "" + row + "," + col;
}

function showLayer(id, enabled) {
  data.layer(id).enabled(enabled);
}