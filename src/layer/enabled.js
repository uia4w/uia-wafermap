export default function(on, redraw = true) {
  if (on === undefined) {
    return this.on;
  } else {
    this.on = on;
    if (redraw) {
      this.shotmap.draw();
    }
    return this;
  }
}