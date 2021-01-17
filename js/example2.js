var shotmap = uia.shotmap('wafer2')
  .wafer(200, 3, 9, 'bottom')
  .die(3.76, 3.74)
  .reticle(5, 6, 0.3, -9.81)
  .diePalette(failedOnly)
  .create()
  .visibility('wafer2_cross', 'hidden')
  .visibility('wafer2_rect_area', 'hidden');

var data = shotmap.data(49, 51)
  .layer('1', sampleLayer1)
  .layer('2', sampleLayer2)
  .layer('3', sampleLayer3);

shotmap.bind(data, 1, 0)
  .draw();

/**
 * sample data
 * @param {string} r The row of the die
 * @param {object} c The column of the die
 * @return Information of one die.
 */
function sampleLayer1(r, c) {
  var _grade = undefined;
  if((24 - r) * (24 - r) + (24 - c) * (24 - c) < 625) {
    _grade = 'a'
  }

  return _grade;
}

/**
 * sample data
 * @param {string} r The row of the die
 * @param {object} c The column of the die
 * @return Information of one die.
 */
function sampleLayer2(r, c) {
  var _grade = undefined;
  if((24 - r) * (24 - r) + (24 - c) * (24 - c) < 625) {
    _grade = 'a';
    if(r % 10 == 0) _grade = 'e';
    if((r + c) % 11 == 0) _grade = 'f';
  }

  return _grade;
}


/**
 * sample data
 * @param {string} r The row of the die
 * @param {object} c The column of the die
 * @return Information of one die.
 */
function sampleLayer3(r, c) {
  /**
   * x: column index
   * y: row index
   * grade: grade mark, free input
   */
  return "f";
}

function changeVisibility(id, visible) {
  shotmap.visibility(id, visible ? 'visible' : 'hidden');
}

function bind(id, enabled) {
  data.layer(id).enabled(enabled);
  shotmap.draw();
}

function failedOnly(grade) {
  if(grade === 'f') {
    return "red";
  }
  return 'none';
}
