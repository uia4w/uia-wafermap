export default function() {
  var dies = [];
  for (var drawR = 0; drawR < this.rows; drawR++) {
    for (var drawC = 0; drawC < this.cols; drawC++) {
      var pos = this.pos(drawR, drawC);
      var rowOffset = pos.row - this.minRow; // from zero
      var colOffset = pos.col - this.minCol; // from zero
      var die = {
        x: pos.col,
        y: pos.row,
        pass: false,
        code: -1,
        type: null,
      }
      for (var i = 0; i < this.layers.length; i++) {
        var _layer = this.layers[i];
        if (!_layer.enabled()) {
          continue;
        }
        var code = _layer.result(rowOffset, colOffset);
        if (code < 0) {
          continue;
        }

        die.code = code;
        if (code == 0) {
          if (die.pass) {
            die.type = die.type ? die.type + "Good" : "GoodGood";
          } else if (die.type != null) {
            die.type = die.type + "Good";
          }
          die.pass = true;
        } else {
          if (die.pass) {
            die.type = "GoodBad";
          }
          die.pass = false;
        }
      }
      if (die.code >= 0) {
        dies.push(die);
      }
    }
  }
  return dies;
}