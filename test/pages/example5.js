var shotmap = null;

var waferdata = null;

function onOpenCvReady() {
  cv['onRuntimeInitialized'] = () => go();
}

function go() {
  shotmap = uia.shotmap('wafer2')
    .size(600, 10)
    .notch("down")
    .wheel(false)
    .drag(false)
    .dieRect(false) // turn off the grid line
    .diePalette(function(value) {
      switch (value) {
        case 1:
          return 0xff0000;
        case 2:
          return 0xff0000;
        default:
          return 0xffffff; // white background
      }
    });

    waferdata = shotmap.data(101, 98, 1, 1, "leftdown", "counting")
      .layer("1", layerResult1, layerData)
      .layer("2", layerResult2, layerData);

  shotmap.create(true);
}

function blocking() {
  var canvas = document.getElementById("canvasOutput");
  var result = shotmap.blocking(
    7, // blur parameter
    0xffffff); // ignore white color (background)

  // try to find out failed areas.
  result.draw(canvas);

  // layer: blocking
  shotmap.diePalette(function(value) {
    switch (value) {
      case 0:
        return 0xff0000;
      case 1:
        return 0x00ff00;
      case 2:
        return 0x0000ff;
      case 3:
        return 0xaaaaaa;
      case 4:
        return 0xcccccc;
      default:
        return undefined;
    }
  });
  waferdata.layer("1").enabled(false);
  waferdata.layer("2").enabled(false);
  waferdata.layer("blocking", result.tester, layerData);
  
  shotmap.draw();

  // opencv result.
  // cv.imshow('canvasOutput', result.dst);
}

function layerResult1(r, c) {
  if (Math.abs(c - r) <= 4) {
    return Math.random() > 0.5 ? 0 : 1;
  } else {
    return 0;
  }
}

function layerResult2(r, c) {
  if (c >= 70 && Math.abs(c - r) <= 20) {
    return Math.random() > 0.3 ? 0 : 1;
  } else {
    return 0;
  }
}

function layerData(row, col) {
  return "" + row + "," + col;
}