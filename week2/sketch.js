let oscillationAngle = 0;
let rotationAngle = 0;

let centerX, centerY;
let boundingDiameter;
let r, max_d, min_d, vDist;
let rows, cols;

let mainColor;    
let targetColor;   

function setup() {
  createCanvas(1024, 768);
  background(0);

  centerX = width / 2;
  centerY = height / 2;
  boundingDiameter = 540;

  r = 50; 
  vDist = r * sqrt(3) / 2;
  
  min_d = r * 0.8;   
  max_d = r * 2.2;   

  rows = ceil(height / vDist) * 2.5;
  cols = ceil(width / r) * 2.5;
  
  mainColor = color(0, 0, 0); 
  targetColor = color(random(255), random(255), random(255)); 
}

function draw() {
  fill(0, 10); 
  noStroke();
  rect(0, 0, width, height);

  centerX = width / 2;
  centerY = height / 2;

  if (frameCount % 60 === 0) {
    targetColor = color(random(255), random(255), random(255));
  }
  
  mainColor = lerpColor(mainColor, targetColor, 0.01);
  
  // --------------------------------

  oscillationAngle += 0.01;
  rotationAngle -= 0.001;

  let breathPulse = sin(oscillationAngle);
  boundingDiameter = map(breathPulse, -1, 1, 550, 580);

  push();
  stroke(mainColor); 
  strokeWeight(0.5); 
  noFill();

  clip(() => {
    circle(centerX, centerY, boundingDiameter);
  });

  push();
  translate(centerX, centerY);
  rotate(rotationAngle);
  translate(-centerX, -centerY);

  drawGrid();

  pop();
  pop();

  stroke(mainColor);
  strokeWeight(0.3); 
  noFill();
  circle(centerX, centerY, boundingDiameter);
}


function drawGrid() {
  let yStart = centerY - floor(rows / 2) * vDist;
  let xStart = centerX - floor(cols / 2) * r;

  for (let i = 0; i < rows; i++) {
    let y = yStart + i * vDist;

    let xOffset;
    if (i % 2 === 0) {
      xOffset = 0;
    } else {
      xOffset = r / 2;
    }

    for (let j = 0; j < cols; j++) {
      let x = xStart + j * r + xOffset;
      
      let d = dist(x, y, centerX, centerY);
      let offset = d * 0.01; 
      let a = oscillationAngle - offset;
      let dia = map(sin(a), -1, 1, min_d, max_d);
      
      circle(x, y, dia);
    }
  }
}