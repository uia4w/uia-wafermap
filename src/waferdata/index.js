import waferdata_layer from './layer';
import waferdata_die from './die';
import {Layer} from "./layer";

export default function(rows, cols) {
  return new WaferData(rows, cols);
}

function WaferData(rows, cols) {
  this.rows = rows;
  this.cols = cols;
	this._layer = new Layer('current', rows, cols, undefined);
  this.layers = new Array();
}

WaferData.prototype = {
  constructor: WaferData,
  layer: waferdata_layer,
  die: waferdata_die
}
