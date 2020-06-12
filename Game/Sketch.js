let tiles = []; 

let arrCastle = [];
let arrFarm = [];
let arrBarrack = [];
let arrBank = [];
let arrChurch = [];

let farmTile = [];
let barrackTile = [];
let bankTile = [];
let churchTile = [];

let wheatImage;
let goldImage;
let swordImage;
let faithImage;

let playerLoged;

let value = 0;

    //initializing questions and buttons for filling the in the future

let activeQuestion;
let buttonArray = [];

function preload(){

  getPlayer();

  wheatImage = loadImage('../images/wheat.png');
  goldImage = loadImage('../images/gold.png');
  swordImage = loadImage('../images/sword.png');
  faithImage = loadImage('../images/faith.png');
}

function setup() {
  noLoop();
  
  createCanvas(windowWidth, windowHeight);

  initTile();
  loadAll();
  let statsToSend = {
    "PlayerID":playerLoged.PlayerID,
    "wheat":0,
    "swords":0,
    "gold":0,
    "faith":0
    }
  httpPost('/changeStats','json',statsToSend,ChangeStatsReceiver);
  buttonArray[0] = new ButtonCreator(100,700,200,100,"blue","",0,false,"option1");
  buttonArray[1] = new ButtonCreator(500,700,200,100,"blue","",1,false,"option2");
  
  getFarmPos();
  getBarrackPos();
  getBankPos();
  getChurchPos();

  loop();
};

function draw() {
  background(250, 218, 94);
  drawTile();
  createBars();
  buttonArray[0].CheckHover(mouseX,mouseY);
  buttonArray[1].CheckHover(mouseX,mouseY);
  buttonArray[0].DrawMe();
  buttonArray[1].DrawMe();
  if (activeQuestion){
    activeQuestion.DrawMe();
  }
};

    //Get player info

function getPlayer(){
  loadJSON('/getPlayer', function(data){
    parsePlayer(data);
  });
}


function mouseReleased() {
  buttonArray[0].ClickMe(activeQuestion);
  buttonArray[1].ClickMe(activeQuestion);

}

    //GET THE BUILDINGS' INFORMATION
function loadAll(){

  loadJSON('/getCastle/'+playerLoged.PlayerID, function(data){
  parseTile(data);
  });

  loadJSON('/getFarm/'+playerLoged.PlayerID, function(data){
  parseTile(data);
  });

  loadJSON('/getBarrack/'+playerLoged.PlayerID, function(data){
  parseTile(data);
  });

  loadJSON('/getBank/'+playerLoged.PlayerID, function(data){
  parseTile(data);
  });

  loadJSON('/getChurch/'+playerLoged.PlayerID, function(data){
  parseTile(data);
  });
  
}

    //LOAD THE FARM'S POSITION TO BE STORED

function getFarmPos(){
  loadJSON('/getFarmPos/'+playerLoged.PlayerID, function(data){
  parseFarm(data);
  });
}

    //LOAD THE BARRACK'S POSITION TO BE STORED

function getBarrackPos(){
  loadJSON('/getBarrackPos/'+playerLoged.PlayerID, function(data){
  parseBarrack(data);
  });
}

    //LOAD THE BANK'S POSITION TO BE STORED

function getBankPos(){
  loadJSON('/getBankPos/'+playerLoged.PlayerID, function(data){
  parseBank(data);
  });
}

    //LOAD THE FARM'S POSITION TO BE STORED

function getChurchPos(){
  loadJSON('/getChurchPos/'+playerLoged.PlayerID, function(data){
  parseChurch(data);
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
    playerLoged = new Player(data[0].PlayerID, data[0].UserID_FK_Player, data[0].Concluded, data[0].wheat, data[0].swords, data[0].gold, data[0].faith, data[0].Score, data[0].KingdomName, data[0].PlayerName);
  }

    //STORE THE TILE'S INFORMATION

function parseTile(data){
  for(let i=0;i<data.length;i++){
    if(data[i].Type == "Castle"){
      arrCastle[i] = new castle(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
      updateTile();
    }
    if(data[i].Type == "Farm"){
      arrFarm[i] = new farm(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
      updateTile();
    }
    if(data[i].Type == "Barrack"){
      arrBarrack[i] = new barrack(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
      updateTile();
    }
    if(data[i].Type == "Bank"){
      arrBank[i] = new bank(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
      updateTile();
    }
    if(data[i].Type == "Church"){
      arrChurch[i] = new church(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
      updateTile();
    }
  }
}

    //STORE THE FARM'S INFORMATION

function parseFarm(data){
  farmTile = [];
  for(i = 0; i < data.length; i++){
    farmTile.push(data[i])
  }
}

    //STORE THE BARRACK'S INFORMATION

function parseBarrack(data){
  barrackTile = [];
  for(i = 0; i < data.length; i++){
    barrackTile.push(data[i])
  }
}

    //STORE THE BANK'S INFORMATION

function parseBank(data){
  bankTile = [];
  for(i = 0; i < data.length; i++){
    bankTile.push(data[i])
  }
}

    //STORE THE CHURCH'S INFORMATION

function parseChurch(data){
  churchTile = [];
  for(i = 0; i < data.length; i++){
    churchTile.push(data[i])
  }
}

    //FROM THE PREVIOUS FARM INFORMATION GET A RANDOM POSITION AND REMOVE/INSERT FROM/IN THE DATABASE 

function farmPost(){

  let FarmIndex = farmTile[Math.floor(Math.random() * farmTile.length)]

  if (FarmIndex){
    httpPost('/removeTileFarm', "json", {"TileX": FarmIndex.PosX, "TileY": FarmIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
    httpPost('/farmDB', "json", {"TileX": FarmIndex.PosX, "TileY": FarmIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
  }
  loadAll(); 
  getFarmPos();
}

    //FROM THE PREVIOUS BARRACK INFORMATION GET A RANDOM POSITION AND REMOVE/INSERT FROM/IN THE DATABASE 

function barrackPost(){

  let barrackIndex = barrackTile[Math.floor(Math.random() * barrackTile.length)]

  if (barrackIndex){
    httpPost('/removeTileBarrack', "json", {"TileX": barrackIndex.PosX, "TileY": barrackIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
    httpPost('/barrackDB', "json", {"TileX": barrackIndex.PosX, "TileY": barrackIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
  }
  loadAll(); 
  getBarrackPos();
}

    //FROM THE PREVIOUS BANK INFORMATION GET A RANDOM POSITION AND REMOVE/INSERT FROM/IN THE DATABASE 

function bankPost(){

  let BankIndex = bankTile[Math.floor(Math.random() * bankTile.length)]

  if (BankIndex){
    httpPost('/removeTileBank', "json", {"TileX": BankIndex.PosX, "TileY": BankIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
    httpPost('/bankDB', "json", {"TileX": BankIndex.PosX, "TileY": BankIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
  }
  loadAll(); 
  getBankPos();
}

    //FROM THE PREVIOUS CHURCH INFORMATION GET A RANDOM POSITION AND REMOVE/INSERT FROM/IN THE DATABASE 

function churchPost(){

  let churchIndex = churchTile[Math.floor(Math.random() * churchTile.length)]

  if (churchIndex){
    httpPost('/removeTileChurch', "json", {"TileX": churchIndex.PosX, "TileY": churchIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
    httpPost('/churchDB', "json", {"TileX": churchIndex.PosX, "TileY": churchIndex.PosY, "playerID": playerLoged.PlayerID}, function(){});
  }
  loadAll(); 
  getChurchPos();
}
