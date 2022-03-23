export default function(drawRow, drawCol) {
  var x = drawCol;
  var y = this.rows - drawRow - 1;
  return {
    row: this.minRow + y,
    col: this.minCol + x
  };
}