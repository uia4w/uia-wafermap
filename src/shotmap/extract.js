export default function(type = "canvas") {
  if (!this.app) {
    return null;
  }

  const bg = new PIXI.Graphics();
  bg.beginFill(0xffffff);
  bg.drawRect(0, 0, this.diameter, this.diameter);
  bg.addChild(this.dies);
  
  if (type == "image") {
    return this.app.renderer.plugins.extract.image(bg);
  } else {
    return this.app.renderer.plugins.extract.canvas(bg);
  }
}