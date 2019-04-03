var w = window.innerWidth;
var h = window.innerHeight;
var jumper = new jumper();

function setup() {
  createCanvas(w,h);
}

function draw() {
  background(0);
  jumper.show();
  jumper.update();
}

function jumper() {
  this.x = 50;
  this.y = 0;
  this.gravity = 0.5; //Force of gravity
  this.lift = -10; //Opposing force of gravity
  this.velocity = 0; //Velocity of player
  
  this.show = function() {
    fill(color("red"));
    ellipse(this.x, this.y, 50, 50);
  }
  
  this.up = function() {
    this.velocity += this.lift; //Jumping function
  }
  
  this.update = function() {
    this.velocity += this.gravity; //Gravity applied when not jumping
    this.y += this.velocity;
    this.velocity *= 0.8; //air resistance
    if (this.y > h) { //for the floor
      this.y = h;
      this.velocity = 0;
    }
    if (this.y < 0) { //jumper hits the ceiling
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    jumper.up();
  }
}