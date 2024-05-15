/**
 * sets wafer information.
 * 
 * @param {int} value The value.
 */
export default function(value) {
  var idx = Math.floor(this.colors.length * (value - this.min) / (this.max - this.min));
  return this.colors.length == 0 ?
    0xffffff :
    this.colors[Math.min(Math.max(0, idx), this.colors.length - 1)];
}