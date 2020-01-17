export default function(r, c) {
  return new Die(this, r, c);
}

/**
 * @param {object} data
 * @param {int} r The row index.
 * @param {int} c The column index.
 */
function Die(data, r, c) {
  this.data = data;
  this.x = c;
  this.y = r;
  this.grade = undefined,
  this.testResult = function() {
    return this.grade !== undefined
        ? this.grade
        : testing(this.data, this.x, this.y);
  };


}

/**
 * merge the grade of all layers.
 * @param {WaferData} data The wafer data.
 * @param {int} x The x.
 * @param {int} y The y.
 * @return {string} The grade.
 */
function testing(data, x, y) {
  var grade = undefined;

  var len = data.layers.length;
  for(var i = 0; i < len; i++) {
    var _layer = data.layers[i];
    if(_layer.enabled()) {
      var _grade = _layer.value(x, y);
      if(_grade) {
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
