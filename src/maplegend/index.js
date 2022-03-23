import maplegend_draw from "./draw";
import maplegend_layer_count from "./layerCount";
import maplegend_select from "./select";
import maplegend_size from "./size";


export default function maplegend(id) {
  return new MapLegend(id);
}

/**
 * The constructor.
 * 
 * @param {string} The id.
 */
function MapLegend(id) {
  var _id = id;
  this.id = function() {
    return _id;
  };
  this.width = 600;
  this.height = 20;
  this.layers = 1;
  this.ref = [0xffffff, 0xd5e5fa, 0x92b0ff, 0x6271fd, 0x009c95, 0x64ff00, 0xc5ff30, 0xf7c50c, 0xf18008, 0xff1800, 0x990000];
  this.colors = [0xffffff, 0x990000];
}

MapLegend.prototype = (function() {
  return {
    constructor: MapLegend,
    draw: maplegend_draw,
    layerCount: maplegend_layer_count,
    select: maplegend_select,
    size: maplegend_size
  };
}())