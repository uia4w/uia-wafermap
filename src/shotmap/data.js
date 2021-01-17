import waferdata from '../waferdata/index';

/**
 * creates empty data of the wafer.
 * 
 * @param {int} rows The row count.
 * @param {int} cols The column count.
 * @return {WaferData} The wafer data.
 */
export default function(rows, cols) {
  return waferdata(rows, cols);
}
