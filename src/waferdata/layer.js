import layer from '../layer/index';

/**
 * Create a new layer.
 * @param {string} id The id.
 * @param {function} resultTester The test function.
 * @param {function} dataPicker The data picker.
 * @returns {uia.Layer} The layer object.
 */
export default function(id, resultTester, dataPicker) {
  var found = this.layers.find(function(layer) {
    return layer.id == id;
  });
  
  if(resultTester === undefined) {
    return found;
  }

  if(found == undefined) {
    this.layers.push(layer(id, this.shotmap, resultTester, dataPicker));
  }
  return this;
}