let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;
let textLen = 0; // length of the string on the screen (in pixels)
let numLines = 30;

var lines = [];

function setup() {
  createCanvas(800, 800);
  textFont('Helvetica', fontSize);
  textLen = textWidth(chars);

  let h = height / numLines;

  for(var y = 0; y < numLines; y++) {
    lines[y] = new Line(chars, h * y, fontSize);
    lines[y].setStep(5);
  }
}

function draw() {
  background(0);
  fill(255);

  for(var i = 0; i < numLines; i++) {
    lines[i].calculate();
    lines[i].render();
  }

}

class Line {
  step = 0;
  textWid = 0;
  numRepeats = 0;

  constructor(text, y, fontSize) {
    this.text = text;
    this.y = y;
    this.fontSize = fontSize;

    this.textWid = textWidth(text); // line length in pixels
    this.x = -this.textWid;
  }
  
  calculate() {
    // get the number of times the line should be repeated
    // to always fill the screen
    this.numRepeats = int(width/this.textWid) + 3;

    this.x += this.step;
    if(this.x >= 0) this.x = -this.textWid;
    else if(this.x <= -this.textWid * 2) this.x = -this.textWid;
  }

  render() {
    for(var i = 0; i < this.numRepeats; i++) {
      text(this.text, this.x + (i * this.textWid), this.y, this.textWid, fontSize);
    }
  }

  setStep(newStep) {
    this.step = newStep;
  }

};