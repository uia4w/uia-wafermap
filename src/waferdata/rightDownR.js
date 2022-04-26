export default function(row, col) {
  return {
    drawRow: this.minRow + this.rows - row - 1,
    drawCol: this.minCol + this.cols - col - 1
  };
}