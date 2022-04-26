export default function(highCode, highColor = 0xffff00) {
  if (arguments.length > 0) {
    this.highCode = highCode;
    this.highColor = highColor;
    return this;
  }
  return {
    code: this.highCode,
    color: this.highColor
  };
}