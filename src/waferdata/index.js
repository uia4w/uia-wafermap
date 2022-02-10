import waferdata_layer from './layer';
import waferdata_pick from './pick';
import waferdata_testing from './testing';
import waferdata_leftUp from './leftUp';
import waferdata_leftDown from './leftDown';
import waferdata_rightUp from './rightUp';
import waferdata_rightDown from './rightDown';
import waferdata_counting from './counting';

export default function(shotmap, maxRow, maxCol, minRow, minCol, origin, pickMode) {
  return new WaferData(shotmap, maxRow, maxCol, minRow, minCol, origin, pickMode);
}

function WaferData(shotmap, maxRow, maxCol, minRow, minCol, origin = "leftdown", pickMode = "testing") {
  this.shotmap = shotmap;
  this.maxRow = maxRow;
  this.maxCol = maxCol;
  this.minRow = minRow;
  this.minCol = minCol;
  this.rows = maxRow - minRow + 1;
  this.cols = maxCol - minCol + 1;
  this.layers = new Array();
  
  if(origin == "rightup" || origin == "ru") {
    this.pos = waferdata_rightUp;
  } else if(origin == "rightdown" || origin == "rd") {
    this.pos = waferdata_rightDown;
  } else if(origin == "leftup" || origin == "lu") {
      this.pos = waferdata_leftUp;
  } else {
    this.pos = waferdata_leftDown;
  }
  
  if(pickMode == "counting") {
    this.testing = waferdata_counting;
  } else {
    this.testing = waferdata_testing;
  }
}

WaferData.prototype = {
  constructor: WaferData,
  layer: waferdata_layer,
  pick: waferdata_pick
}
