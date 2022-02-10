export default function(on) {
    if(on === undefined) {
        return this.on;
    } else {
        this.on = on;
        this.shotmap.draw();
        return this;
    }
}
  