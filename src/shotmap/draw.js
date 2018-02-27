import * as d3 from "d3-selection";

/**
 * draw shotmap with data.
 *
 */
export default function() {
  d3.select('#' + this.id() + '_dies')
    .selectAll('rect')
    .attr('fill', function(d) { return pickColor(d); });
}

function pickColor(d) {
  if(d === undefined) {
    return 'none';
  }

  var grade = d.grade();
  if(grade === 'd') {
    return "yellow";
  }
  if(grade === 'e') {
    return "yellow";
  }
  if(grade === 'f') {
    return "red";
  }
  if(grade === 'g') {
    return "yellow";
  }
  if(grade === undefined) {
    return 'none';
  }
  return 'green';
}
