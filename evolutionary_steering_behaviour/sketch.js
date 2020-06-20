let food = [];
let vehicle = [];
let poison = [];
let debug;

function preload(){
  img = loadImage("rocket.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  debug = createCheckbox("toggle debug");
  for(let i = 0; i< 25; i++){
    let x = random(width)
    let y = random(height)
    vehicle[i] = new Vehicle(x, y);
  }
  
  
  for(let i = 0; i< 400 ; i++){
    let x = random(width);
    let y = random(height);
    food[i] = createVector(x,y);
  }
  for(let i = 0; i< 150 ; i++){
    let x = random(width);
    let y = random(height);
    poison[i] = createVector(x,y);
  }

}

function draw() {
  background(0);
  

  if(random(1)< 0.1){
    let x = random(width);
    let y = random(height);
    food.push(createVector(x,y));

  }
  if(random(1)< 0.05){
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x,y));

  }
  
  for(let i = 0; i< food.length ; i++){
    fill(0,255,0);
    noStroke();
    ellipse(food[i].x , food[i].y , 8 ,8);
    
  }
  for(let i = 0; i< poison.length ; i++){
    fill(255,0,0);
    noStroke();
    ellipse(poison[i].x , poison[i].y , 8 ,8);
    
  }
  for(let i = vehicle.length -1 ; i >= 0 ; i--){
    vehicle[i].behaviours(food, poison);
    vehicle[i].boundaries();
    vehicle[i].update();
    vehicle[i].display();
    let child = vehicle[i].clone()
    if(child != null){
      vehicle.push(child);
    }
    if(vehicle[i].is_dead()){
      food.push(createVector(vehicle[i].pos.x, vehicle[i].pos.y))
      vehicle.splice(i, 1);
    }
   
  
  }
  
}