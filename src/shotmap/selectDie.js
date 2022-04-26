export default function(row, col, color = 0xffff00) {
  if (this.selectedDie) {
    this.selectedDie.destroy();
  }
  if (!this.app || arguments.length == 0) {
    return;
  }

  var posR = this.waferdata.posR(row, col);

  var dw = this.dieWidth;
  var dh = this.dieHeight;

  var dx0 = (this.diameter - dw * this.waferdata.cols) / 2
  var dy0 = (this.diameter - dh * this.waferdata.rows) / 2
  if (this.notchSide == "left" || this.notchSide == "l") {
    dx0 += dw * this.notchOffset;
  } else if (this.notchSide == "right" || this.notchSide == "r") {
    dx0 -= dw * this.notchOffset;
  } else if (this.notchSide == "up" || this.notchSide == "u") {
    dy0 += dh * this.notchOffset;
  } else {
    dy0 -= dh * this.notchOffset;
  }
  var dx = dx0 + dw * posR.drawCol;
  var dy = dy0 + dh * posR.drawRow;

  this.selectedDie = createDie(this, posR.drawRow, posR.drawCol, dx, dy, dw, dh, color);
  this.app.stage.addChild(this.selectedDie);
  this.app.render();
}

function createDie(map, row, col, dx, dy, dw, dh, color) {
  var die = new PIXI.Graphics();
  die["info"] = {
    drawRow: row,
    drawCol: col,
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