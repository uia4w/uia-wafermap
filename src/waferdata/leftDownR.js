export default function(row, col) {
  return {
    drawRow: this.minRow + this.rows - row - 1,
    drawCol: col - this.minCol
  };
}