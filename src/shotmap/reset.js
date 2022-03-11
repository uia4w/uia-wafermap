export default function() {
	this.app.stage.x = 0;
	this.app.stage.y = 0;
  this.app.stage.scale.x = 1;
  this.app.stage.scale.y = 1;

  this.app.render();

  return this;
}
