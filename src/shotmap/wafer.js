/**
 * setup wafer infomration.
 *
 */
export default function(diameter, margin, notch, notchSide) {
  this.diameter = diameter;
  this.margin = margin;
  this.notch = notch;
  this.notchSide = notchSide;
  return this;
}
