import * as PIXI from "pixi.js/dist/browser/pixi";

/**
 * create shotmap without data
 * 
 * @param {boolean} diesGrid Draw grid line of dies.
 */
export default function() {
	// width/height
	var w = this.diameter * this.zoom;
	var r = this.diameter * this.zoom / 2;
	var rm = (this.diameter - this.margin) * this.zoom / 2;
	
	// pixi
	if(!this.app) {
		this.app = new PIXI.Application({
			width: w,
			height: w,
			backgroundColor: 0xffffffff
		});

		var div = document.getElementById(this.id());
		div.setAttribute("style","width:" + w + "px");
		div.setAttribute("style","height:" + w + "px");
		div.appendChild(this.app.view);

		// circle
		const map = new PIXI.Graphics();
		// circle: wafer
		map.lineStyle(0);
		map.beginFill(0x999999);
		map.drawCircle(r, r, r);
		map.endFill();
		// circle: margin
		map.beginFill(0xeeeeee);
		map.drawCircle(r, r, rm);
		map.endFill();

		this.app.stage.addChild(map);
	}

	// draw dies
	this.draw();
	return this;
}
