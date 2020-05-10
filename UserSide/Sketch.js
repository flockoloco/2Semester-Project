let board = []; 
let playerLoged;
let arrBuildings=[];

let food=false;

  function preload(){
  getPlayer();
  }

  function setup() {
    createCanvas(window.innerWidth-20, window.innerHeight-20);
    background(255);
    canvas();
    initBoard();
    createBoard();
    noLoop();
  };
  
  function draw() {
    drawBoard();
  };

  const canvas = () => {
    fill(0);
    rect(0, 0, window.innerWidth, 100);
    fill('gray');
    textSize(25);
    fill(255);
  }

  function getPlayer(){

    loadJSON('/getPlayer', function(data){
    parsePlayer(data);
    });
    }

    function loadAll(){

      loadJSON('/getAllBuildings/'+playerLoged.id,function(data){
      
      parseBuildings(data);
      
      });
      
      }

  const createBoard = () => {

    text("Name: "+playerLoged.name,25,60);
    text("Population Points: "+playerLoged.pp,225,60);
    text("Gold: "+playerLoged.gold,650,60);

    let createShop = createButton('Shop');
    createShop.size(100,50);
    createShop.position(windowWidth-450, 30);
    let createMarket = createButton('Market');
    createMarket.size(100,50);
    createMarket.position(windowWidth-300, 30);
    let createFriends = createButton('Friends');
    createFriends.size(100,50);
    createFriends.position(windowWidth-150, 30);
    createShop.mousePressed(GoShop);
    createMarket.mousePressed(GoMarket);
    createFriends.mousePressed(GoFriends);
  }

  function parsePlayer(data){
    playerLoged = new Player(data[0].id,data[0].username,data[0].populationpoints_total, data[0].gold_amount);
    }

  function mousePressed(){
    for (let i = 0; i<board.length; i++) {
      for (let j = 0; j<board.length; j++) {
    
      if(board[i][j].click_tile(mouseX, mouseY) & food==true){
        
      httpPost('/createFood/',{"idtype":1,"resourcetype":1,"posX":i+1,"posY":j+1, "player_id": playerLoged.id},'json',function(data){
        loadAll();

      });
      food=false;
      break;
      }
    }
  }
  };


  function parseBuildings(data){
    for(let i=0;i<data.length;i++){
    arrBuildings[i] = new settlement(data[i].idtype,data[i].resourcetype,data[i].posX,data[i].posY, data[i].player_id);
    }
    updateBoard();
    }

    function GoShop(){
      food = true;
    }

    function GoMarket(){
      print('aqui vc troca produtos com players');
    }

    function GoFriends(){
      print('voce é um forever alone sinto muito');
    }

  function getTileInfo() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j].click_tile(mouseX, mouseY)) {
          print(board[i][j].get_id());
          break;
        }
      }
    }
  }

  function drawBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j].draw_tile();
      }
    }
  }

  function initBoard() {

    let numberOfCols = 10;
    let sizeOfTile = 80;
    let GameBoard;
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

  function updateBoard(){

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
      for(let k=0;k<arrBuildings.length;k++){
        let px=i+1;
        let py=j+1;
        if(px==arrBuildings[k].posX & py==arrBuildings[k].posY){
          board[i][j].set_settlement(arrBuildings[k]);
          board[i][j].set_color("LightBlue");
          }
        }
    }
    }
    drawBoard();
    }