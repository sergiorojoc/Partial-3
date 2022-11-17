var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, choque;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOverImage, restartImage, gameOver, restart;



function preload(){

groundImage = loadImage("ground2.png" );
cloudImage = loadImage("cloud.png");
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
choque = loadAnimation("trex_collided.png");

}

function setup() {

createCanvas(600, 200);

ground = createSprite(200, 180, 400, 20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;
ground.velocityX = -15;

trex = createSprite(130, 165, 20, 50);
trex.addAnimation("running", trex_running);
trex.addAnimation("choque", choque);
trex.scale = 0.5

invisibleGround = createSprite(200, 200, 400, 20);
invisibleGround.visible=false;

gameOver = createSprite(width/2, (height/2)-30);
gameOver.addImage(gameOverImage);

restart = createSprite(width/2, (height/2)+25, 100, 100);
restart.addImage(restartImage);
restart.scale = 0.7

gameOver.visible = false;
restart.visible = false

obstaclesGroup = new Group();
cloudsGroup = new Group();


}

function draw() {
  
  
  score.visible = true;



  if(gameState === PLAY){
    background(50);
    background.depth = background.depth-1;
    text("Score: "+score, 500, 50);
    spawnCloud();
    spawnObstacle();
    score = score + Math.round(getFrameRate()/59);


    if(ground.x<0){

      ground.x = groundImage.width/2;

    }
    trex.collide(invisibleGround);

    if(keyDown("space") && trex.y > 160){

      trex.velocityY = -13;
      if (trex.y <100){
        while (trex.y < 160){
          trex.velocityY +=1;
        }
      }

    }
    if (trex.y<160){
      trex.velocityY +=1;
    }
    
        
    if (obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
   
  
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.depth = trex.depth+5;
    trex.velocityY = 0;
    trex.changeAnimation("choque");
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  trex.y = 165;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running");
  //
  
  score=0;
}
function spawnCloud(){

  
  if (frameCount % 60 ===0){

    var cloud = createSprite(600, 50 , 40, 10);
    cloud.y = Math.round(random(80, 140));
    cloud.addImage("clouds", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -10;
    cloud.lifeTime=220;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacle(){

  if (frameCount % 60 ===0){

    var obstacle = createSprite(600, 165, 10, 40);
    var ran = Math.round(random(1,6));
    obstacle.velocityX = -15;
    obstacle.scale = 0.50;
    lifeTime = 200;
    switch(ran){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }  
    obstaclesGroup.add(obstacle);
  }
}
