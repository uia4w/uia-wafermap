import waferdata from '../waferdata/index';

/**
 * create wafer data.
 * @param {int} rows The row count.
 * @param {int} cols The column count.
 * @return {WaferData} The wafer data.
 */
export default function(rows, cols) {
  return waferdata(rows, cols);
}
