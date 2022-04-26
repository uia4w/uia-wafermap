import * as PIXI from "pixi.js/dist/browser/pixi";

/**
 * draws shotmap with data.
 *
 */
export default function() {
  if (this.dies) {
    this.dies.destroy();
  }
  if (!this.app) {
    return;
  }

  this.dies = new PIXI.Graphics();

  // width/height
  var w = this.diameter;
  var r = this.diameter / 2;
  var rm = (this.diameter - this.margin) / 2;

  // width/height: die
  var dw = this.dieWidth;
  var dh = this.dieHeight;

  var dx0 = (w - dw * this.waferdata.cols) / 2
  var dy0 = (w - dh * this.waferdata.rows) / 2
  if (this.notchSide == "left" || this.notchSide == "l") {
    dx0 += dw * this.notchOffset;
  } else if (this.notchSide == "right" || this.notchSide == "r") {
    dx0 -= dw * this.notchOffset;
  } else if (this.notchSide == "up" || this.notchSide == "u") {
    dy0 += dh * this.notchOffset;
  } else {
    dy0 -= dh * this.notchOffset;
  }

  // grid: dies
  var dy = dy0;
  for (var drawRow = 0; drawRow < this.waferdata.rows; drawRow++) {
    var dx = dx0;
    for (var drawCol = 0; drawCol < this.waferdata.cols; drawCol++) {
      var inCircle = this.checkBounding ? inside(dx, dy, dw, dh, r, r, rm) : true;

      // testResult: diff from 'testing', 'counting', 'bincode'
      var testResult = this.waferdata.testing(drawRow, drawCol, dx, dy, dw, dh);
      if (inCircle && testResult >= 0) {
        var color = testResult < 0 ? 0xeeeeee : this.diePalette()(testResult) || 0xeeeeee;
        if (this.highCode != null && this.waferdata.bincode(drawRow, drawCol, dx, dy, dw, dh) == this.highCode) {
          color = this.highColor;
        }
        var die = createDie(this, drawRow, drawCol, dx, dy, dw, dh, color);
        this.dies.addChild(die);
      }
      dx += dw;
    }
    dy += dh;
  }
  this.app.stage.addChild(this.dies);

  this.app.render();
}

function createDie(map, drawRow, drawCol, dx, dy, dw, dh, color) {
  var die = new PIXI.Graphics();
  die["info"] = {
    drawRow: drawRow,
    drawCol: drawCol,
    x: dx,
    y: dy
  };
  if (map.dieRectEnabled) {
    die.lineStyle(1, 0xcccccc, dw / 10);
  }
  die.beginFill(color);
  die.drawRect(dx, dy, dw, dh);
  die.endFill();
  die.interactive = true;
  die.on("mousedown", function(e) {
    if (map.clickHandler) {
      var _die = e.target;
      map.clickHandler({
        source: _die,
        data: map.waferdata,
        point: e.data.global,
        pick: function() {
          return map.waferdata.pick(_die.info.drawRow, _die.info.drawCol);
        }
      });
    }
  });
  die.on("mouseover", function(e) {
    if (map.hoverInHandler) {
      var _die = e.target;
      map.hoverInHandler({
        source: _die,
        data: map.waferdata,
        point: e.data.global,
        pick: function() {
          return map.waferdata.pick(_die.info.drawRow, _die.info.drawCol);
        }
      });
    }
  });
  die.on("mouseout", function(e) {
    if (map.hoverOutHandler) {
      var _die = e.target;
      map.hoverOutHandler({
        source: _die,
        data: map.waferdata,
        point: e.data.global,
        pick: function() {
          return map.waferdata.pick(_die.info.drawRow, _die.info.drawCol);
        }
      });
    }
  });
  return die;
}

function inside(x, y, w, h, cx, cy, r) {
  var r2 = r * r;
  return dist(x, y, cx, cy) < r2 &&
    dist(x + w, y, cx, cy) < r2 &&
    dist(x, y + h, cx, cy) < r2 &&
    dist(x + w, y + h, cx, cy) < r2;
}

function dist(x, y, cx, cy) {
  return (x - cx) * (x - cx) + (y - cy) * (y - cy);
}