
function setup() {
  createCanvas(screen.availWidth/1.3+10, screen.availHeight/1.5+10);
}


function draw() {
  background(255);
    var mouse  = createVector(mouseX,mouseY);
    var center = createVector(width/2,height/2);
    mouse.sub(center);
    translate(width/2,height/2);
    stroke(0);
    line(0,0,mouse.x,mouse.y);
}