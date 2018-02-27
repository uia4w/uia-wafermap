import * as d3 from "d3-selection";

/**
 * bind data to elements
 *
 */
export default function(data, x0, y0) {
  // offset x
  if(x0 === undefined) {
    x0 = 0;
  }
  // offset y
  if(y0 === undefined) {
    y0 = 0;
  }
  for(var y = 0; y<data.rows; y++) {
    for(var x = 0; x < data.cols; x++) {
      d3.select('#' + this.id() + '_dies_' + (x0 + x) + '_' + (y0 + y))
        .datum(data.die(y, x))
    }
  }

  return this;
}
