import maplegend_draw from "./draw";
import maplegend_range from "./range";
import maplegend_select from "./select";
import maplegend_size from "./size";
import maplegend_palette from "./palette";


export default function maplegend(id, pattern = 0) {
  return new MapLegend(id, pattern);
}

/**
 * The constructor.
 * 
 * @param {string} The id.
 */
function MapLegend(id, pattern) {
  var _id = id;
  this.id = function() {
    return _id;
  };
  this.width = 600;
  this.height = 20;
  this.min = -1;
  this.max = 4;
  this.colors = pattern == 0 ? [
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
  ] : [
    0xFF4A00,
    0xFF4A00,
    0xFFAE00,
    0xFFAE00,
    0xDCFF00,
    0xDCFF00,
    0x68FF00,
    0x68FF00,
    0x00FF7F,
    0x00FF7F,
    0x009900,
    0x009900,
    0x00FFF4,
    0x00FFF4,
    0x0097FF,
    0x0097FF,
    0x0023FF,
    0x0023FF,
    0x5100FF,
    0x5100FF,
    0xC500FF,
    0xC500FF
  ];
}

MapLegend.prototype = (function() {
  return {
    constructor: MapLegend,
    draw: maplegend_draw,
    range: maplegend_range,
    palette: maplegend_palette,
    select: maplegend_select,
    size: maplegend_size
  };
}())