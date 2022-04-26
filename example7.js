var shotmap = uia.shotmap('wafer2')
  .size(600, 10)
  .notch("down")
  .diePalette(function(value) {
    switch (value) {
      case 0:
        return 0x00aa00;
      case 1:
        return 0xff0000;
      case 2:
        return 0xffff00;
      case 3:
        return 0x00ffff;
      case 4:
        return 0xff00ff;
      case 5:
        return 0x0000ff;
      case 6:
        return 0x666666;
      case 7:
        return 0xaaaaaa;
      case 8:
        return 0x123456;
      case 9:
        return 0x654321;
      default:
        return 0xffffff;
    }
  })

var data = shotmap.data(101, 98, 1, 1, "leftdown", "bincode")
  .layer("1", layer1result, layerData);
shotmap.create(true);

function layer1result() {
  var r = Math.random();
  if (r > 0.8) {
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