let board = [];  

  function setup() {
    createCanvas(windowWidth, windowHeight);
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
    rect(0,0, windowWidth, 100);
    fill('gray');
    rect(0, 120, 520, 800, 10);
    textSize(25);
    fill(255);
    text('Player', 100, 55);
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

  function GoShop(){
    Shop = true
  }

  function GoMarket(){
    Market = true
  }

  function GoFriends(){
    Friend = true
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

  if(Shop==true){
    ShopLayer();
    Shop = false;
    return
    };

    if(Market==true){
    MarketLayer();
    Market = false;
    return
    };

    if(Friend==true){
    FriendLayer();
    Friend = false;
    return
    };
  };

  const ShopLayer = () => {
    print('aqui é uma loja');
  }

  const MarketLayer = () => {
    print('aqui vc troca produtos com players');
  };

  const FriendLayer = () => {
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

  class tile {

    constructor(x, y, s, c, st, t, id) {
      this.x = x;
      this.y = y;
      this.s = s;
      this.c = c;
      this.st = st;
      this.t = t;
      this.id = id;
    }

    draw_tile() {
      push();
      fill(this.c);
      stroke(this.st);
      square(this.x, this.y, this.s);
      text(this.t, this.x + this.s / 2, this.y + this.s / 2);
      pop();
    }

    click_tile(posx, posy) {
      if ((posx > this.x & posx < this.x + this.s) & (posy > this.y & posy < this.y + this.s)) {
        return true;
      }
    }

    get_id() {
      return this.id;
    }
  }