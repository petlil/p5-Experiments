/*
Weird Planktons
author: Peter Liley
15/12/21
*/

let wanderers = [];
let num = 100;
let size = 4; // size of each wanderer

function setup() {
  createCanvas(600, 600);
  background(255);
  noStroke();
  for(i = 0; i < num; i++){
    wanderers.push(new Wanderer(i));
  }
  createLoop({duration:30, gif:true})
}

function draw() {
  colorMode(RGB);
  background(0, 60, 150, 100); // deep ocean blue!
  wanderers.forEach(element => {
    element.update();
  });
}


class Wanderer {
  constructor(seed=0){

    this.nx = seed+0.01; // largely offset x seed to make left-right motion highly varied
    this.ny = seed/num+10.01; // small offset y seed to make up-down motion more unified
    this.interval = 0.01; // noise step
    
    this.x = random(0, width);
    this.y = random(0, height);
    this.xprev = this.x;
    this.yprev = this.y;

    this.size = size; // universal size at top of programme
    this.marchSpeed = 5;
  }

  update(){
    ellipse(this.x, this.y, this.size);
    this.move();
    this.chooseColour();
    this.nx += this.interval;
    this.ny += this.interval;
  }

  /**
   * Move each wanderer based on noise, and constrain to on-screen
   */
  move(){
    if(this.x >= width) this.x = 0;
    if(this.x < 0) this.x = width;
    if(this.y >= height) this.y = 0;
    if(this.y < 0) this.y = height;
    this.y -= map(noise(this.ny), 0, 1, -this.marchSpeed, this.marchSpeed);
    this.x -= map(noise(this.nx), 0, 1, -this.marchSpeed, this.marchSpeed);
  }
  
  /**
   * Change wanderer colour according to 'speed'
   * (i.e. distance between current and previous position)
   */
  chooseColour(){
    this.d = dist(this.x, this.y, this.xprev, this.yprev);
    this.c = map(this.d, 0, 3, 300, 150);
    colorMode(HSB);
    fill(this.c, 195, 255);
    this.xprev = this.x;
    this.yprev = this.y;
  }
}
