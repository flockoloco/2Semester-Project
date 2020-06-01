let Settlement = []; 
let arrSettlement = [];

let playerLoged;

function preload(){
  getPlayer();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  initTile();
  loadAll();

  noLoop();
};

function draw() {
  drawTile();

};

  //Get player info
function getPlayer(){
  loadJSON('/getPlayer', function(data){
  parsePlayer(data);
  });
}

  //Get settlements info
function loadAll(){
  loadJSON('/getAllSettlements/'+playerLoged.id, function(data){
  parseSettlement(data);
  });
}

/*
  //Maybe we can use this to call for a random question?
function chooseFunction(){

  //random call between 1 to 4
  var randomCall = Math.floor(Math.random() * 4) + 1;

  if(randomCall == 1){
  //oi
  }
  if(randomCall == 2){
  //oi
  }
  if(randomCall == 3){
  //oi
  }
  if(randomCall == 4){
  //oi
  }
}
*/

function mousePressed(){
};

function parsePlayer(data){
    playerLoged = new Player(data[0].id,data[0].username,data[0].populationpoints_total, data[0].gold_amount, data[0].newplayer);
  }

function parseSettlement(data){
  for(let i=0;i<data.length;i++){
  arrSettlement[i] = new settlement(data[i].name, data[i].ore, data[i].food, data[i].wood, data[i].people, data[i].posX, data[i].posY, data[i].player_id, data[i].id);
  }
  updateSettlement();
}


  //draw the tiles
function drawTile() {
  for (let i = 0; i < Settlement.length; i++) {
    for (let j = 0; j < Settlement.length; j++) {
    Settlement[i][j].draw_tile();
    }
  }
}

  //Tile Info
function initTile() {

  let numberOfCols = 10;
  let sizeOfTile = 80;
  let GBW = 800;
  let GBH = 800;
  let y = 0;
  let x = 0;
  let countID = 0;
  let initialY = height / 2 - GBH / 2;
  let initialX = width / 1.5 - GBW / 2;

  for (let i = 0; i < numberOfCols; i++) {
  //every colum is also an array
  Settlement[i] = [];
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
    Settlement[i][j] = new tile(x, y, sizeOfTile, 'lightgreen', 25, '', countID);
    }
  }
}

  //update the tile info 
function updateSettlement(){

  for (let i = 0; i < Settlement.length; i++) {
    for (let j = 0; j < Settlement.length; j++) {
      for(let k=0;k<arrSettlement.length;k++){
      let px=i+1;
      let py=j+1;
      if(px==arrSettlement[k].posX & py==arrSettlement[k].posY){
      Settlement[i][j].set_settlement(arrSettlement[k]);
      Settlement[i][j].set_color("LightBlue");
      }}
    }
  }
  drawTile();
}