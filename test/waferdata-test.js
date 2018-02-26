var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    uia = require("../");

tape("uia.waferdata: all layer visible", function(test) {
  var waferdata = uia.waferdata(51, 49)
    .layer('1', function(r, c) { return { x: c, y: r, grade: 'd' }; })
    .layer('2', function(r, c) { return { x: c, y: r, grade: 'a' }; });

  console.log(waferdata.layer('1').value(1, 1));
  console.log(waferdata.layer('2').value(1, 1));
  console.log(waferdata.die(1, 1));

  test.end();
});

tape("uia.waferdata: 2nd layer visible", function(test) {
  var waferdata = uia.waferdata(51, 49)
    .layer('1', function(r, c) { return { x: c, y: r, grade: 'd' }; })
    .layer('2', function(r, c) { return { x: c, y: r, grade: 'a' }; });

  waferdata.layer('1').enabled(false);

  console.log(waferdata.layer('1').value(1, 1));
  console.log(waferdata.layer('2').value(1, 1));
  console.log(waferdata.die(1, 1));

  test.end();
});
