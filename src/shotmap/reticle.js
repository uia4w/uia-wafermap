/**
 * setup reticle size and position.
 * @param {int} dx The count of dies in one row.
 * @param {int} dy The count of dies in one column.
 * @param {float} ox The offset x.
 * @param {float} oy The offset y.
 */
export default function(dx, dy, ox, oy) {
  this.diesX = dx;
  this.diesY = dy;
  this.offsetX = ox;
  this.offsetY = oy;
  return this;
}
