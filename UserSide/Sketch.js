let board = []; 
let arrBuildings=[];

let playerLoged;
let settlementUI;

let playStart = false;
let fazenda = true;
let igreja = true;
let batalha = true;
let saude = true;

function preload(){
  getPlayer();
}

function setup() {
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  settlementUI = createGraphics(350,550);
  settlementUI.background(155);
  background(255);
  canvas();
  initBoard();
  createBoard();
  noLoop();
};

function draw() {
  drawBoard();
  image(settlementUI, 1440,250);
  //carregarInformacao()
};

  //Canvas
const canvas = () => {
  fill(0);
  rect(0, 0, window.innerWidth, 100);
  fill('gray');
  textSize(25);
  fill(255);
}

  //Get player info
function getPlayer(){
  loadJSON('/getPlayer', function(data){
  parsePlayer(data);
  });
}

  //Get settlements info
function loadAll(){
  loadJSON('/getAllBuildings/'+playerLoged.id, function(data){
  parseBuildings(data);
  });
}

  //Buttons and player info
const createBoard = () => {
  push();
  text("Name: "+playerLoged.name,25,60);
  text("Population Points: "+playerLoged.pp,300,60);
  text("Gold: "+playerLoged.gold,625,60);
  pop();

  let createLoad = createButton('Play Game');
  createLoad.size(100,50);
  createLoad.position(windowWidth-450, 30);
  let createPlay = createButton('Create City');
  createPlay.size(100,50);
  createPlay.position(windowWidth-300, 30);
  let createFriends = createButton('Friends');
  createFriends.size(100,50);
  createFriends.position(windowWidth-150, 30);
  createLoad.mousePressed(Load);
  createPlay.mousePressed(CreateCity);
  createFriends.mousePressed(GoFriends);
}

  //Choose a settlement to decrease the resource
function chooseFunction(){

  var randomCall = Math.floor(Math.random() * 4) + 1;

  if(randomCall == 1){
  decreaseFazenda();
  }
  if(randomCall == 2){
  decreaseIgreja();
  }
  if(randomCall == 3){
  decreaseBatalha();
  }
  if(randomCall == 4){
  decreaseSaude();
  }
}

  //decrease farm resource
function decreaseFazenda() {
  httpPost('/decreaseFarm', "json", {"reduction": 50, "player_id": playerLoged.id}, function(data){
  loadAll();
  })
}

  //decrease church resource
function decreaseIgreja() {
  httpPost('/decreaseChurch', "json", {"reduction": 50, "player_id": playerLoged.id}, function(data){
  loadAll();
  })
}

  //decrease war resource
function decreaseBatalha() {
  httpPost('/decreaseWar', "json", {"reduction": 50, "player_id": playerLoged.id}, function(data){
  loadAll();
  })
}

  //decrease hospital resource
function decreaseSaude() {
  httpPost('/decreaseHospital', "json", {"reduction": 50, "player_id": playerLoged.id}, function(data){
  loadAll();
  })
}

  //Var with the player info
function parsePlayer(data){
  playerLoged = new Player(data[0].id,data[0].username,data[0].populationpoints_total, data[0].gold_amount, data[0].newplayer);
}

  //mousePressed gives the resource to a specific settlement
function mousePressed(){

  let numberOfCols = 10;
  let sizeOfTile = 80;
  let GBW = 800;
  let GBH = 800;
  let y = 0;
  let x = 0;
  let initialY = height / 1.8 - GBH / 2;
  let initialX = width / 2 - GBW / 2;

  y = initialY;
  y = y + GBH / numberOfCols;
  x = initialX;
  x = x + GBW / numberOfCols;

  for (let i = 0; i<board.length; i++) {
    for (let j = 0; j<board.length; j++) {

    if(board[i][j].click_tile(mouseX, mouseY) & (mouseX > x & mouseX < x + (sizeOfTile)) & (mouseY > y + (sizeOfTile) & mouseY < y + (sizeOfTile*2))){
    httpPost('/increaseFarm', "json", {"increase": 50, "player_id": playerLoged.id});
    settlementUI.background(155);
    callFarmInfo();
    break;
    }

    if(board[i][j].click_tile(mouseX, mouseY) & (mouseX > x + (sizeOfTile) & mouseX < x + (sizeOfTile*2)) & (mouseY > y + (sizeOfTile*3) & mouseY < y + (sizeOfTile*4))){
    httpPost('/increaseChurch', "json", {"increase": 50, "player_id": playerLoged.id});
    settlementUI.background(155);
    callChurchInfo();
    break;
    }

    if(board[i][j].click_tile(mouseX, mouseY) & (mouseX > x + (sizeOfTile*3) & mouseX < x + (sizeOfTile*4)) & (mouseY > y + (sizeOfTile*4) & mouseY < y + (sizeOfTile*5))){
    httpPost('/increaseWar', "json", {"increase": 50, "player_id": playerLoged.id});
    settlementUI.background(155);
    callWarInfo();
    break;
    }

    if(board[i][j].click_tile(mouseX, mouseY) & (mouseX > x + (sizeOfTile*4) & mouseX < x + (sizeOfTile*5)) & (mouseY > y + (sizeOfTile*6) & mouseY < y + (sizeOfTile*7))){
    httpPost('/increaseHospital', "json", {"increase": 50, "player_id": playerLoged.id});
    settlementUI.background(155);
    callHospitalInfo();
    break;
    }}
  }
};

const callFarmInfo = () => {
  fill(0);
  loop()
  settlementUI.textSize(20)
  settlementUI.text("Name: "+arrBuildings[0].name,80,50);
  settlementUI.text("Resource: "+arrBuildings[0].resource,80,100);
  settlementUI.text("Population: "+arrBuildings[0].people,80,150);
}

const callChurchInfo = () => {
  fill(0);
  loop()
  settlementUI.textSize(20)
  settlementUI.text("Name: "+arrBuildings[1].name,80,50);
  settlementUI.text("Resource: "+arrBuildings[1].resource,80,100);
  settlementUI.text("Population: "+arrBuildings[1].people,80,150);
}

const callWarInfo = () => {
  fill(0);
  loop()
  settlementUI.textSize(20)
  settlementUI.text("Name: "+arrBuildings[2].name,80,50);
  settlementUI.text("Resource: "+arrBuildings[2].resource,80,100);
  settlementUI.text("Population: "+arrBuildings[2].people,80,150);
}

const callHospitalInfo = () => {
  fill(0);
  loop()
  settlementUI.textSize(20)
  settlementUI.text("Name: "+arrBuildings[3].name,80,50);
  settlementUI.text("Resource: "+arrBuildings[3].resource,80,100);
  settlementUI.text("Population: "+arrBuildings[3].people,80,150);
}

  //var with the settlement info
function parseBuildings(data){
  for(let i=0;i<data.length;i++){
  arrBuildings[i] = new settlement(data[i].name, data[i].resource, data[i].people, data[i].posX, data[i].posY, data[i].player_id, data[i].id);
  }
  updateBoard();
}

  //load info (player points)
function carregarInformacao(){
  httpPost('/updatePoints', "json", {"Farm": arrBuildings[0].people, "Church": arrBuildings[1].people, "War": arrBuildings[2].people, "Hospital": arrBuildings[3].people, "player_id": playerLoged.id}, function(data){});
}

  //Starts the game (resume buttom)
function Load(){
  playStart = true;

  if(playStart == true){
  var random = Math.floor(Math.random() * (45000 - 30000 + 1) ) + 30000;
  setInterval(chooseFunction, random);
  } 
  loadAll();

}

  //If is a new player, create the settlements
function CreateCity(){

  //random value between 500-600
  var random1 = Math.floor(Math.random() * 100) + 500;
  var random2 = Math.floor(Math.random() * 100) + 500;
  var random3 = Math.floor(Math.random() * 100) + 500;
  var random4 = Math.floor(Math.random() * 100) + 500;
  var random5 = Math.floor(Math.random() * 100) + 500;
  var random6 = Math.floor(Math.random() * 100) + 500;
  var random7 = Math.floor(Math.random() * 100) + 500;
  var random8 = Math.floor(Math.random() * 100) + 500;


  for (let i = 0; i<board.length; i++) {
    for (let j = 0; j<board.length; j++) {

    if(fazenda == true){
    httpPost('/createfazenda', "json",{"name":"Potato Farm", "resource":random1, "people":random2,"posX":3,"posY":2, "player_id": playerLoged.id},function(data){
    loadAll();
    });
    fazenda = false;
    break;
    }

    if(igreja == true){
    httpPost('/createigreja', "json", {"name":"Church", "resource":random3, "people":random4,"posX":5,"posY":3, "player_id": playerLoged.id},function(data){
    loadAll();
    });
    igreja = false;
    break;
    }

    if(batalha == true){
    httpPost('/createbatalha', "json", {"name":"War", "resource":random5, "people":random6,"posX":8,"posY":6, "player_id": playerLoged.id} ,function(data){
    loadAll();
    });
    batalha = false;
    break;
    }

    if(saude == true){
    httpPost('/createsaude', "json", {"name":"Hospital", "resource":random7, "people":random8,"posX":6,"posY":5, "player_id": playerLoged.id} ,function(data){
    loadAll();
    });
    saude = false;
    break;
    }}
  }
};

  //future => Shop
function GoFriends(){
  print('voce é um forever alone sinto muito');
}

  //draw the board w/ tiles
function drawBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
    board[i][j].draw_tile();
    }
  }
}

  //board conf
function initBoard() {

  let numberOfCols = 10;
  let sizeOfTile = 80;
  let GBW = 800;
  let GBH = 800;
  let y = 0;
  let x = 0;
  let countID = 0;
  let initialY = height / 1.8 - GBH / 2;
  let initialX = width / 2 - GBW / 2;

  for (let i = 0; i < numberOfCols; i++) {
  //every colum is also an array
  board[i] = [];
  if (i == 0) {
  y = initialY;
  } else {
  y = y + GBH / numberOfCols;
  }
    for (var j = 0; j < numberOfCols; j++) {
    if (j == 0) {
    x = initialX;
    } else {
    x = x + GBW / numberOfCols;
    }
    countID++;
    board[i][j] = new tile(x, y, sizeOfTile, 'lightgreen', 25, '', countID);
    }
  }
}

  //update the tile to a settlement
function updateBoard(){

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      for(let k=0;k<arrBuildings.length;k++){
      let px=i+1;
      let py=j+1;
      if(px==arrBuildings[k].posX & py==arrBuildings[k].posY){
      board[i][j].set_settlement(arrBuildings[k]);
      board[i][j].set_color("LightBlue");
      }}
    }
  }
  drawBoard();
}