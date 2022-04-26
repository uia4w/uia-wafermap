export default function(layers) {
  if (arguments.length == 0) {
    return this.layers;
  }

  this.layers = Math.max(1, layers);
  this.colors = [];
  for (var i = 0; i <= this.layers; i++) {
    this.colors.push(this.ref[Math.ceil(10 * i / this.layers)]);
  }
  return this;
}