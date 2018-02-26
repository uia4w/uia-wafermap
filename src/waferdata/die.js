export default function(r, c) {
  var die = new Die(r, c);
  var len = this.layers.length;
  for(var i = 0; i < len; i++) {
    var layer = this.layers[i];
    if(layer.enabled()) {
      die.mark(layer.value(r, c).grade);
    }
  }
  return die;
}

function Die(r, c) {
  this.x = c;
  this.y = r;
  this.grade = undefined;
}

Die.prototype = {
  constructor: Die,
  mark: function(grade) {
    if(this.grade == 'f' || grade == 'f') {
      this.grade = 'f';
    }
    else if(grade == 'd' || grade == 'e' || grade == 'g') {
      this.grade = grade;
    }
    else if(grade && this.grade != 'd' && this.grade != 'e' && this.grade != 'g') {
      this.grade = grade;
    }
    return this;
  }
}
