export default function(g, v) {
  this.svg.select('#' + g).attr('visibility', v);
  return this;
}
