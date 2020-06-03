let Settlement = []; 
let arrSettlement = [];

let playerLoged;
let farmX;
let farmY;

let pao;
let money;
let war;
let faith;

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

  getFarmPos();
  noLoop();
};

function draw() {
  drawTile();
  createBars();
};

  //Get player info
function getPlayer(){
  loadJSON('/getPlayer', function(data){
  parsePlayer(data);
  });
}

  //Get settlements info
function loadAll(){
  loadJSON('/getCastle/'+playerLoged.id, function(data){
  parseSettlement(data);
  });
}

function getFarmPos(){
  loadJSON('/getFarmPos/'+playerLoged.id, function(data){
  parseFarmPos(data);
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
  //random value between 500-600
  var random1 = Math.floor(Math.random() * 100) + 500;

}
*/

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
};

function parsePlayer(data){
    playerLoged = new Player(data[0].id,data[0].username);
  }

function parseSettlement(data){
  for(let i=0;i<data.length;i++){
  arrSettlement[i] = new settlement(data[i].name, data[i].posX, data[i].posY, data[i].player_id, data[i].id);
  }
  updateSettlement();
}

function parseFarmPos(data){
  console.log(data[0].posX);
  console.log(data[0].posX1);
  console.log(data[0].posx);
  console.log(data[0].posx1);

  farmX = new farmPos([data[0].posX, data[1].posX2, data[2].posX3, data[3].posX4, data[4].posX5, data[5].posX6, data[6].posX7, data[7].posX8]);
  farmY = new farmPos([data[0].posY1, data[1].posY2, data[2].posY3, data[3].posY4, data[4].posY5, data[5].posY6, data[6].posY7, data[7].posY8]);
}