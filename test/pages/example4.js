var legend = uia.maplegend('legend2', 1)
  .range(0, 12)
  .draw();

var shotmap = uia.shotmap('wafer2')
  .circleBackground(false)
  .size(600, 10)
  .notch("down")
  .wheel(false)
  .drag(false)
  .diePalette(function(result) {
    return legend.select(result);
  });

shotmap.data(101, 98, 1, 1, "leftdown", "counting") // counting
  .layer("1", layerResult4, layerData)
  .layer("2", layerResult4, layerData)
  .layer("3", layerResult4, layerData)
  .layer("4", layerResult4, layerData)
  .layer("5", layerResult4, layerData)
  .layer("6", layerResult4, layerData)
  .layer("7", layerResult2, layerData)
  .layer("8", layerResult2, layerData)
  .layer("9", layerResult2, layerData)
  .layer("10", layerResult2, layerData)
  .layer("11", layerResult2, layerData)
  .layer("12", layerResult2, layerData);
shotmap.create(true);


function layerResult2(r, c) {
  if (c < r) {
    return Math.random() > 0.3 ? 0 : 1;
  } else {
    return Math.random() > 0.1 ? 0 : 1;
  }
}

function layerResult4(r, c) {
  if (r < c * 2) {
    return Math.random() > 0.7 ? 0 : 1;
  } else {
    return Math.random() > 0.1 ? 0 : 1;
  }
}

function layerData(row, col) {
  return "" + row + "," + col;
}