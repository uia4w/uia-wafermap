/**
 * merge the grade of all layers.
 * @param {int} drawR The r index of drawing.
 * @param {int} drawC c index of drawing.
 * @return {int) 0: pass, -1: unknown, others: fail.
 */
export default function(drawR, drawC, dx, dy, dw, dh) {
  var pos = this.pos(drawR, drawC);
  var rowOffset = pos.row - this.minRow;
  var colOffset = pos.col - this.minCol;

  var found = false;
  var result = 0;
  for (var i = 0; i < this.layers.length; i++) {
    var _layer = this.layers[i];
    if (_layer.enabled()) {
      var fail = _layer.result(rowOffset, colOffset, dx, dy, dw, dh);
      if (fail >= 0) {
        found = true;
        result += fail;
      }
    }
  }
  return found ? result : -1;
}