var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    uia = require("../");

tape("uia.shotmap configurtion", function(test) {
  global.document = (new jsdom.JSDOM("<div id='wafer1'></div>")).window.document;
    var shotmap = uia.shotmap('wafer1')
      .wafer(200, 3, 9, 'bottom')
      .create();

    console.log(shotmap.svg.attr('width'));
    console.log(shotmap.svg.attr('height'));

    test.end();
});

tape("uia.shotmap.data", function(test) {
  global.document = (new jsdom.JSDOM("<div id='wafer1'></div>")).window.document;

  var shotmap = uia.shotmap('wafer1');
  console.log(shotmap);

  var waferdata = shotmap.data(6, 5)
    .layer('1', function(r, c) { return { x: c, y: r, grade: 'bin1' }; })
    .layer('2', function(r, c) { return { x: c, y: r, grade: 'd' }; });

  console.log(waferdata);

  test.end();
});
