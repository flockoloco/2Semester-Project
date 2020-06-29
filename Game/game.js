let arrCastle = [];
let arrFarm = [];
let arrBarrack = [];
let arrBank = [];
let arrChurch = [];

let wheatImage;
let goldImage;
let swordImage;
let faithImage;
let themeArray = [];
let playerLoged;

let value = 0;

    //initializing questions and buttons for filling the in the future

let activeQuestion;
let gameButtonArray = [];

function preload(){

  getPlayer();

  for (let i = 0; i < 7; i++){
    themeArray[i] = loadImage('../images/theme'+i+'.png');
  }
  console.log(themeArray)

  wheatImage = loadImage('../images/wheat.png');
  goldImage = loadImage('../images/gold.png');
  swordImage = loadImage('../images/sword.png');
  faithImage = loadImage('../images/faith.png');
  castleNWImage = loadImage('../images/castleNW.png');
  castleNEImage = loadImage('../images/castleNE.png');
  castleSWImage = loadImage('../images/castleSW.png');
  castleSEImage = loadImage('../images/castleSE.png');
  grassImage = [loadImage('../images/Grass1.png'), loadImage('../images/Grass2.png'), loadImage('../images/Grass3.png'), loadImage('../images/Grass4.png'), loadImage('../images/Grass5.png'), loadImage('../images/Grass6.png'), loadImage('../images/Grass7.png'), loadImage('../images/Grass8.png'), loadImage('../images/Grass9.png'), loadImage('../images/Grass10.png'), loadImage('../images/Grass11.png'), loadImage('../images/Grass12.png'), loadImage('../images/Grass13.png')];
  farmImage = [loadImage('../images/Farm1.png'), loadImage('../images/Farm2.png'), loadImage('../images/Farm3.png'), loadImage('../images/Farm4.png')];
  churchImage = loadImage('../images/Church.png');
  barrackImage = loadImage('../images/Barrack.png');
  bankImage = loadImage('../images/Bank.png');
}

function setup() {
  noLoop();
  
  createCanvas(windowWidth, windowHeight);
  initTile();
  loadAll();
  GetNewQuestion(true);
  gameButtonArray[0] = new ButtonCreator(100,700,200,100,"blue","options","",0,false,"option1");
  gameButtonArray[1] = new ButtonCreator(500,700,200,100,"blue","options","",1,false,"option2");
  

  loop();
};

function draw() {
  background(250, 218, 94);
  drawTile();
  createBars();
  gameButtonArray[0].CheckHover(mouseX,mouseY);
  gameButtonArray[1].CheckHover(mouseX,mouseY);
  gameButtonArray[0].DrawMe();
  gameButtonArray[1].DrawMe();

  if (activeQuestion){  
    activeQuestion.DrawMe(themeArray);
  } 

};

    //Get player info

function getPlayer(){
  loadJSON('/getPlayer', function(data){
    parsePlayer(data);
  });
}


function mouseReleased() {
  gameButtonArray[0].ClickMe(activeQuestion);
  gameButtonArray[1].ClickMe(activeQuestion);
}

    //GET THE BUILDINGS' INFORMATION
function loadAll(){
  initTile();
  loadJSON('/getAllBuildings/'+playerLoged.PlayerID,function(data){
    parseTile(data);
  });
}

    //BARS FOR THE RESOURCES

const createBars = () => {

    //WHEAT BAR
  let foodBar = playerLoged.wheat
  fill(255);
  rect(1275, 75, 50, 150);
  fill("Green");
  rect(1275, 225, 50, -(foodBar*1.5))
  image(wheatImage, 1280, 25);

    //GOLD BAR
  let goldBar = playerLoged.gold
  fill(255);
  rect(1375, 75, 50, 150);
  fill("Green");
  rect(1375, 225, 50, -(goldBar*1.5))
  image(goldImage, 1380, 25);

    //SWORD BAR
  let warBar = playerLoged.swords
  fill(255);
  rect(1475, 75, 50, 150);
  fill("Green");
  rect(1475, 225, 50, -(warBar*1.5))
  image(swordImage, 1480, 25);

   //FAITH BAR
  let faithBar = playerLoged.faith
  fill(255);
  rect(1575, 75, 50, 150);
  fill("Green");
  rect(1575, 225, 50, -(faithBar*1.5))
  image(faithImage, 1580, 25);
}

    //STORE THE PLAYER'S INFORMATION

function parsePlayer(data){
    playerLoged = new Player(data[0].PlayerID, data[0].UserID_FK_Player, data[0].Concluded, data[0].Wheat, data[0].Swords, data[0].Gold, data[0].Faith, data[0].Score, data[0].KingdomName, data[0].PlayerName);
  }

    //STORE THE TILE'S INFORMATION

function parseTile(data){
  arrCastle = [];
  arrFarm = [];
  arrBarrack = [];
  arrBank = [];
  arrChurch = [];

  for(let i=0;i<data.length;i++){
    if(data[i].Type == "CastleNW" || data[i].Type == "CastleNE" || data[i].Type == "CastleSW" || data[i].Type == "CastleSE"){
        arrCastle.push(data[i]);
    }
    else if(data[i].Type == "Farm"){
        arrFarm.push(data[i])
    }
    else if(data[i].Type == "Barrack"){
        arrBarrack.push(data[i])
    }
    else if(data[i].Type == "Bank"){
        arrBank.push(data[i])
    }
    else if(data[i].Type == "Church"){
        arrChurch.push(data[i])
    }
}
updateTile();
}