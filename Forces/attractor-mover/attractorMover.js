var mover = [],
    count = 1,
    attractor;
    
function setup() {
    createCanvas(800, 600);
    //mover = new Mover()
    attractor = new Attractor(500)
    for(var a=0; a<count; a++){
        mover[a] = new Mover()
    }
}

function draw() {
    background(255)
    attractor.update();
    attractor.display();
    for(var a=0; a<count; a++){
        mover[a].update();
        mover[a].checkEdges();
        mover[a].display();
    }
    
}

function mousePressed(){
    background(255)
}

var Attractor = function(m){
    this.pos = new createVector(mouseX, mouseY)
    this.rad = 30
    this.colr = random(255)    
    this.mass = m
    
    this.update = function(){
        this.pos.x = mouseX        
        this.pos.y = mouseY
    }
    
    this.display = function(){
        noStroke()
        fill(this.colr)
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad)
    }    
}

var Mover = function(m){
    this.pos = createVector(random(width), random(height))
    this.rad = round(random(5,15))
    this.colr = {r:random(255),g:random(255),b:random(255)}
    this.mass = round(random(10, 15))
    this.velocity = createVector(0,0)
    this.acceleration = createVector(2,2)
    this.force = createVector(0,0)
    
    this.update = function(){        
        this.force = p5.Vector.sub(attractor.pos, this.pos);
        
        var distance = this.force.mag();
        distance = constrain(distance, 50,80)
        var m = (.05*this.mass*attractor.mass)/(distance*distance)
        
        this.force.normalize();
        this.force.mult(m);
        
        this.acceleration.add(this.force)        
        this.velocity.add(this.acceleration)
        
        this.velocity.limit(4)
        this.pos.add(this.velocity)
        this.acceleration.normalize()
    }    
    
    this.checkEdges = function() {
        if (this.pos.x > width) {
          this.pos.x = width-this.rad;
        } else if (this.pos.x < 0) {
          this.pos.x = this.rad;
        }

        if (this.pos.y> height) {
          this.pos.y = height-this.rad;
        } else if (this.pos.y < 0) {
          this.pos.y = this.rad;
        }
  }
    
    this.display = function(){
        //noStroke()
        fill(this.colr.r, this.colr.g, this.colr.b)
        ellipse(this.pos.x, this.pos.y, this.rad,this.rad)
    }    
    
}