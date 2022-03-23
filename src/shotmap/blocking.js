import { ArrayResource } from "pixi.js/dist/browser/pixi";

export default function(blur = 9, bg = null) {
  let canvas = this.extract("canvas");
  let src = cv.imread(canvas);
  let dst = new cv.Mat();

  cv.medianBlur(src, src, blur % 2 == 0 ? blur + 1 : blur);

  let masked = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC1);
  let subtractor = new cv.BackgroundSubtractorMOG2(500, 16, true);
  subtractor.apply(src, masked);

  cv.threshold(src, dst, 0, 255, cv.THRESH_BINARY);

  var width = canvas.width;
  var height = canvas.height;

  var data = new Array(height);
  for (var y = 0; y < height; y++) {
    data[y] = new Array(width);
    for (var x = 0; x < width; x++) {
      data[y][x] = 0;
    }
  }

  var links = [];
  var aid = 1;
  for (var y = 1; y < height - 1; y++) {
    var row = data[y];
    for (var x = 1; x < width - 1; x++) {
      var ignore = nav(dst, x, y, bg) || (
        nav(dst, x - 1, y - 1, bg) &&
        nav(dst, x, y - 1, bg) &&
        nav(dst, x + 1, y - 1, bg) &&
        nav(dst, x - 1, y, bg) &&
        nav(dst, x + 1, y, bg) &&
        nav(dst, x - 1, y + 1, bg) &&
        nav(dst, x, y + 1, bg) &&
        nav(dst, x + 1, y + 1, bg));

      if (!ignore) {
        // 1 2 3
        // 4 ? .
        var a1 = data[y - 1][x - 1];
        var a2 = data[y - 1][x];
        var a3 = data[y - 1][x + 1];
        var a4 = row[x - 1];
        if (a4 != 0) {
          row[x] = a4;
        } else if (a1 != 0) {
          row[x] = a1;
        } else if (a2 != 0) {
          row[x] = a2;
        } else if (a3 != 0) {
          row[x] = a3;
        } else {
          row[x] = aid++;
        }

        // link tow areas
        if (a3 != 0 && row[x] != a3) {
          var aid1 = Math.min(row[x], a3);
          var aid2 = Math.max(row[x], a3);
          if (!links.find(link => link[0] == aid1 && link[1] == aid2)) {
            links.push([aid1, aid2]);
          }
        }
      }
    }
  }

  aid = width * height;
  var areaLinks = {};
  var groups = grouping(links);
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    group.forEach(id => areaLinks[id] = aid);
    aid++;
  }

  // area
  var areas = {};
  for (var y = 0; y < height; y++) {
    var row = data[y];
    for (var x = 0; x < width; x++) {
      if (row[x] != 0) {
        row[x] = areaLinks[row[x]] || row[x];
        areas[row[x]] = areas[row[x]] || { id: row[x], pts: 0 };
        areas[row[x]].pts++;

      }
    }
  }
  var sorted = Object.values(areas).sort((a, b) => b.pts - a.pts);
  for (var r = 0; r < sorted.length; r++) {
    sorted[r]["rank"] = r;
  }

  src.delete();
  dst.delete();

  return {
    data: data,
    areas: areas
  }
}

function nav(src, x, y, background) {
  let r = src.ucharAt(y, x * src.channels());
  let g = src.ucharAt(y, x * src.channels() + 1);
  let b = src.ucharAt(y, x * src.channels() + 2);
  let rgb = r << 16 || g << 8 || b;
  return (background != null && background == rgb) || (r == 255 && g == 255 && b == 255) || (r == 0 && g == 0 && b == 0);
}

function grouping(links) {
  var result = [];
  var merge = false;
  for (var l = 0; l < links.length; l++) {
    var link = links[l];
    var found = null;
    for (var r = 0; r < result.length; r++) {
      var one = result[r];
      for (var x = 0; x < link.length; x++) {
        if (one.find(o => o == link[x])) {
          found = one;
          break;
        }
      }
      if (found != null) {
        break;
      }
    }

    if (!found) {
      result.push(link);
    } else {
      merge = true;
      for (var x = 0; x < link.length; x++) {
        if (!found.find(o => o == link[x])) {
          found.push(link[x]);
        }
      }
    }
  }
  if (merge) {
    return grouping(result);
  } else {
    return result;
  }
}