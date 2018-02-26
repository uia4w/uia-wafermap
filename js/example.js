var shotmap = uia.shotmap('wafer2')
  .wafer(200, 3, 9, 'bottom')
  .die(3.76, 3.74)
  .reticle(5, 6, 0.3, -9.81)
  .create()
  .visibility('wafer2_cross', 'hidden');

var data = shotmap.data(49, 51)
  .layer('1', layer1)
  .layer('2', layer2);

data.layer('2').enabled(false);

shotmap.bind(data, 1, 0);


function layer1(r, c) {
  var _grade = undefined;
  if((24 - r) * (24 - r) + (24 - c) * (24 - c) < 625) {
    _grade = 'a'
  }

  return { x: c, y: r, grade: _grade };
}

function layer2(r, c) {
  var _grade = undefined;
  if((24 - r) * (24 - r) + (24 - c) * (24 - c) < 625) {
    _grade = 'a';
    if(r % 10 == 0) _grade = 'e';
    if((r + c) % 11 == 0) _grade = 'f';
  }

  return { x: c, y: r, grade: _grade };
}
