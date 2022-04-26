export default function(row, col) {
  return {
    drawRow: row - this.minRow,
    drawCol: this.minCol + this.cols - col - 1
  };
}