var shotmap = uia.shotmap('wafer2')
    .wafer(200, 3)
    .notch("down", 2)
    .attachClick(function(oEvent) {
      alert(oEvent.pick());
    })
    .diePalette(function(result) {
      switch(result) {
        case 0:
          return 0x00ff00;
        case 1:
          return 0x0000ff;
        default:
          return 0xff0000;
      }
    })

var data = shotmap.data(51, 49, 1, 1)
    .layer("1", 0, layerData)
    .layer("2", 1, layerData)
    .layer("3", layer3result, layerData);

shotmap.create();

function layer3result() {
  return Math.random() > 0.2 ? 0 : 1;
}  

function layerData(row, col) {
  return "" + row  + "," + col;
}  

function showLayer(id, enabled) {
  data.layer(id).enabled(enabled);
}
