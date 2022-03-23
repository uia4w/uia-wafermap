export default function(enabled) {
  if (arguments.length > 0) {
    this.wheelEnabled = enabled;
    return this;
  }
  return this.wheelEnabled;
}