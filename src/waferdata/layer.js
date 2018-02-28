export default function(id, value) {
  if(value === undefined) {
    var found = this.layers.find(function(layer) {
      return layer.id == id;
    });
    return found;
  }
  else {
    this.layers.push(new Layer(id, this.rows, this.cols, value));
    return this;
  }
}

export function Layer(id, rows, cols, value) {
  this.id = id;
  this.on = true;
  this.dies = new Array(rows);
  // dies
  for(var r = 0; r < rows; r++) {
    this.dies[r] = new Array(cols);
    for(var c = 0; c < cols; c++) {
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
    if(this.dies.length === 0 || r >= this.dies.length || c >= this.dies[r].length) {
      return v === undefined ? this : undefined;
    }

    if(arguments.length === 2) {
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
