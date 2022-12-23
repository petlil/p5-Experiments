let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;
let textLen = 0; // length of the string on the screen (in pixels)
let numLines = 30;

var x = 0;

function setup() {
  createCanvas(800, 800);
  textFont('Calibri', fontSize);
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

  // progress line across screen
  x = x % textLen;
  x -= 3;
}

class line {
  step = 0;
  textWid = 0;
  numRepeats = 0;

  constructor(text, x, y, fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;

    this.textWid = textWidth(text);
  }
  
  calculate() {
    // get the number of times the line should be repeated
    // to always fill the screen
    numRepeats = int(width/textWid) + 1;

    this.x += this.step;
  }

  render() {
    for(i = 0; i < this.numRepeats; i++) {
      text(text, x + (i * textLen), y, textLen, fontSize);
    }
  }

  setStep(newStep) {
    this.step = newStep;
  }

};