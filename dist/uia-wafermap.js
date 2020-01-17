(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection'], factory) :
  (global = global || self, factory(global.uia = global.uia || {}, global.d3));
}(this, (function (exports, d3) { 'use strict';

  function waferdata_layer(id, value) {
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

  function Layer(id, rows, cols, value) {
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
  };

  function waferdata_die(r, c) {
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
  };

  function waferdata(rows, cols) {
    return new WaferData(rows, cols);
  }

  function WaferData(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.layers = new Array();
    this._layer = new Layer('current', rows, cols, undefined);
  }

  WaferData.prototype = {
    constructor: WaferData,
    layer: waferdata_layer,
    die: waferdata_die
  };

  /**
   * bind data to elements
   * @param {WaferData} data Information of all dies
   * @param {int} x0 Offset x
   * @param {int} y0 Offset y
   */
  function shotmap_bind(data, x0, y0) {
    // offset x
    if(x0 === undefined) {
      x0 = 0;
    }
    // offset y
    if(y0 === undefined) {
      y0 = 0;
    }
    for(var y = 0; y<data.rows; y++) {
      for(var x = 0; x < data.cols; x++) {
        d3.select('#' + this.id() + '_dies_' + (x0 + x) + '_' + (y0 + y))
          .datum(data.die(y, x));
      }
    }

    return this;
  }

  /**
   * create shotmap without data
   *
   */
  function shotmap_create() {
  	// width/height: die
  	var dw = this.dieWidth * this.zoom;
  	var dh = this.dieHeight * this.zoom;

  	// width/height: reticle
  	var rtw = dw * this.diesX;
  	var rth = dh * this.diesY;

  	// width/height: svg
  	var w = this.diameter * this.zoom + rtw * 2;
  	var h = this.diameter * this.zoom + rth * 2;

  	// svg
  	this.svg = d3.select('#' + this.id()).append('svg')
  		.attr('id', this.id() + '_svg')
  		.attr('width', w)
  		.attr('height', h);

  	// shadow
  	var defs = this.svg.append("defs");
  	var filter = defs.append("filter")
  		.attr("id", "drop-shadow")
  		.attr("height", "125%");
  	filter.append("feGaussianBlur")
  		.attr("in", "SourceAlpha")
  		.attr("stdDeviation", 3)
  		.attr("result", "blur");
  	filter.append("feOffset")
  		.attr("in", "blur")
  		.attr("dx", 3)
  		.attr("dy", 3)
  		.attr("result", "offsetBlur");
  	var feMerge = filter.append("feMerge");
  	feMerge.append("feMergeNode")
  		.attr("in", "offsetBlur");
  	feMerge.append("feMergeNode")
  		.attr("in", "SourceGraphic");

  	// circle
  	var d = this.diameter * this.zoom;
  	var m = this.margin * this.zoom;
  	var r = d / 2;
  	var rm = r - m;
  	var cx = r + rtw;
  	var cy = r + rth;
  	// circle: wafer
  	this.svg.append('circle')
  		.style("filter", "url(#drop-shadow)")
  		.attr('cx', cx)
  		.attr('cy', cy)
  		.attr('r', r)
  		.attr('class', 'wafer')
  		.attr('fill', "gray");
  	// circle: margin
  	this.svg.append('circle')
  		.attr('cx', cx)
  		.attr('cy', cy)
  		.attr('r', rm)
  		.attr('stroke', '#222')
  		.attr('fill', "lightgray");

    // position of reticle at top-left
    var rtx0 = (r + this.zoom * this.offsetX + rtw / 2) % rtw;
    var rty0 = (r + this.zoom * (-this.offsetY) + rth / 2) % rth;

  	// position of die at top-left
  	var dx0 = rtx0 + Math.ceil((cx - rm - rtx0) / dw) * dw;
  	var dy0 = rty0 + Math.ceil((cy - rm - rty0) / dh) * dh;
  	var dx1 = dx0 + Math.floor((cx + rm - dx0) / dw) * dw;
  	var dy1 = dy0 + Math.floor((cy + rm - dy0) / dh) * dh;

  	this.svg.append("rect")
  		.attr('x', dx0)
  		.attr('y', dy0)
  		.attr('width', dx1 - dx0)
  		.attr('height', dy1 - dy0)
  		.attr('stroke', 'lightgray')
  		.attr('stroke-width', 0.8)
  		.attr('fill', 'none');

  	// flat
  	var flatL = 0,
          flatR = w,
          flatT = 0,
          flatB = h;
  	if(this.notchSide == 'left') flatL = cx - r + this.notch * this.zoom;
  	if(this.notchSide == 'right') flatR = cx + r - this.notch * this.zoom;
  	if(this.notchSide == 'top') flatT = cy - r + this.notch * this.zoom;
  	if(this.notchSide == 'bottom') flatB = cy + r - this.notch * this.zoom;

  	// grid: dies
  	var x = 0;
  	var y = 0;
  	var gd = this.svg.append('g')
  		.attr('id', this.id() + "_dies");
  	for(var dy=dy0; dy<dy1; dy+=dh) {
  		for(var dx=dx0; dx<dx1; dx+=dw) {
  			var rect = gd.append('rect')
  				.attr('id', this.id() + '_dies_' + x + '_' + y)
  				.attr('x', dx)
  				.attr('y', dy)
  				.attr('width', dw)
  				.attr('height', dh)
  				.attr('class', 'die')
  				.on("click", updateDie);

  			if(inside(dx, dy, dw, dh, cx, cy, rm) && flat(dx, dy, dw, dh, flatL, flatR, flatT, flatB)) {
  				rect.attr('stroke', 'darkgray')
  					.attr('stroke-width', 1)
  					.attr('fill', 'lightgray');
  			}
  			else {
  				rect.attr('visibility', 'hidden');
  			}
  			x++;
  		}
  		x = 0;
  		y++;
  	}

  	// grid: reticle
  	var gr = this.svg.append('g')
  		.attr('id', this.id() + "_reticles");
  	for(var rtx=rtx0; rtx<w; rtx+=rtw) {
  		for(var rty=rty0; rty<h; rty+=rth) {
  			if(touch(rtx, rty, rtw, rth, cx, cy, r)) {
  				gr.append('rect')
  					.attr('x', rtx)
  					.attr('y', rty)
  					.attr('width', rtw)
  					.attr('height', rth)
  					.attr('stroke', 'black')
  					.attr('stroke-width', 0.8)
  					.attr('fill', 'none');
  				}
      }
    }

  	// circle: cross
  	var g0 = this.svg.append('g')
  		.attr('id', this.id() + "_cross");
  	g0.append('line')
  		.attr('x1', cx)
  		.attr('y1', 0)
  		.attr('x2', cx)
  		.attr('y2', h)
  		.attr('stroke-width', 1)
  		.attr('stroke', 'orange');
  	g0.append('line')
  		.attr('x1', 0)
  		.attr('y1', cy)
  		.attr('x2', w)
  		.attr('y2', cy)
  		.attr('stroke', 'orange')
  		.attr('stroke-width', 1);

  	return this;
  }

  function updateDie() {
  	var rect = d3.select(this)
  		.attr('visibility', 'visible');
  	var die = rect.datum();
  	if(rect.attr('fill') === 'lightgray') {
  		rect.attr('fill', 'green');
  		die.grade = 'bin';
  	}
  	if(rect.attr('fill') === 'green') {
  		rect.attr('fill', 'yellow');
  		die.grade = 'd';
  	}
  	else if(rect.attr('fill') === 'yellow') {
  		rect.attr('fill', 'red');
  		die.grade = 'f';
  	}
  	else {
  		rect.attr('fill', 'lightgray');
  		die.grade = undefined;
  	}
  }

  function inside(x, y, w, h, cx, cy, r) {
    var r2 = r * r;
    return dist(x, y, cx, cy) < r2
      && dist(x + w, y, cx, cy) < r2
      && dist(x, y + h, cx, cy) < r2
      && dist(x + w, y + h, cx, cy) < r2;
  }

  function touch(x, y, w, h, cx, cy, r) {
    var r2 = r * r;
    return dist(x, y, cx, cy) <= r2
      || dist(x + w, y, cx, cy) <= r2
      || dist(x, y + h, cx, cy) <= r2
      || dist(x + w, y + h, cx, cy) <= r2;
  }


  function flat(x, y, w, h, flatL, flatR, flatT, flatB) {
    return (x + w / 2) >= flatL
      && (y + w / 2) >= flatT
      && (x + w / 2) <= flatR
      && (y + h / 2) <= flatB;
  }

  function dist(x, y, cx, cy) {
    return (x - cx) * (x - cx) + (y - cy) * (y - cy);
  }

  /**
   * create wafer data.
   * @param {int} rows The row count.
   * @param {int} cols The column count.
   * @return {WaferData} The wafer data.
   */
  function shotmap_data(rows, cols) {
    return waferdata(rows, cols);
  }

  /**
   * setup die size.
   * @param {int} w The width.
   * @param {int} h The height.
   */
  function shotmap_die(w, h) {
    this.dieWidth = w;
    this.dieHeight = h;
    return this;
  }

  /**
   * draw shotmap with data.
   *
   */
  function shotmap_draw() {
    d3.select('#' + this.id() + '_dies')
      .selectAll('rect')
      .transition().duration(1000)
  		.attr('class', 'die')
      .attr('fill', function(d) { return pickColor(d); });
  }

  function pickColor(d) {
    if(d === undefined) {
      return 'none';
    }

    var grade = d.testResult();
    if(grade === 'd') {
      return "yellow";
    }
    if(grade === 'e') {
      return "yellow";
    }
    if(grade === 'f') {
      return "red";
    }
    if(grade === 'g') {
      return "yellow";
    }
    if(grade === undefined) {
      return 'none';
    }
    return 'green';
  }

  /**
   * setup reticle size and position.
   * @param {int} dx The count of dies in one row.
   * @param {int} dy The count of dies in one column.
   * @param {float} ox The offset x.
   * @param {float} oy The offset y.
   */
  function shotmap_reticle(dx, dy, ox, oy) {
    this.diesX = dx;
    this.diesY = dy;
    this.offsetX = ox;
    this.offsetY = oy;
    return this;
  }

  /**
   * setup wafer infomration.
   * @param {int} diameter
   * @param {int} margin
   * @param {int} notch
   * @param {int} notchSide
   */
  function shotmap_wafer(diameter, margin, notch, notchSide) {
    this.diameter = diameter;
    this.margin = margin;
    this.notch = notch;
    this.notchSide = notchSide;
    return this;
  }

  /**
   * set/get visibility.
   *
   */
  function shotmap_visibility(g, v) {
    if(v === undefined) {
      return this.svg.select('#' + g).attr('visibility');
    }
    else {
      this.svg.select('#' + g).attr('visibility', v);
      return this;
    }
  }

  /**
   * new ShotMap object.
   * @param {string} The id.
   * @param {int} zoom Zoom size, optional, default is 3.
   */
  function shotmap(elementId, zoom) {
    return new ShotMap(elementId, zoom);
  }

  /**
   * @param {string} The id.
   * @param {int} zoom Zoom size, optional, default is 3.
   */
  function ShotMap(id, zoom) {
    var _id = id;
    this.zoom = zoom ? zoom : 3;
    this.id = function() {
      return _id;
    };

    // wafer
    this.diameter = 200;
    this.margin = 3;
    this.notch = 9;             // notch keep out
    this.notchSide = 'bottom';  // notch direction (top, bottom, left, right)

    // die
    this.dieWidth = 3.76;
    this.dieHeight= 3.74;

    // reticle
    this.diesX = 5;
    this.diesY = 6;
    this.offsetX = 0.3;
    this.offsetY = -9.8;

    // svg
    this.svg = null;
  }

  ShotMap.prototype = (function(){
    return {
      constructor: ShotMap,
      bind: shotmap_bind,
      create: shotmap_create,
      data: shotmap_data,
      die: shotmap_die,
      draw: shotmap_draw,
      reticle: shotmap_reticle,
      wafer: shotmap_wafer,
      visibility: shotmap_visibility
    };
  }());

  exports.shotmap = shotmap;
  exports.waferdata = waferdata;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
