export default function(length) {
  return create(length);
}

function create(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) {
      arr[length - 1 - i] = create.apply(this, args);
    }
  }

  return arr;
}