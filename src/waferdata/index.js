import waferdata_counting from './counting';
import waferdata_layer from './layer';
import waferdata_left_down from './leftDown';
import waferdata_left_up from './leftUp';
import waferdata_mode from './mode';
import waferdata_pick from './pick';
import waferdata_right_down from './rightDown';
import waferdata_right_up from './rightUp';
import waferdata_testing from './testing';

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

  if (origin == "rightup" || origin == "ru") {
    this.pos = waferdata_right_up;
  } else if (origin == "rightdown" || origin == "rd") {
    this.pos = waferdata_right_down;
  } else if (origin == "leftup" || origin == "lu") {
    this.pos = waferdata_left_up;
  } else {
    this.pos = waferdata_left_down;
  }

  if (pickMode == "counting") {
    this.testing = waferdata_counting;
  } else {
    this.testing = waferdata_testing;
  }
}

WaferData.prototype = {
  constructor: WaferData,
  layer: waferdata_layer,
  mode: waferdata_mode,
  pick: waferdata_pick
}