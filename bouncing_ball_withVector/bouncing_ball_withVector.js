var loc = new myVector(100,100);
var vel = new myVector(3.5,2);

function setup() {
  createCanvas(screen.availWidth/1.3+10, screen.availHeight/1.5+10);
  background(255);
}


function draw() {
  background(255);
  loc = loc.add(vel);
  if ((loc.x > screen.availWidth/1.3) || (loc.x < 0)) {
    vel.x = vel.x * -1;
  }
  if ((loc.y > screen.availHeight/1.5) || (loc.y < 0)) {
    vel.y = vel.y * -1;
  }
  
  stroke(0);
  fill(175);
  ellipse(loc.x,loc.y,20,20);

}

function myVector(a,b){
  this.x = a;
  this.y = b;
}

myVector.prototype.add = function(other){
  return new myVector(this.x + other.x, this.y + other.y)
}