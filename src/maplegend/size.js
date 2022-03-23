/**
 * sets wafer information.
 * 
 * @param {int} diameter The size.
 * @param {int} margin The margin size.
 */
export default function(width, height) {
  this.width = width;
  this.height = height;
  return this;
}