/**
 * merge the grade of all layers.
 * @param {int} drawR The row index of drawing.
 * @param {int} drawC column index of drawing.
 * @return {int) 0: pass, 1: failed, -1: unknown.
 */
export default function(drawR, drawC) {
  var data = [];
  // find out die(row,col) at drawing(drawR,drawC)
  var pos = this.pos(drawR, drawC);
  this.layers.forEach(l => {
    data.push(l.data(pos.row - this.minRow, pos.col - this.minCol));
  })
  return data;
}