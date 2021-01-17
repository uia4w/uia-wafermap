/**
 * sets wafer information.
 * 
 * @param {int} diameter The size.
 * @param {int} margin The margin size.
 * @param {int} notch The notch width.
 * @param {int} notchSide The notch position.
 */
export default function(diameter, margin, notch, notchSide) {
  this.diameter = diameter;
  this.margin = margin;
  this.notch = notch;
  this.notchSide = notchSide;
  return this;
}
