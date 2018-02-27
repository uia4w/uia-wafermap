/**
 * set/get visibility.
 *
 */
export default function(g, v) {
  if(v === undefined) {
    return this.svg.select('#' + g).attr('visibility');
  }
  else {
    this.svg.select('#' + g).attr('visibility', v);
    return this;
  }
}
