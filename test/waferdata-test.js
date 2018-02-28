var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    uia = require("../");

tape("uia.waferdata: layer enabled", function(test) {
  var waferdata = uia.waferdata(51, 49)
    .layer('1', function(r, c) { return 'a'; })
    .layer('2', function(r, c) { return 'd'; });

	test.equal('d', waferdata.die(2, 1).grade());

  waferdata.layer('2').enabled(false);
	test.equal('a', waferdata.die(2, 1).grade());

  test.end();
});


tape("uia.waferdata: _layer update", function(test) {
  var waferdata = uia.waferdata(5, 6)
    .layer('1', function(r, c) { return 'd'; });

	var die = waferdata.die(1, 2);
	test.equal('d', die.grade());

	die.grade('f');
	test.equal('f', die.grade());

	die.grade(undefined);
	test.equal('d', die.grade());
	
  test.end();
});
