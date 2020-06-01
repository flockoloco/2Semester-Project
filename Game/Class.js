
class settlement {
    constructor(name, ore, food, wood, people, posX, posY, player_id, id) {
        this.name = name;
        this.ore = ore;
        this.food = food;
        this.wood = wood;
        this.people = people
        this.posX = posX;
        this.posY = posY;
        this.player_id = player_id;
        this.id = id
    };   
};

class Player{
  constructor(id,name,pp,gold){
  this.id=id;
  this.name=name;
  this.pp=pp;
  this.gold = gold;
  };
  
  get_id(){
  return this.id;
  };
  
  get_name(){
  return this.name;
  };
  
  get_pp(){
  return this.pp;
  };

  get_gold(){
    return this.gold;
  };
};

class tile {
  constructor(x, y, s, c, st, t, id, settlement, Deposit, rail) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.st = st;
    this.t = t;
    this.id = id;
    this.settlement = settlement;
    this.Deposit = Deposit;
    this.rail = rail;
  };

  draw_tile() {
    push();
    fill(this.c);
    stroke(this.st);
    square(this.x, this.y, this.s);
    text(this.t, this.x + this.s / 2, this.y + this.s / 2);
    pop();
  };

  click_tile(posx, posy) {
    if ((posx > this.x & posx < this.x + this.s) & (posy > this.y & posy < this.y + this.s)) {
      return true;
    }
  }

  set_settlement(settlement){
    this.settlement = settlement;
  };

  set_Deposit(Deposit){
    this.Deposit = Deposit;
  };

  set_rail(rail){
    this.rail = rail;
  };

  get_x(){
    return this.x;
  }
  get_y(){
    return this.y;
  }

  set_color(c){
	  this.c = c;
  };
};

class Deposit {
  constructor(name, ore, food, wood, posX, posY, player_id){
    this.name = name;
    this.ore = ore;
    this.food = food;
    this.wood = wood;
    this.posX = posX;
    this.posY = posY;
    this.player_id = player_id;
  };
}

class rail {
  constructor(posX, posY, player_id, id){
    this.posX = posX;
    this.posY = posY;
    this.player_id = player_id;
    this.id = id;
  }
}