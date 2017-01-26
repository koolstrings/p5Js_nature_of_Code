var walker;


function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  randomWalker = new RandomWalker();
}

function draw() {
  randomWalker.walk();
  randomWalker.display();

}

function RandomWalker() {
  //var distance = random(15);
  this.x = width / 4;
  this.y = height / 4;
  this.prevx = width / 2;
  this.prevy = height / 2;

  this.walk = function() {
    this.prevx = this.x;
    this.prevy = this.y;
    var stepx = 0;
    var stepy = 0;
    
    /*var stepx = ceil(random(-2, 1));
    var stepy = ceil(random(-2, 1));
    this.x += stepx;
    this.y += stepy;
    

    if ((stepx+stepy) > 0) {
      this.r += 20;
      // this.b -= 20;
    } else {
      this.r -= 20;
      // this.b += 20;
    }*/
    
    var nr = random(0,1);
    if (nr < 0.01) {
      stepx = ceil(random(-50,50));
      stepy = ceil(random(-50,50));
    } else {
      stepx = ceil(random(-2,1));
      stepy = ceil(random(-2,1));
    }

    this.x += stepx;
    this.y += stepy;
    
    this.x = constrain(this.x, 0, width/2);
    this.y = constrain(this.y, 0, height/2);
    this.r = constrain(this.r, 0, 255);
  }

  this.display = function() {
    stroke(random(255),random(255),random(255));
    line(this.prevx, this.prevy, this.x, this.y);
  }

}