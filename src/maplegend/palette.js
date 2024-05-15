/**
 * sets wafer information.
 * 
 * @param {array} palette The colors.
 */
export default function(colors) {
  if (arguments.length == 0) {
    return this.colors;
  } else {
    this.colors = colors;
    return this;
  }
}