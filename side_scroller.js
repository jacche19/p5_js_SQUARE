var w = window.innerWidth;
var h = window.innerHeight;
var jumper = new jumper();
var barrier = new barrier();
var hit = false;

function setup() {
  createCanvas(w,h);
}

function draw() {
  background(0);
  jumper.show();
  barrier.show();
  jumper.update();
  barrier.update();
  hit = collideRectCircle(barrier.x, barrier.y, barrier.rectX, barrier.rectY, jumper.x , jumper.y, 50);
  if (hit == true) {
    noLoop();
    }
}

function jumper() {
  this.x = 50;
  this.y = 0;
  this.gravity = 1.5; //Force of gravity
  this.lift = -30; //Opposing force of gravity
  this.velocity = 0; //Velocity of player
  
  this.show = function() {
    fill(color("red"));
    ellipse(this.x, this.y, 50, 50);
  };
  
  this.up = function() {
    this.velocity += this.lift; //Jumping function
  };
  
  this.right = function() {
    if ((this.x < w) && (this.y > 0)) {
     this.x += 20;
    }
  };
  
  this.left = function() {
    if ((this.x < w) && (this.y > 0)) {
     this.x -= 20;
    }
  };
  
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
  };
}

function platform() {
  
}

function barrier() {
  this.x = w;
  this.y = Math.floor(Math.random()*h);
  this.gravity = -2;
  this.velocity = -30;
  rectX = 100;
  rectY = 100;
  
  this.show = function() {
    fill(color("blue"));
    rect(this.x, this.y, rectX, rectY);
  };
  
  this.update = function() {
    this.velocity += this.gravity;
    this.x += this.velocity;
    this.velocity *= 0.8;
    if (this.x < -100) {
      this.x = w;
      this.velocity = -10;
      this.y = Math.floor(Math.random()*h);
      rectY = 50 + Math.floor(Math.random()*h/3);
    }
  };
  
}

function keyPressed() {
  if (keyCode === 32) { //space
    jumper.up();
  }
  if (keyCode === 37) { //left
    jumper.left();
  }
  if (keyCode === 39) { //right
    jumper.right();
  }
}