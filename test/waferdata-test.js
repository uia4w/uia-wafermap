var tape = require("tape"),
  jsdom = require("jsdom"),
  uia = require("../");

tape("uia.waferdata: layer enabled", function(test) {
  var data = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0]
  ]
  var waferdata = uia.waferdata(4, 4, 1, 1)
    .layer('1', 0)
    .layer('2', 1)
    .layer('3', function(r, c) { data[r][c] });

  test.equal(waferdata.testing(0, 0).result, 0);
  test.equal(waferdata.testing(1, 0).result, 1);
  test.equal(waferdata.testing(2, 0).result, 0);
  test.equal(waferdata.testing(3, 0).result, 0);

  test.end();
});