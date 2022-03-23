/**
 * sets wafer information.
 * 
 * @param {int} diameter The size.
 * @param {int} margin The margin size.
 */
export default function(diameter, margin = 10) {
  this.diameter = diameter;
  this.margin = margin;
  return this;
}