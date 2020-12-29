var dogImage,dog , happyDog, database, foodS, foodStock;

function preload()
{
  dogImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock); 
}

function draw() {
  background(46, 139, 87);
  textSize(35);
  fill("yellow");
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 250, 50);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}


