export default function(drawRow, drawCol) {
  return {
    row: this.minRow + drawRow,
    col: this.minCol + drawCol 
  };
}
