noiseChange = 0.01;
noiseOffset = 0.5;
lineWidth = 60;
numLines = 10;
col1 = 0;
col2 = 80;
col3 = 133;

function setup() {
  col1 = random(200, 250);
  col2 = random(30, 80);
  col3 = random(0, 255);
  createCanvas(1080, 1080);
  frameRate(30);
  createLine();
}

function draw() {
  createLine(noiseOffset);
  background(col1, col2, col3);
  noStroke();
  //stroke(255, 255, 255);
  strokeWeight(2);
  for (j = 0; j < numLines; j++) {
    let coords = createLine(noiseOffset);
    fill(col1 - j * (col1 / numLines), col2, col3 + j * (col1 / numLines))
    push();
    translate(j * (width / numLines), 0)
    beginShape();
    vertex(width, 0)
    for(i = 0; i < height; i++){
      vertex(coords[i][0], i);
    }
    vertex(width, height);
    endShape(CLOSE);
    pop();
  }
  noiseOffset+=0.05;
}

function createLine(noiseOffset){
  let coords = [];
  for (i = 0, noiseVal = noiseOffset; i < height; i++, noiseVal += noiseChange) {
    offset = map(noise(noiseVal, noiseOffset), 0, 1, -lineWidth / 2, lineWidth / 2);
    offset2 = map(noise(noiseVal + noiseChange, noiseOffset), 0, 1, -lineWidth / 2, lineWidth / 2);
    coords[i] = [offset, offset2];
  }
  return coords;
}

function keyPressed() {
  if(key === 's') {
    saveGif("wiggly_lines", 10)
  }
}