/**
 * merge the grade of all layers.
 * @param {int} drawR The r index of drawing.
 * @param {int} drawC c index of drawing.
 * @return {int) 0: pass, -1: unknown, others: fail.
 */
export default function(drawR, drawC) {
  var pos = this.pos(drawR, drawC);
  var rowOffset = pos.row - this.minRow;
  var colOffset = pos.col - this.minCol;
  var len = this.layers.length - 1;
  for (var i = len; i >= 0; i--) {
    var _layer = this.layers[i];
    if (_layer.enabled()) {
      var fail = _layer.result(rowOffset, colOffset);
      if (fail >= 0) {
        return fail;
      }
    }
  }
  return -1;
}

