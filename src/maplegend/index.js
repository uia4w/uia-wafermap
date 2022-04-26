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
  this.ref = [
    0xffffff, //  0
    0xd5e5fa, //  0-10
    0x92b0ff, // 10-20
    0x6271fd, // 20-30
    0x009c95, // 30-40
    0x64ff00, // 40-50
    0xc5ff30, // 50-60
    0xf7c50c, // 60-70
    0xf18008, // 70-80
    0xff1800, // 80-90
    0x990000
  ];
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