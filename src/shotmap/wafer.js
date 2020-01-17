/**
 * setup wafer infomration.
 * @param {int} diameter
 * @param {int} margin
 * @param {int} notch
 * @param {int} notchSide
 */
export default function(diameter, margin, notch, notchSide) {
  this.diameter = diameter;
  this.margin = margin;
  this.notch = notch;
  this.notchSide = notchSide;
  return this;
}
