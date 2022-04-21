function fly() {
  var shotmap = uia.shotmap('wafer2')
    .size(600, 10)
    .notch("down")
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
    });

  shotmap.data(101, 98, 1, 1)
    .layer("2", 0, layerData)
    .layer("1", layer1result, layerData);

  shotmap.create(true);
  var base64 = shotmap.extract("base64");
  document.getElementById("image").setAttribute("src", base64);
}


function layer1result() {
  return Math.random() > 0.8 ? 1 : -1;
}

function layerData(row, col) {
  return "" + row + "," + col;
}