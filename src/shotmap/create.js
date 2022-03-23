import * as PIXI from "pixi.js/dist/browser/pixi";

/**
 * create shotmap without data
 * 
 * @param {boolean} diesGrid Draw grid line of dies.
 */
export default function(checkBounding = false) {
  this.checkBounding = checkBounding;

  // width/height
  var w = this.diameter;
  var r = this.diameter / 2;
  var rm = (this.diameter - this.margin) / 2;

  // pixi
  if (!this.app) {
    this.app = new PIXI.Application({
      width: w,
      height: w,
      backgroundAlpha: 0,
      autoStart: false
    });

    var div = document.getElementById(this.id());
    div.setAttribute("style", "width:" + w + "px");
    div.setAttribute("style", "height:" + w + "px");
    div.appendChild(this.app.view);

    // circle
    const map = new PIXI.Graphics();
    // circle: wafer
    map.lineStyle(0);
    map.beginFill(0x999999);
    map.drawCircle(r, r, r);
    map.endFill();
    // circle: margin
    map.beginFill(0xeeeeee);
    map.drawCircle(r, r, rm);
    map.endFill();

    this.app.stage.addChild(map);

    // zoom
    var self = this;
    var down = false;
    this.app.view.addEventListener('mousewheel', function(e) {
      if (!self.wheelEnabled) {
        self.reset();
      } else if (e.deltaY >= 0) {
        self.zoomIn(e.offsetX, e.offsetY);
      } else {
        self.zoomOut(e.offsetX, e.offsetY);
      }
    });
    this.app.view.addEventListener('mousedown', function(e) {
      down = true;
      if (!self.dragEnabled) {
        return;
      }
      self.move(e.offsetX, e.offsetY, "mousedown");
    });
    this.app.view.addEventListener('mouseup', function(e) {
      down = false;
      if (!self.dragEnabled) {
        return;
      }
      self.move(e.offsetX, e.offsetY, "mouseup");
    });
    this.app.view.addEventListener('mousemove', function(e) {
      if (!self.dragEnabled) {
        if (down && e.movementX < -10) {
          self.reset();
          down = false;
        }
        return;
      }
      self.move(e.offsetX, e.offsetY, "mousemove");
    });
    this.app.view.addEventListener('dblclick', function(e) {
      self.zoomIn(e.offsetX, e.offsetY);
    });

  }

  // draw dies
  this.draw();
  return this;
}