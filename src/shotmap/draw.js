import * as PIXI from "pixi.js/dist/browser/pixi";

/**
 * draws shotmap with data.
 *
 */
export default function() {
    if(this.dies) {
        this.dies.destroy();
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
	}
	else if (this.notchSide == "right" || this.notchSide == "r") {
		dx0 -= dw * this.notchOffset;
	}
	else if (this.notchSide == "up" || this.notchSide == "u") {
		dy0 += dh * this.notchOffset;
	}
	else {
		dy0 -= dh * this.notchOffset;
	}

    // grid: dies
	var self = this;
	var dy = dy0;
	for(var row = 0; row < this.waferdata.rows; row++) {
		var dx = dx0;
		for(var col = 0; col < this.waferdata.cols; col++) {
			var inCircle = this.checkBounding ? inside(dx, dy , dw, dh, r, r, rm) : true;

			// testResult: diff from 'testing' or 'counting'
			var testResult  = this.waferdata.testing(row, col);
			if(inCircle && testResult >= 0) {
				var die = new PIXI.Graphics();
				die["info"] = {
					drawRow: row,
					drawCol: col,
					x: dx,
					y: dy
				};
				die.lineStyle(1, 0xcccccc, dw / 10);
				die.beginFill(testResult < 0 ? 0xeeeeee : this.diePalette()(testResult));
				die.drawRect(dx, dy, dw, dh);
				die.endFill();
				die.interactive = true;
				die.on("mousedown", function(e) {
					if(self.clickHandler) {
						var _die = e.target;
						self.clickHandler({
							source: _die,
							data: self.waferdata,
							pick: function() {
								return self.waferdata.pick(_die.info.drawRow, _die.info.drawCol);
							}
						});
					}
				});
				this.dies.addChild(die);
			}
			dx += dw;
		}
		dy += dh;
	}
	this.app.stage.addChild(this.dies);
}

function inside(x, y, w, h, cx, cy, r) {
    var r2 = r * r;
    return dist(x, y, cx, cy) < r2
      && dist(x + w, y, cx, cy) < r2
      && dist(x, y + h, cx, cy) < r2
      && dist(x + w, y + h, cx, cy) < r2;
	}
  
function dist(x, y, cx, cy) {
    return (x - cx) * (x - cx) + (y - cy) * (y - cy);
}
  