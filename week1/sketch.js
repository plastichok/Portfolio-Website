let oscillationAngle = 0;
let centerX;
let centerY;
let maxDiameter;
let minDiameter;

function setup() {
  createCanvas(640, 480);

  centerX = width / 2;
  centerY = height / 2;

  maxDiameter = 400;
  minDiameter = 10;
}

function draw() {
  fill(255, 10); //color, alpha
noStroke();
rect(0, 0, width, height);

  oscillationAngle += 0.05; //speed

  let sinValue = sin(oscillationAngle);
  let currentDiameter = map(
    sinValue,
    -1,
    1,
    minDiameter,
    maxDiameter
  );

  //circle par
  stroke(0); //color
  strokeWeight(1); //outline
  noFill();

  circle(centerX, centerY, currentDiameter);
}