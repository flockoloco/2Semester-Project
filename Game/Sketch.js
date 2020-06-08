let Settlement = []; 
let arrSettlement = [];

let playerLoged;
let FarmX = []; 
let FarmY = [];

let value = 0;

let pao;
let money;
let war;
let faith;

//initializing questions and buttons for filling the in the future
let questionArray = [];
let buttonArray = [];
let getNewQuestion = true;

function preload(){
  getPlayer();
  pao = loadImage('../images/pao.png');
  money = loadImage('../images/dinheiro.png');
  war = loadImage('../images/guerra.png');
  faith = loadImage('../images/biblia.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250, 218, 94);

  initTile();
  loadAll();

  //this way we start up the whole loop ------
    let statsToSend = {
    "PlayerID":playerLoged.PlayerID,
    "wheat":0,
    "swords":0,
    "gold":0,
    "faith":0
    }
  httpPost('/changeStats','json',statsToSend,ChangeStatsReceiver);
 //----


  getFarmPos();

  noLoop();
};

function draw() {
  drawTile();
  createBars();
  
  for (let i = 0; buttonArray.length; i++){
    buttonsArray[i].CheckHover(mouseX,mouseY);
    buttonsArray[i].DrawMe();
  }

  if (mouseIsReleased) {

    for (let i = 0; buttonArray.length; i++){
      buttonsArray[i].ClickMe();
    }
  }
};

  //Get player info
function getPlayer(){
  loadJSON('/getPlayer', function(data){
  parsePlayer(data);
  });
}

  //Get settlements info
function loadAll(){
  loadJSON('/getCastle/'+playerLoged.PlayerID, function(data){
  parseSettlement(data);
  });
}

function getFarmPos(){
  loadJSON('/getFarmPos/'+playerLoged.PlayerID, function(data){
  parseFarmPos(data);
  });
}

const createBars = () => {

  //food Bar
  let foodBar = 50
  fill(255);
  rect(1275, 75, 50, 150);
  fill("Green");
  rect(1275, 225, 50, -(foodBar*1.5))
  image(pao, 1280, 25);

  //money Bar
  let moneyBar = 50
  fill(255);
  rect(1375, 75, 50, 150);
  fill("Green");
  rect(1375, 225, 50, -(moneyBar*1.5))
  image(money, 1380, 25);

  //war Bar
  let warBar = 50
  fill(255);
  rect(1475, 75, 50, 150);
  fill("Green");
  rect(1475, 225, 50, -(warBar*1.5))
  image(war, 1480, 25);

  //faith Bar
  let faithBar = 50
  fill(255);
  rect(1575, 75, 50, 150);
  fill("Green");
  rect(1575, 225, 50, -(faithBar*1.5))
  image(faith, 1580, 25);
}

function mousePressed(){
  chooseDeleteFarm();
}

function parsePlayer(data){
    playerLoged = new Player(data[0].PlayerID, data[0].UserID_FK_Player, data[0].Concluded, data[0].Wheat, data[0].Swords, data[0].Gold, data[0].Faith, data[0].Score, data[0].KingdomName, data[0].PlayerName);
  }

function parseSettlement(data){
  for(let i=0;i<data.length;i++){
  arrSettlement[i] = new settlement(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
  }
  updateSettlement();
}

function parseFarmPos(data){
  for(i = 0; i < data.length; i++){
  FarmX.push(data[i].PosX)
  }
  for(i = 0; i < data.length; i++){
  FarmY.push(data[i].PosY)
  }
}

function chooseDeleteFarm(){
  let FarmIndexX = FarmX[Math.floor(Math.random() * FarmX.length)]
  let FarmIndexY = FarmY[Math.floor(Math.random() * FarmY.length)]
  // search the position based on the value chosen (useless for now)
  //let PositionX = FarmX.indexOf(FarmIndexX);
  //let PositionY = FarmY.indexOf(FarmIndexY);
  // if the result >= 0 get this value and remove from DB
  if (~FarmIndexX & ~FarmIndexY){
    httpPost('/UpdateTile/'+playerLoged.PlayerID, "json", {"TileX": FarmIndexX, "TileY": FarmIndexY, "playerID": playerLoged.PlayerID}, function(){});
} }
