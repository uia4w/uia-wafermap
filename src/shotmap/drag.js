export default function(enabled) {
  if(arguments.length > 0) {
    this.dragEnabled = enabled;
    return this;
  }
  return this.dragEnabled;
}
