export default function(r, c) {
  return new Die(this, r, c);
}

function Die(data, x, y) {
  this.data = data;
  this.x = x;
  this.y = y;
  this.grade = function(g) {
		if(arguments.length === 0) {
			return grading(this.data, y, x);
		}
		else {
			this.data._layer.value(y, x, g);
			return this;
		}
  };
}

function grading(data, r, c) {
  var grade = data._layer.value(r, c);

  var len = data.layers.length;
  for(var i = 0; i < len; i++) {
    var _layer = data.layers[i];
    if(_layer.enabled()) {
      var _grade = _layer.value(r, c);
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

  return grade;
}

Die.prototype = {
  constructor: Die,
}
