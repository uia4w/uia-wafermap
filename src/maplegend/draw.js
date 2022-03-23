import * as PIXI from "pixi.js/dist/browser/pixi";

export default function() {
  // pixi
  if (!this.app) {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      backgroundAlpha: 0,
      autoStart: false
    });

    var div = document.getElementById(this.id());
    div.setAttribute("style", "width:" + this.width + "px");
    div.setAttribute("style", "height:" + this.height + "px");
    div.appendChild(this.app.view);

    if (this.gs) {
      this.gs.destroy();
    }

    this.gs = new PIXI.Graphics();
    var x1 = 0;
    for (var i = 1; i <= 10; i++) {
      var x2 = 0.1 * this.width * i;

      var color = new PIXI.Graphics();
      color.beginFill(this.ref[i]);
      color.drawRect(x1, 0, x2 - x1, this.height);
      color.endFill();
      this.gs.addChild(color);

      x1 = x2;
    }

    this.app.stage.addChild(this.gs);
    this.app.render();
  }

  return this;
}