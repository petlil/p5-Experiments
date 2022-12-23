let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;
let textLen = 0; // length of the string on the screen (in pixels)
let numLines = 30;

var x = 0;

var l1;

function setup() {
  createCanvas(1500, 800);
  textFont('Helvetica', fontSize);
  textLen = textWidth(chars);
  x = 0;

  l1 = new Line(chars, 0, 0, fontSize);
  l1.setStep(3);
}

function draw() {
  background(0);
  fill(255);

  l1.calculate();
  l1.render();
}

class Line {
  step = 0;
  textWid = 0;
  numRepeats = 0;

  constructor(text, y, fontSize) {
    this.text = text;
    this.y = y;
    this.fontSize = fontSize;

    this.textWid = textWidth(text);
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

    //text(this.x, width/2, height/2)
  }

  setStep(newStep) {
    this.step = newStep;
  }

};