import shotmap_bind from "./bind";
import shotmap_create from "./create";
import shotmap_data from "./data";
import shotmap_die from "./die";
import shotmap_die_palette from "./diePalette";
import shotmap_draw from "./draw";
import shotmap_reticle from "./reticle";
import shotmap_wafer from "./wafer";
import shotmap_visibility from "./visibility";

/**
 * new ShotMap object.
 * 
 * @param {string} The id.
 * @param {int} zoom Zoom size, optional, default is 3.
 */
export default function shotmap(elementId, zoom) {
  return new ShotMap(elementId, zoom);
}

/**
 * The constructor.
 * 
 * @param {string} The id.
 * @param {int} zoom Zoom size, optional, default is 3.
 */
function ShotMap(id, zoom) {
  var _id = id;
  this.zoom = zoom ? zoom : 3;
  this.id = function() {
    return _id;
  };

  // wafer
  this.diameter = 200;
  this.margin = 3;
  this.notch = 9;             // notch keep out
  this.notchSide = 'bottom';  // notch direction (top, bottom, left, right)

  // die
  this.dieWidth = 3.76;
  this.dieHeight= 3.74;

  // reticle
  this.diesX = 5;
  this.diesY = 6;
  this.offsetX = 0.3;
  this.offsetY = -9.8;

  // svg
  this.svg = null;
}

ShotMap.prototype = (function(){
  return {
    constructor: ShotMap,
    bind: shotmap_bind,
    create: shotmap_create,
    data: shotmap_data,
    die: shotmap_die,
    diePalette: shotmap_die_palette,
    draw: shotmap_draw,
    reticle: shotmap_reticle,
    wafer: shotmap_wafer,
    visibility: shotmap_visibility
  };
}())
