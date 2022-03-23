export default function(offsetX, offsetY, event) {
  if (event == 'mousedown') {
    this.lastPos = {
      x: offsetX,
      y: offsetY
    };
  } else if (event == 'mousemove') {
    if (this.lastPos) {
      var stage = this.app.stage;
      stage.x += (offsetX - this.lastPos.x);
      stage.y += (offsetY - this.lastPos.y);
      this.lastPos = {
        x: offsetX,
        y: offsetY
      };
      this.app.render();
    }
  } else {
    this.lastPos = null;
  }
}