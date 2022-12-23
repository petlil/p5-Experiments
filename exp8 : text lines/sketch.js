let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;
let textLen = 0; // length of the string on the screen (in pixels)
let numLines = 30;

var lines = [];

function setup() {
  createCanvas(500, 500);
  textFont('Helvetica', fontSize);
  textLen = textWidth(chars);

  let h = height / numLines;

  for(var i = 0; i < numLines; i++) {
    if(i%2==0) {
      lines[i] = new Line(chars, i * 5, h * i, fontSize);
      lines[i].setStep(3);
    }
    else {
      lines[i] = new Line(chars, i * -5, h * i, fontSize);
      lines[i].setStep(-3);
    }
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

  constructor(text, xoffset, y, fontSize) {
    this.text = text;
    this.y = y;
    this.fontSize = fontSize;
    this.xoffset = xoffset;

    this.textWid = textWidth(text); // line length in pixels
    this.x = -this.textWid + this.xoffset;

    // get the number of times the line should be repeated
    // to always fill the screen
    this.numRepeats = int(width/this.textWid) + 3;
  }
  
  calculate() {
    this.x += this.step;
    if(this.x >= 0) this.x = -this.textWid;
    else if(this.x <= (-this.textWid * 2)) this.x = -this.textWid;
  }

  render() {
    for(var i = 0; i < this.numRepeats; i++) {
      text(this.text, this.x + (i * this.textWid) + this.xoffset, this.y, this.textWid, fontSize);
      //text(int(this.x), width/2, this.y, this.textWid, fontSize);
    }
  }

  setStep(newStep) {
    this.step = newStep;
  }

};