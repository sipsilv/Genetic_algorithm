let rocket;
let population;
let lifeP;
let count = 0;
let target;
let lifespan = 400;
let rx =100;
let ry = 150;
let rw = 200;
let rh = 10;
let maxf = 0.1;

function preload(){
   img = loadImage("rocket.png")
}
function setup(){
  createCanvas(400,400);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width/2, height/4);
}

function draw(){
  background(0);
  population.run();
  lifeP.html(count);
  count++;
  if(count == lifespan){
    population.evaluate();
    population.selection();
    count = 0;

  }
  rect(100, 150,200,10);
  ellipse(target.x, target.y, 16, 16)
  
}