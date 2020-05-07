let board = [];  

  function setup() {
    createCanvas(window.innerWidth-20, window.innerHeight-20);
    background(255);
    canvas();
    initBoard();
    noLoop();
  };
  
  function draw() {
    createBoard();
    drawBoard();
  };

  const canvas = () => {
    fill(0);
    rect(0, 0, window.innerWidth, 100);
    fill('gray');
    textSize(25);
    fill(255);
    text("player", 100, 55);
    text('Gold', 200, 55);
    text('PP', 300, 55);
    text('Tra', 400, 55);
    text('Rai', 500, 55);
  }


  const createBoard = () => {
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

  function mousePressed(){
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j].click_tile(mouseX, mouseY)) {
          print(board[i][j].get_id());
          break;
        }
      }
    }
  };
    function GoShop(){
      print('aqui é uma loja');
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