/**
 * visibility property.
 *
 */
export default function(g, v) {
  var elem = this.svg.select('#' + g);
  if(v === undefined) {
    return elem ? elem.attr('visibility') : undefined;
  }
  else {
    if(elem) {
      elem.attr('visibility', v);
    }
    return this;
  }
}
