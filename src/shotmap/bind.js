import * as d3 from "d3-selection";

export default function(data, x0, y0) {
  if(x0 === undefined) {
    x0 = 0;
  }
  if(y0 === undefined) {
    y0 = 0;
  }
  for(var y = 0; y<data.rows; y++) {
    for(var x = 0; x < data.cols; x++) {
      d3.select('#' + this.id() + '_dies_' + (x0 + x) + '_' + (y0 + y))
        .datum(data.die(y, x))
        .attr('fill', pickColor)
        .attr('visibility', 'visible');

    }
  }
}

function pickColor(d) {
  var grade = d.grade;
  if(grade == "d") {
    return "yellow";
  }
  if(grade == "e") {
    return "yellow";
  }
  if(grade == "f") {
    return "red";
  }
  if(grade == "g") {
    return "yellow";
  }
  if(grade === undefined) {
    return "none";
  }
  return "green"
}
