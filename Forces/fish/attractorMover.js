var mover,
    attractor,
    trail = 0,
    trailArray = []
    
function setup() {
    createCanvas(800, 600);
    mover = new Mover()
    attractor = new Attractor(500)
}

function draw() {
    background(255)
    attractor.update();
    mover.update();
    mover.addTrail();
    for(var i=0; i<trailArray.length; i++){
        mover.displayTrail(i);        
    }
    mover.display();
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
        fill(this.colr,20)
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad)
    }    
}

var Mover = function(m){
    this.pos = createVector(width/2, height/2)
    this.rad = 10
    this.colr = "red"
    this.mass = 10
    this.velocity = createVector(0,0)
    this.acceleration = createVector(2,2)
    this.force = createVector(0,0)
    
    this.update = function(){        
        this.force = p5.Vector.sub(attractor.pos, this.pos);
        
        var distance = this.force.mag();
        distance = constrain(distance, 15,35)
        var m = (.01*this.mass*attractor.mass)/(distance*distance)
        
        this.force.normalize();
        this.force.mult(m);
        
        this.acceleration.add(this.force)        
        this.velocity.add(this.acceleration)
        
        this.velocity.limit(4)
        this.pos.add(this.velocity)
        this.acceleration.normalize()
    }
    
    this.addTrail = function(){
        var i = trail%15
        trailArray.push(this.pos.copy())
        if(trailArray.length>16){
            trailArray.splice(0,1)
        }
        trail++
    }
    
    
    this.display = function(){
        noStroke()
        fill("red")
        ellipse(this.pos.x, this.pos.y, 12,12)
    }
    
    this.displayTrail = function(i){
        var tail
      // stroke("yellow")
        if(trailArray[i] && i<15){
            fill(255,0,0)
            if(i==0){
                tail = 12;
            }else if(i == 11){
                tail = 20;
            }else if(i == 1){
                tail = 15;
            }
            ellipse(trailArray[i].x, trailArray[i].y, tail || i+3, tail || i+3)
         //   noStroke()
            fill(255)
            ellipse(trailArray[0].x, trailArray[0].y, 13, 13)
        }
        
    }
    
}