var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyImage;
var ground, groundImage;
var ObstacleGroup,ObstacleImage;
var BananaGroup,  BananaImage;
var backImage;

var score;

function preload()
{
  backImage=loadImage("jungle.jpg");
  monkeyImage=loadAnimation(
                            "Monkey_01.png","Monkey_02.png",
                            "Monkey_03.png","Monkey_04.png",
                            "Monkey_05.png","Monkey_06.png",
                            "Monkey_07.png","Monkey_08.png",
                            "Monkey_09.png","Monkey_10.png"
                            );
  
  BananaImage  =loadImage ("Banana.png");
  ObstacleImage=loadImage ("stone.png");
  
  
}


function setup()
{
  createCanvas(600, 200);
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("monkeyImage");
  ground = createSprite(400,350,800,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
 
  backImage.addImage("jungle.jpg");
  
   BananaGroup = createGroup();
   ObstaclesGroup = createGroup();
   score=0;
}

function draw() 
{
  background(220);
  score=score+Math.round(getFrameRate()/60);
  
  if(keyDown("space")) 
  {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if(ObstaclesGroup.isTouching(monkey))
  {
    monkey.scale=0.2;
  }
  
  if(BananaGroup.isTouching(monkey))
  {
    score=score+2;
    BananaGroup.DestroyEach;
  }

  switch(score)
  {
      case 10: monkey.scale=0.12;
              break;
      case 20: monkey.scale=0.14;
              break;
      case 30: monkey.scale=0.16;
              break;
      case 40: monkey.scale=0.18;
              break;
      default: break;
    }
    
  if(ObstaclesGroup.isTouching(monkey))
  {
      gameState = END;
   }
  }
  elseif(gameState === END) 
  {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    
  }
  
  
  Banana();
  Obstacles();

 drawSprites();
  
 stroke("white");
 textSize(20);
 fill("white");
 text("Score: " +score,500,50);

}

function Banana() 
{
  if (frameCount % 80 === 0) 
  {
    var banana = createSprite(400,200,40,10);
    banana.addImage("Banana.png");
    banana.y = random(180,230);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 134;
    BananaGroup.add(banana);
  }
  
}

function Obstacles() 
{
  if(frameCount % 300 === 0) 
  {
    var obstacle = createSprite(400,320,10,40);
    obstacle.addImage("stone.png");
  
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    obstacle.lifetime = 134;
    ObstaclesGroup.add(obstacle);
  }
}








