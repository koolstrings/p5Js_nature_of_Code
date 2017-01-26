var x = 100;
var y = 100;
var xspeed = 3.8;
var yspeed = 2;

function setup() {
  createCanvas(screen.availWidth/1.1, screen.availHeight/1.3);
  background(255);
}

function draw() {
  background(255);
  x = x + xspeed;
  y = y + yspeed;
  
  if ((x > width*.8) || (x < 100)) {
    xspeed = xspeed * -1;
  }
  if ((y > height*.8) || (y < 100)) {
    yspeed = yspeed * -1;
  }
  
  stroke(0);
  fill(175);
  ellipse(x,y,150,150);

}