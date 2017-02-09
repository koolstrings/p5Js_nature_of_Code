var movers = [],
    h = 567,
    w = 1366,
    count = 300,
    friction = [];

function setup() {
    createCanvas(w, h);
    //reset();    
}

function draw() {
    var gravity,
        wind,
        randX = round(random(10))/10 - round(random(10))/20,
        randY = round(random(10))/10 - round(random(10))/20
    background(80);
    if(movers.length<count){     
        movers.push(new Mover(random(0.5, 15), random(w),-random(400)))   
    }
    for (var i = 0; i < movers.length; i++) {
        friction[i] = createVector(0,0);
        gravity = createVector(0, 0.05*movers[i].mass)
        wind = createVector(randX*(30/movers[i].mass),randY)
        movers[i].getFriction(i)
        movers[i].applyForce(friction[i]);
        movers[i].applyForce(wind);
        movers[i].applyForce(gravity);
        movers[i].update();
        movers[i].checkEdges();
//        for (var j = 0; j < movers.length; j++) {
//            if(i!=j){
//                movers[i].checkCollision(movers[j]);
//            }
//        }
        movers[i].display();
    }
}

function mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
function reset() {
  for (var i = 0; i < count; i++) {
    movers[i] = new Mover(random(0.5, 15), w/2,-random(400))//random(h), random(w))//40+i*70, 0);
  }
}

function Mover(m,x,y) {
    this.mass = m;
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.ballColor = createVector(random(255),random(255),random(255))
    this.touchGround = 0
    this.rad = this.mass*2
}


Mover.prototype.getFriction = function(a){
    friction[a].add(this.velocity)
    friction[a].mult(-1);
    friction[a].normalize();
    friction[a].mult(0.9)
}

Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass)
    this.acceleration.add(f)
};
  
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration)    
    this.velocity.limit(30)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
};

Mover.prototype.display = function(i) {
    //fill(this.ballColor.x,this.ballColor.y,this.ballColor.z)
    //fill("white")
    //noStroke()    
    
    noFill()    
    stroke(this.ballColor.x,this.ballColor.y,this.ballColor.z)
    ellipse(this.position.x+1, this.position.y+1, this.rad, this.rad)
    
    stroke(255)    
    fill(this.ballColor.x,this.ballColor.y,this.ballColor.z,50)
    ellipse(this.position.x, this.position.y, this.rad, this.rad)
    
    noStroke()
    fill(255,50)
    ellipse(this.position.x-this.rad/5, this.position.y-this.rad/4, 15/this.rad, 15/this.rad)
    
    fill("red")
    rect(w-80, h-80, 80, 80)
    
    fill("green")
    rect(0, 0, 80, 40)
};

Mover.prototype.checkCollision = function(other) {
    var horizontalSpeed = this.velocity.x
    var d = this.position.dist(other.position)
    if(d<10 && this.touchGround>5){
        p5.Vector.add(this.velocity.mult(0),other.velocity)
        this.velocity.mult(-1)
//       p5.Vector.add(this.position.add(this.rad), other.position)
//        this.position.x = this.radom(w)
//        this.position.y = -random(150)
        //this.ballColor = other.ballColor
    }
};

Mover.prototype.checkEdges = function() {
    var horizontalSpeed = this.velocity.x
    var verticalSpeed = this.velocity.y
        
    if((this.position.x) <= this.rad){
        if((this.position.y+this.rad) >= h){
            this.touchGround = 0;
            this.position.x = w-random(10)
            this.position.y = -random(150)    
        }else{
            this.velocity.mult(-1)
            this.position.x = this.rad
            this.velocity.y = verticalSpeed
        }
    }else if((this.position.x+this.rad) >= w){
        this.velocity.mult(-1)
        this.position.x = w-this.rad
        this.velocity.y = verticalSpeed        
    }
    
    if((this.position.y+this.rad) >= h){
        if(this.position.x+this.rad >= w){
            this.touchGround = 0;
            this.velocity.mult(0)
            this.position.x = random(10)
            this.position.y = -random(150)    
        }else{
            this.touchGround++;
            this.velocity.mult(-1)
            this.position.y = h-this.rad
            this.velocity.x = horizontalSpeed            
        }
    }
    
    if(this.touchGround>1 && (this.position.y) >= this.rad){
        
    }
};