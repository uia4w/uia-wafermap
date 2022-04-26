export default function(row, col) {
  return {
    drawRow: row - this.minRow,
    drawCol: col - this.minCol
  };
}