
let img;
let numColours;
let cols = [2]; // array of colours
let numCircles;
let circleWidthRatio;
let circleSize;

let numCirclesSlider;
let circleSizeSlider;
let numColoursSlider;
let button;

function preload() {
  img = loadImage("assets/4.jpeg", getColours);
}

function setup() {
  createCanvas(800, 800);

  numCirclesSlider = createSlider(1, 10000, 100, 1);
  numCirclesSlider.position(width + 20, 0);
  numCirclesSlider.style('width', '200px');

  circleSizeSlider = createSlider(1, 100, 20, 1);
  circleSizeSlider.position(width + 20, 100);
  circleSizeSlider.style('width', '200px');

  numColoursSlider = createSlider(1, 6, 2, 1);
  numColoursSlider.position(width + 20, 200);
  numColoursSlider.style('width', '200px');

  button = createButton('save');
  button.position(width + 20, 400);
  button.mousePressed(saveImage);

  generateSketch();
}

function generateSketch() {

  // query sliders
  circleWidthRatio = circleSizeSlider.value();
  numCircles = numCirclesSlider.value();
  numColours = numColoursSlider.value();

  getColours(img);
  let backgroundCol = getRandomColour(img);
  background(backgroundCol);

  let circleSize = width / circleWidthRatio; // set size of circles

  translate(circleSize / 2, circleSize / 2);
  for (var i = 0; i < numCircles; i++) {
    noStroke();
    // set fill colour (from image)
    fill(cols[i % numColours]);
    // choose random xy coordinates
    var x = int(random(0, circleWidthRatio)) * circleSize;
    var y = int(random(0, circleWidthRatio)) * circleSize;
    ellipse(x, y, circleSize);

    // 70% chance of white circle being drawn inside
    if (random(0, 10) < 7) {
      fill(backgroundCol);
      ellipse(x, y, circleSize * random(0.1, 0.6));

      // draw lines from the inner circle going vertically, horizontally or diagonally
      stroke(cols[i % numColours]);
      strokeWeight(random(circleSize * 0.1, circleSize * 0.4));
      // 3 in 4 chance of line being drawn
      switch (int(random(0, 5))) {
        case 0: // horizontal
          line(x, y, x + (circleSize * int(random(-5, 5))), y);
          break;

        case 1: // vertical
          line(x, y, x, y + (circleSize * int(random(-5, 5))));
          break;

        case 2: // diagonal
          var hyp = sqrt(pow(circleSize, 2) * 2); // hypoteneuse
          var val = hyp * int(random(-5, 5));
          line(x, y, x + val, y + val);
          break;

        default:
          break;
      }
    }
  }
}

function draw() {

}

// grabs a predetermined number of colours from
// random pixel locations in a provided source image file
function getColours(image) {
  for(var i = 0; i < 6; i++) {
    cols[i] = getRandomColour(image);
  }
}

function getRandomColour(image) {
  // choose a random pixel from image and return rgb(a) colour
  var c = image.get(int(random(0, image.width)), int(random(0, image.height)));
  var r = c[0];
  var g = c[1];
  var b = c[2];
  var a = 255;
  return color(r, g, b, a);
}

function saveImage() {
  saveCanvas('kandinsky_circles_' + int(random(0, 2000000)), 'png')
}

function mouseReleased() {
  generateSketch();
}