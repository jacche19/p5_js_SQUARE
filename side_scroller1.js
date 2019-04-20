var w = window.innerWidth;
var h = window.innerHeight;
var jumper = new jumper();
var barrier = new barrier();
var platform = new platform();
var hit = false;
var score = 0;
var $ = document;
let bg;
let sp;

/*function draw() {
  background(bg);
  stroke(226, 204, 0);
  line(0, y, width, y);
  y++;
  if (y > height) {
    y = 0;
  }
}*/

function setup() {
  bg = loadImage('background.png');
  frameRate(60);
  createCanvas(w,h);
}

function draw() {
  clear();
  background(bg);
  /*
  var scoreNum = $.getElementById('score').innerHTML;
  scoreNum.appendChild(score);
  */
  jumper.show();
  barrier.show();
  platform.show();
  jumper.update();
  barrier.update();
  jumper.score();
  barrier.kill();
}

function jumper() {
  this.x = 50;
  this.y = 0;
  this.gravity = 1.5; //Force of gravity
  this.lift = -30; //Opposing force of gravity
  this.velocity = 0; //Velocity of player

  this.show = function() {
    ellipse(this.x, this.y, 50, 50);
    fill(color('white'));
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
    if (((this.x < ((w/2) + 220)) && (this.x > (w/2))) && ((this.y < ((h/2) - 30)) &&  (this.y > ((h/2) - 40)))) { //if jumper lands on platform, it will stop falling
      this.velocity = 0;
      this.gravity = 0;
    }
    else {
      this.gravity = 1.5;
    }
  };

  this.score = function() {
    score++;
    $.getElementById('score').innerHTML = "SCORE: " + score;
  };
}

function platform() {
  this.x = w/2;
  this.y = (h/2)-20;

  this.show = function() {
    fill(color("white"));
    rect(this.x, this.y, 200, 30);
  };
}

function barrier() {
  this.x = w;
  this.y = Math.floor(Math.random()*(h));
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

  this.kill = function() {
    hit = collideRectCircle(this.x, this.y, rectX, rectY, jumper.x , jumper.y, 32);
    if (hit === true) {
      noLoop();
      $.getElementById("end").style.display = "inline";
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
  //if "enter" key is pressed, restart game
  if (keyCode === 13) { //enter
    location.reload();
  }
}

function restart() {
  location.reload();
}
