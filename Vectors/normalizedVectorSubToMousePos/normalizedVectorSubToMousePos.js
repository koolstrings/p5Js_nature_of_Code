
function setup() {
  createCanvas(screen.availWidth/1.3, screen.availHeight/1.5);
}


function draw() {
    background(255);
    var mouse  = createVector(mouseX,mouseY);
    var center = createVector(width/2,height/2);
    mouse.sub(center);
    mouse.normalize();
    mouse.mult(50)
    //translate moves the origin so 0,0 is the center of the screen now
    translate(width/2,height/2);
    stroke(0);
    line(0,0,mouse.x,mouse.y);
}