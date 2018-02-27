export default function(r, c) {
  return new Die(this, r, c);
}

function Die(data, r, c) {
  this.data = data;
  this.x = c;
  this.y = r;
  this.grade = function() {
    return grading(this.data, this.x, this.y);
  };
}

function grading(data, x, y) {
  var grade = undefined;

  var len = data.layers.length;
  for(var i = 0; i < len; i++) {
    var _layer = data.layers[i];
    if(_layer.enabled()) {
      var _die = _layer.value(x, y);
      if(_die) {
        var _grade = _die.grade;
        if(grade === 'f' || _grade === 'f') {
          grade = 'f';
        }
        else if(_grade === 'd' || _grade === 'e' || _grade === 'g') {
          grade = _grade;
        }
        else if(_grade && grade !== 'd' && grade !== 'e' && grade !== 'g') {
          grade = _grade;
        }
      }
    }
  }

  return grade;
}

Die.prototype = {
  constructor: Die,
}
