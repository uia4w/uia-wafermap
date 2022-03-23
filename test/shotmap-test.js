var tape = require("tape"),
  jsdom = require("jsdom"),
  uia = require("../");

tape("uia.shotmap configuration", function(test) {
  global.document = (new jsdom.JSDOM("<div id='wafer1'></div>")).window.document;
  var shotmap = uia.shotmap('wafer1');
  test.end();
});