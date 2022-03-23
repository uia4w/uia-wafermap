export default function(type = "canvas") {
  if (!this.app) {
    return null;
  }

  if (type == "image") {
    return this.app.renderer.plugins.extract.image(this.dies);
  } else {
    return this.app.renderer.plugins.extract.canvas(this.dies);
  }
}