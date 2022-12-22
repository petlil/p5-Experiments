let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;
let textLen = 0;
let numLines = 30;

var x = 0;

function setup() {
  createCanvas(800, 800);
  textFont('Georgia', fontSize);
  textLen = textWidth(chars);
  x = 0;
}

function draw() {
  background(0);
  fill(255);

  var step = height / numLines;
  
  for(y = 0; y < height; y += step) {
    text(chars, x, y, textLen, fontSize);
    text(chars, x + textLen, y, textLen, fontSize);
    text(chars, x + (textLen * 2), y, textLen, fontSize);
  }

  x = x % textLen;
  x -= 3;
}