var numRows = 15;
var numCols = 15;
var rowHeight;
var rows = [];
var rs = 1;
var rowSpeed = [];
var rowOffset = [];
var minSpeed = 2.4;
var maxSpeed = 5.0;


function setup() {
  createCanvas(1080, 1080);
  frameRate(30);
  noStroke();
  ellipseMode(CORNER);

  rowHeight = height / numRows;
  //for now, we assume a square canvas
  resetRows();
}

function resetRows() {
  for (let i = 0; i < numRows; i++) {
    rows[i] = [];
    for (let j = 0; j < numCols + 1; j++) {
      // 0    - 0.25  = ellipse
      // 0.25 - 0.5   = rect
      // 0.5  - 0.75  = triangle
      // 0.75 - 1     = nothing
      rows[i][j] = random();
    }
  }
  for(let i = 0; i < numRows; i++) {
    //rowSpeed[i] = random(minSpeed, maxSpeed);
    rowSpeed[i] = 0.5 + (i*1) + (random(-0.2, 0.2));
    rowOffset[i] = 0;
  }
}

function draw() {
  background('#780116');
  for(let i = 0; i < numRows; i++) {
    for(let j = 0; j < numCols + 1; j++) {
      let x = ((j*rowHeight) + rowOffset[i]) % (width + rowHeight) - rowHeight;
      let y = i*rowHeight;
      //let size = map(rowSpeed[i], minSpeed, maxSpeed, 0.5*rowHeight, rowHeight);
      let size = rowHeight;
      drawShape(rows[i][j], x, y, size);
    }
    rowOffset[i] = (rowOffset[i] + rowSpeed[i]) % (width + rowHeight);
  }

}

function drawShape(value, x, y, size) {``
  if(value < 0.15) {
    fill('#F7B538');
    ellipse(x, y, size);
  }
  else if(value < 0.3) {
    fill('#DB7C26');
    rect(x, y, size);
  }
  else if(value < 0.45) {
    fill('#D8572A');
    triangle(x+(size/2), y, x, y+size, x+size, y+size);
  }
  else if(value < 0.6) {
    fill('#C32F27');
    arc(x, y, size, size, HALF_PI, PI + HALF_PI)
  }
}

function mousePressed(fxn) {
  randomSeed(++rs);
  resetRows();
}

function keyPressed() {
  if (key === 's') {
    saveGif('exp6', 10);
  }
}