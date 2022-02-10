export default function(drawRow, drawCol) {
  var x = this.cols - drawCol - 1;
  var y = drawRow;
  return {
    row: this.minRow + y,
    col: this.minCol + x
  };
}
