export default function(enabled) {
  if (arguments.length > 0) {
    this.dieRectEnabled = enabled;
    return this;
  }
  return this.dieRectEnabled;
}