import layer_enabled from './enabled';

export default function(id, shotmap, testResult, dataPicker) {
  return new Layer(id, shotmap, testResult, dataPicker);
}

function Layer(id, shotmap, testResult, dataPicker = undefined) {
  this.id = id;
  this.shotmap = shotmap;
  this.on = true;
  if (typeof testResult === "function") {
    this.testResultF = testResult;
  } else {
    this.testResultF = function() { return testResult };
  }
  this.dataPicker = dataPicker;
}

Layer.prototype = {

  constructor: Layer,

  enabled: layer_enabled,

  /**
   * Get test result from die matrix. 
   * @param {int} rowOffset The row offset of min row.
   * @param {int} colOffset The column offset of min column. 
   * @returns 0: pass, 1: failed, -1: unknown.
   */
  result: function(rowOffset, colOffset) {
    return this.testResultF(rowOffset, colOffset);
  },

  /**
   * Get information from die matrix.
   * @param {int} rowOffset The row offset of min row.
   * @param {int} colOffset The column offset of min column. 
   * @returns {any} The information.
   */
  data: function(rowOffset, colOffset) {
    return this.dataPicker ? this.dataPicker(rowOffset, colOffset) : null;
  }

}