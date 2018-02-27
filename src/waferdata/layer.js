export default function(id, value) {
  if(value === undefined) {
    var found = this.layers.find(function(layer) {
      return layer.id == id;
    });
    return found;
  }
  else {
    this.layers.push(new Layer(this, id, value));
    return this;
  }
}

function Layer(wafer, id, value) {
  this.id = id;
  this.on = true;
  this.dies = new Array(wafer.rows);
  // dies
  for(var r = 0; r < wafer.rows; r++) {
    this.dies[r] = new Array(wafer.cols);
    for(var c = 0; c < wafer.cols; c++) {
      this.dies[r][c] = value;
      if (typeof value === "function") {
        this.dies[r][c] = value(r, c);
      }
      else {
        this.dies[r][c] = value;
      }
    }
  }
}

Layer.prototype = {
  constructor: Layer,
  value: function(r, c, v) {
    if(r >= this.dies.length || c >= this.dies[r].length) {
      return v === undefined ? undefined : this;
    }

    if(v === undefined) {
      return this.dies[r][c];
    }
    else {
      this.dies[r][c] = v;
      return this;
    }
  },
  enabled: function(on) {
    if(on === undefined) {
      return this.on;
    }
    else {
      this.on = on;
      return this;
    }
  }
}
