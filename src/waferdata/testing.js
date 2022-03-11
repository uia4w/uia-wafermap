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
  
  var found = false;
  var pass = false;
  for (var i = 0; i < this.layers.length; i++) {
    var _layer = this.layers[i];
    if (_layer.enabled()) {
      var code = _layer.result(rowOffset, colOffset);
      if (code >= 0) {
        found = true;
        if(pass && code > 0) {
          return 2;   // good to bad
        }
        pass = (code == 0);
      }
    }
  }
  return found ? pass ? 0 : 1 : -1;
}

