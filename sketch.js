
var monkey , monkeyanimation,on,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,backgr, obstacleGroup,crash;
var score=0
var PLAY=1
var END=0
var gameState=1;
var survivaltime=0
function preload(){
  monkeyanimation =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  crash=loadImage("sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage=loadImage("jungle.jpg");
}



function setup() {
  createCanvas(800,400); 
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

 monkey=createSprite(100,250,10,10);
 monkey.addAnimation("running",monkeyanimation);
  monkey.setCollider("rectangle",50,0,2,monkey.height)
  monkey.scale=0.1;
  on=createSprite(300,291.5,600,20)
  on.visible=false;
  foodGroup=createGroup();
  obstacleGroup=createGroup()
    ground=createSprite(300,290,600,20);
    ground.visible=false

}


function draw() {
background("skyblue");

  if(gameState===1){
      if(keyDown("space")){
    monkey.velocityY=-15;

  }  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  obstacles();
  bananas();
  survivaltime=survivaltime+Math.round(getFrameRate()/60)
  if(foodGroup.isTouching(monkey)){
    score=score+1;
    foodGroup.destroyEach();
    monkey.scale+=0.01
  }
    
    if(obstacleGroup.isTouching(monkey)){
       gameState=END;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();

       }
  } 
  if(gameState===0){
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    fill("white")
    text("Game Over",350,200)
    backgr.destroy();
  }
  monkey.velocityY=monkey.velocityY+1
  monkey.collide(on);

  drawSprites();
  fill("white")
  text("score - "+ score,650,20);
  text("survival time - "+ survivaltime,650,40);
}


function obstacles(){
if(frameCount%60===0){
  obstacle=createSprite(610,260,10,10)
  obstacle.velocityX=-(10+score/2);
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.15;
  obstacle.lifetime=100;
  obstacleGroup.add(obstacle);
}
}

function bananas(){
  if(frameCount%60===0){
    banana=createSprite(610,170,5,5)
    banana.velocityX=-(10+score/2);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=100;
    foodGroup.add(banana);
     
     }
}


