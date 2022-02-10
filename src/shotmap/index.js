import shotmap_attachClick from "./attachClick";
import shotmap_create from "./create";
import shotmap_data from "./data";
import shotmap_die_palette from "./diePalette";
import shotmap_draw from "./draw";
import shotmap_visibility from "./visibility";
import shotmap_wafer from "./wafer";
import shotmap_notch from "./notch";

/**
 * new ShotMap object.
 * 
 * @param {string} The id.
 * @param {int} zoom Zoom size, optional, default is 3.
 * @return {uia.ShotMap} The shotmap object.
 */
export default function shotmap(elementId, zoom = 3) {
  return new ShotMap(elementId, zoom);
}

/**
 * The constructor.
 * 
 * @param {string} The id.
 * @param {int} zoom Zoom size, optional, default is 3.
 */
function ShotMap(id, zoom = 3) {
  var _id = id;
  this.zoom = zoom;
  this.id = function() {
    return _id;
  };

  // create
  this.diameter = 200;
  this.margin = 3;

  // notch
  this.notchSide = "down";
  this.notchOffset = 1;
}

ShotMap.prototype = (function(){
  return {
    constructor: ShotMap,
    attachClick: shotmap_attachClick,
    create: shotmap_create,
    data: shotmap_data,
    diePalette: shotmap_die_palette,
    draw: shotmap_draw,
    visibility: shotmap_visibility,
    wafer: shotmap_wafer,
    notch: shotmap_notch
  };
}())
