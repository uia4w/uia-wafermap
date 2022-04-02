export default function(enabled) {
  if (arguments.length > 0) {
    this.circleBackgroundEnabled = enabled;
    return this;
  }
  return this.circleBackgroundEnabled;
}