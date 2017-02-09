
var loc;
var vel;
var mover;
    
function setup() {
    createCanvas(screen.availWidth/1.2, screen.availHeight/1.5);
    loc = createVector(random(screen.availWidth/1.2),random(screen.availHeight/1.5));
    vel = createVector(random(-2,2),random(-2,2));
    mover = new Mover();
}

function draw() { 
  background(255);
  mover.update();
  mover.checkEdges();
  mover.display();
}

function Mover(){
    this.location = loc;
    this.velocity = vel;
}

Mover.prototype.update = function(){
  this.location.add(this.velocity);
}

Mover.prototype.display = function() {
  stroke(0);
  fill(175);
  ellipse(this.location.x,this.location.y,16,16);
}

Mover.prototype.checkEdges = function() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }
 
    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }