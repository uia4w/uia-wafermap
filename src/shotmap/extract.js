export default function(type = "canvas") {
  if (!this.app) {
    return null;
  }

  if (type == "image") {
    return this.app.renderer.plugins.extract.image(this.dies, "image/png");
  } else if (type = "base64") {
    return this.app.renderer.plugins.extract.base64(this.dies, "image/png");
  } else {
    return this.app.renderer.plugins.extract.canvas(this.dies);
  }
}