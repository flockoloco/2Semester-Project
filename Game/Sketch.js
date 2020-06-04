let Settlement = []; 
let arrSettlement = [];

let playerLoged;
let farmX; 

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

  //filling questions and buttons arrays with everything they need
  //LoadQuestions();

  //getFarmPos();

  noLoop();
};

function draw() {
  drawTile();
  createBars();
  
 //all commented so it doesnt crash for now :P
  /*picks a new question. THIS CANT BE IN DRAW OR IT SPAMS NEW QUESTIONS
  if (getNewQuestion == true){
    getNewQuestion == false;
    PickRandomQuestion(questionArray)
  }
  //making buttonsarray work XD
  for (let i = 0; buttonArray.length; i++){
    buttonsArray[i].CheckHover(mouseX,mouseY);
    buttonsArray[i].DrawMe();
  }

  if (mouseIsPressed) {

    for (let i = 0; buttonArray.length; i++){
      buttonsArray[i].ClickMe();
    }
  }
  */
};

  //Get player info
function getPlayer(){
  loadJSON('/getPlayer', function(data){
  parsePlayer(data);
  });
}

  //Get settlements info
function loadAll(){
  loadJSON('/getCastle/'+playerLoged.Id, function(data){
  console.log(playerLoged.Id)
  parseSettlement(data);
  });
}

function getFarmPos(){
  loadJSON('/getFarmPos/'+playerLoged.Id, function(data){
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
}

function parsePlayer(data){
    playerLoged = new Player(data[0].PlayerID, data[0].UserID_FK_Player, data[0].Concluded, data[0].Wheat, data[0].Swords, data[0].Money, data[0].Faith, data[0].Score, data[0].KingdomName, data[0].PlayerName);
  }

function parseSettlement(data){
  for(let i=0;i<data.length;i++){
  arrSettlement[i] = new settlement(data[i].BuildingID, data[i].Type, data[i].PosX, data[i].PosY, data[i].PlayerID_FK_Building);
  }
  updateSettlement();
}

function parseFarmPos(data){
  FarmX = ([data.PosX]);
  FarmX = ([data.PosY]);
}

function chooseDeleteFarm(){
  //let farmX = farm.posX[Math.floor(Math.random() * farm.posX.length)]
  // search the position based on the value chosen
  //let positionX = (farm.posX).indexOf(farmX);
  // if the result >= 0 get this value and remove from DB
  //if (positionX > 0){ farm.posX.splice(positionX, 1);
  
}

