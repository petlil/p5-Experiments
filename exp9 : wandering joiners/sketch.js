let wanderers = [];
let numWanderers = 20;
let lineDistMin = 0;
let lineDistMax = 120;
let debug = false;

function setup() {
  createCanvas(600, 600);

  for(i = 0; i < numWanderers; i++) {
    wanderers.push(new Wanderer());
  }

  strokeWeight(2);

}

function draw() {
  background(255);


  for(i = 0; i < numWanderers; i++) {
    wanderers[i].move();
    //wanderers[i].display();
    if(debug) {
      wanderers[i].debug();
    }
    for(k = i; k < numWanderers; k++) {
      if(k == i) continue;
      checkAndDraw(wanderers[i], wanderers[k]);
    }
  }
  
}

function checkAndDraw(w1, w2) {
  d = dist(w1.x, w1.y, w2.x, w2.y);
  if(d < lineDistMax && d > lineDistMin) {
    col = map(d, lineDistMin, lineDistMax, 0, 255);
    stroke(255, col, col);
    line(w1.x, w1.y, w2.x, w2.y);

    if(debug) {
      noStroke();
      fill(0, 200, 200);
      text(int(d), midPoint(w1.x, w2.x) + 4, midPoint(w1.y, w2.y) + 4);
    }
  }
}

function midPoint(n1, n2) {
  if(n1 > n2) {
    t = n1 - n2;
    return n2 + (t / 2);
  }
  else {
    t = n2 - n1;
    return n1 + (t / 2);
  }
}


class Wanderer {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.noisex = random(0, 1000);
    this.noisey = random(0, 1000);
    this.noiseRate = 0.006;
    //this.noiseRate = 0;
  }

  move() {
    this.x = map(noise(this.noisex), 0, 1, 0, width);
    this.y = map(noise(this.noisey), 0, 1, 0, width);

    this.noisex += this.noiseRate;
    this.noisey += this.noiseRate;
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, 10);
  }

  debug() {
    noStroke();
    textFont('Helvetica', 12);
    textAlign('left', 'center');

    // x text
    fill(255, 0, 0);
    rect(this.x + width / 60, this.y - width/100, width/100, width/100);
    text("x: " + int(this.x), this.x + width / 30, this.y - width/100);

    // y text
    fill(0, 0, 255);
    rect(this.x + width / 60, this.y + width/100, width/100, width/100);
    text("y: " + int(this.y), this.x + width / 30, this.y + width/100);
  }

}

function keyPressed() {
  if(key == 's') {
    saveGif('wandering_joiners_debug', 10);
  }
}