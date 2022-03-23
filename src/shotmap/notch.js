/**
 * visibility property.
 *
 */
export default function(side, offset = 1) {
  this.notchSide = side.toLowerCase();
  this.notchOffset = offset;
  return this;
}