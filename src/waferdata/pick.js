/**
 * merge the grade of all layers.
 * @param {int} drawR The row index of drawing.
 * @param {int} drawC column index of drawing.
 * @return {int) 0: pass, 1: failed, -1: unknown.
 */
export default function(drawR, drawC) {
  var data = [];
  var pos = this.pos(drawR, drawC);
  this.layers.forEach(l => {
    var rowOffset = pos.row - this.minRow;
    var colOffset = pos.col - this.minCol;
    data.push(l.data(rowOffset, colOffset));
  })
  return data;
}