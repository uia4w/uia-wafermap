/**
 * sets wafer information.
 * 
 * @param {int} count The failed count.
 */
export default function(count) {
  return this.colors.length == 0 ?
    0xffffff :
    this.colors[Math.min(Math.max(0, count), this.colors.length)];
}