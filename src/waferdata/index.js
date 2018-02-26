import waferdata_layer from './layer';
import waferdata_die from './die';

export default function(rows, cols) {
  return new WaferData(rows, cols);
}

function WaferData(rows, cols) {
  this.layers = new Array();
  this.rows = rows;
  this.cols = cols;
}

WaferData.prototype = {
  constructor: WaferData,
  layer: waferdata_layer,
  die: waferdata_die
}
