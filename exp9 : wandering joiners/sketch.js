let wanderers = [];
let numWanderers = 100;
let lineDist = 50;

function setup() {
  createCanvas(400, 400);

  for(i = 0; i < numWanderers; i++) {
    wanderers.push(new Wanderer());
  }

  strokeWeight(2);
}

function draw() {
  background(255);


  for(i = 0; i < numWanderers; i++) {
    wanderers[i].move();
    wanderers[i].display();
    for(k = i; k < numWanderers; k++) {
      if(k == i) continue;
      checkAndDraw(wanderers[i], wanderers[k]);
    }
  }
  
}

function checkAndDraw(w1, w2) {
  d = dist(w1.x, w1.y, w2.x, w2.y);
  if(d < lineDist) {
    stroke(map(d, 0, lineDist, 0, 255));
    line(w1.x, w1.y, w2.x, w2.y);
  }
}


class Wanderer {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.noisex = random(0, 1000);
    this.noisey = random(0, 1000);
    this.noiseRate = 0.005;
  }

  move() {
    this.x = map(noise(this.noisex), 0, 1, 0, width);
    this.y = map(noise(this.noisey), 0, 1, 0, width);

    this.noisex += this.noiseRate;
    this.noisey += this.noiseRate;
  }

  display() {
    fill(0);
    //ellipse(this.x, this.y, 10);
  }

}