/**
 * Bouncy Kaleidoscope
 * Peter Liley 
 * 24/12/2021
 */

skip = false;
let ease = new p5.Ease();

var circleSize = 80;
var numCircles = 4;
var circles1 = [numCircles];
var circles2 = [numCircles];
var circles3 = [numCircles];
var circles4 = [numCircles];

function setup() {
  createCanvas(700, 700);
  background(0);
  createLoop({duration:4, gif:false})
  frameRate(60);
  //pos = circleSize/2;
  pos = -circleSize; // positions of circle origins
  //pos = circleSize;

  // circle colours
  let col1 = color(154, 60, 201);
  let col2 = color(60, 194, 201);
  let col3 = color(215, 60, 201);
  let col4 = color(0);

  // movement ease types
  let ease1 = ease.bounceOut;
  let ease2 = ease.sineOut;

  circles1[0] = new Circle(pos, pos, width-pos, height-pos, circleSize, col1, true, ease1, ease2);
  circles1[1] = new Circle(width-pos, height-pos, pos, pos, circleSize, col1, true, ease1, ease2);
  circles1[2] = new Circle(width-pos, pos, pos, height-pos, circleSize, col1, true, ease2, ease1);
  circles1[3] = new Circle(pos, height-pos, width-pos, pos, circleSize, col1, true, ease2, ease1);

  circles2[0] = new Circle(pos, pos, width-pos, height-pos, circleSize, col2, true, ease1, ease2);
  circles2[1] = new Circle(width-pos, height-pos, pos, pos, circleSize, col2, true, ease1, ease2);
  circles2[2] = new Circle(width-pos, pos, pos, height-pos, circleSize, col2, true, ease2, ease1);
  circles2[3] = new Circle(pos, height-pos, width-pos, pos, circleSize, col2, true, ease2, ease1);

  circles3[0] = new Circle(pos, pos, width-pos, height-pos, circleSize, col3, true, ease1, ease2);
  circles3[1] = new Circle(width-pos, height-pos, pos, pos, circleSize, col3, true, ease1, ease2);
  circles3[2] = new Circle(width-pos, pos, pos, height-pos, circleSize, col3, true, ease2, ease1);
  circles3[3] = new Circle(pos, height-pos, width-pos, pos, circleSize, col3, true, ease2, ease1);

  circles4[0] = new Circle(pos, pos, width-pos, height-pos, circleSize+5, col4, true, ease1, ease2);
  circles4[1] = new Circle(width-pos, height-pos, pos, pos, circleSize+5, col4, true, ease1, ease2);
  circles4[2] = new Circle(width-pos, pos, pos, height-pos, circleSize+5, col4, true, ease2, ease1);
  circles4[3] = new Circle(pos, height-pos, width-pos, pos, circleSize+5, col4, true, ease2, ease1);
}

function draw() {
  p = animLoop.progress;
  if(skip){ noLoop(); } // stops loop if mouse is pressed

  offsets = [0, 0.12, 0.88, 0.74]; // offsets (in time)
  //offsets = [0, 0.33, 0.66, 0.72];
  blacken = false; // trailing black circle to 'erase' drawn circles


  background(0, 3);

  circles4.forEach(c => {
    c.update((p+offsets[3])%1);
    if(blacken) c.display();
  });

  circles1.forEach(c => {
    c.update(p+offsets[0]);
    c.display();
  });

  circles2.forEach(c => {
    c.update((p+offsets[1])%1);
    c.display();
  });

  circles3.forEach(c => {
    c.update((p+offsets[2])%1);
    c.display();
  });
}

// mouse can pause the animation
function mousePressed(){
  skip = true;
}

function keyPressed() {
  if(key === 's') {
    saveGif("bouncy_circles", 5);
  }
}