var tape = require("tape"),
		jsdom = require("jsdom"),
		d3 = require("d3-selection"),
		uia = require("../");

tape("uia.shotmap configuration", function(test) {
  global.document = (new jsdom.JSDOM("<div id='wafer1'></div>")).window.document;
		var shotmap = uia.shotmap('wafer1')
			.wafer(200, 3, 9, 'bottom')
			.create();

	console.log(shotmap);

	test.end();
});
