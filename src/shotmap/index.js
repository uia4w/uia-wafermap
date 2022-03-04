import shotmap_attachClick from "./attachClick";
import shotmap_create from "./create";
import shotmap_data from "./data";
import shotmap_die_palette from "./diePalette";
import shotmap_drag from "./drag";
import shotmap_draw from "./draw";
import shotmap_move from "./move";
import shotmap_notch from "./notch";
import shotmap_reset from "./reset";
import shotmap_size from "./size";
import shotmap_wafer from "./wafer";
import shotmap_wheel from "./wheel";
import shotmap_zoom_in from "./zoomIn";
import shotmap_zoom_out from "./zoomOut";
 
/**
 * new ShotMap object. 
 * 
 * @param {string} The id.
 * @return {uia.ShotMap} The shotmap object.
 */
export default function shotmap(elementId) {
  return new ShotMap(elementId);
}

/**
 * The constructor.
 * 
 * @param {string} The id.
 */
function ShotMap(id) {
  var _id = id;
  this.id = function() {
    return _id;
  };

  // create
  this.diameter = 600;
  this.margin = 10;
  // notch
  this.notchSide = "down";
  this.notchOffset = 1;
  // wheel
  this.wheelEnabled = false;
  // drag
  this.dragEnabled = false;
}

ShotMap.prototype = (function(){
  return {
    constructor: ShotMap,
    attachClick: shotmap_attachClick,
    create: shotmap_create,
    data: shotmap_data,
    diePalette: shotmap_die_palette,
    drag: shotmap_drag,
    draw: shotmap_draw,
    move: shotmap_move,
    notch: shotmap_notch,
    reset: shotmap_reset,
    size: shotmap_size,
    wafer: shotmap_wafer,
    wheel: shotmap_wheel,
    zoomIn: shotmap_zoom_in,
    zoomOut: shotmap_zoom_out
  };
}())
