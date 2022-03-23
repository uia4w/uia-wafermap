export default function(offsetX, offsetY) {
  var stage = this.app.stage;
  // center
  if (offsetX === undefined) {
    offsetX = stage.x + this.diameter * stage.scale.x / 2;
    offsetY = stage.y + this.diameter * stage.scale.y / 2;
  }

  var worldPos = {
    x: (offsetX - stage.x) / stage.scale.x,
    y: (offsetY - stage.y) / stage.scale.y
  };
  var newScale = {
    x: stage.scale.x * 0.5,
    y: stage.scale.y * 0.5
  };
  var newScreenPos = {
    x: worldPos.x * newScale.x + stage.x,
    y: worldPos.y * newScale.y + stage.y
  };

  stage.x -= (newScreenPos.x - offsetX);
  stage.y -= (newScreenPos.y - offsetY);
  stage.scale.x = newScale.x;
  stage.scale.y = newScale.y;

  this.app.render();

  return this;
}