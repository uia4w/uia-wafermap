import waferdata from '../waferdata/index';

/**
 * creates empty data of the wafer.
 * 
 * @param {int} maxRow 
 * @param {int} maxCol 
 * @param {int} minRow
 * @param {int} direction
 * @param {}
 * @param {int} minCol 
 * @return {uia.WaferData} The wafer data.
 */
export default function(maxRow, maxCol, minRow = 1, minCol = 1, origin = "leftdown", pickMode = "testing") {
  if(origin == undefined || origin == null) {
    origin = "leftdown";
  }
  if(pickMode == undefined || pickMode == null) {
    origin = "testing";
  }
  this.waferdata = waferdata(this, maxRow, maxCol, minRow, minCol, origin.toLowerCase(), pickMode.toLowerCase());
  var w = 0.94 * (this.diameter - this.margin);
  this.dieWidth = w / this.waferdata.cols;
  this.dieHeight = w / this.waferdata.rows;
  return this.waferdata;
}
