/**
 * merge the grade of all layers.
 * @param {int} drawR The row index of drawing.
 * @param {int} drawC The column index of drawing.
 * @return {int) -1: unknown, others: bin code.
 */
export default function(drawR, drawC, dx, dy, dw, dh) {
  // find out die(row,col) at drawing(drawR,drawC)
  var pos = this.pos(drawR, drawC);
  var rowOffset = pos.row - this.minRow;
  var colOffset = pos.col - this.minCol;
  for (var i = this.layers.length; i > 0; i--) {
    var _layer = this.layers[i - 1];
    if (_layer.enabled()) {
      var code = _layer.result(rowOffset, colOffset, dx, dy, dw, dh);
      if (code >= 0) {
        return code;
      }
    }
  }
  return -1;
}