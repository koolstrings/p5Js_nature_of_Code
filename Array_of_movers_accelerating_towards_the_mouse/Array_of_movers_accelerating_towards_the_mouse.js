
var mover = [];
    
function setup() {
    createCanvas(screen.availWidth/1.2, screen.availHeight/1.5);
    for(var i=0; i<10; i++){
      mover[i] = new Mover();
    }
}

function draw() {
  background(255);
    for(var a=0; a<10; a++){
      mover[a].update();
      mover[a].checkEdges();
      mover[a].display();
    }
}

function Mover(){
    this.location = createVector(random(screen.availWidth/4),random(screen.availHeight/4));
    this.velocity = createVector(0,0);
    this.acceleration = createVector(-0.001,0.01);
    this.mousePos = createVector(mouseX, mouseY)
    this.dir = p5.Vector.sub(this.mousePos, this.location)
    this.col = random(255)
}

Mover.prototype.update = function(){
  this.mousePos = createVector(mouseX, mouseY)
  this.dir = p5.Vector.sub(this.mousePos, this.location)
  this.dir.normalize();
  this.dir.mult(0.5);
  
  this.acceleration = this.dir;
  
  this.velocity.add(this.acceleration);
  this.velocity.limit(8);
  this.location.add(this.velocity);
}

Mover.prototype.display = function() {
  stroke(0);
  fill(this.col);
  ellipse(this.location.x,this.location.y,35,35);
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