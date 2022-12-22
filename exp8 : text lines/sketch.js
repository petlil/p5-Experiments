let chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "
let numChars = 68; // 68 characters in the string
let fontSize = 20;

function setup() {
  createCanvas(800, 800);
  textFont('Georgia', fontSize);
}

function draw() {
  background(0);
  fill(255);
  
  text(chars, 0, 0, textWidth(chars), fontSize);
}

