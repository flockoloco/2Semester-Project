
class settlement {
    constructor(name, resource, people, posX, posY, player_id, id) {
        this.name = name;
        this.resource = resource;
        this.people = people
        this.posX = posX;
        this.posY = posY;
        this.player_id = player_id;
        this.id = id
    };   

    get_id(){
      return this.id;
    };

    get_resource(){
      return this.resource
    };

    get_people(){
      return this.people
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
  constructor(x, y, s, c, st, t, id, settlement) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.st = st;
    this.t = t;
    this.id = id;
    this.settlement = settlement;
  };

  draw_tile() {
    push();
    fill(this.c);
    stroke(this.st);
    square(this.x, this.y, this.s);
    text(this.t, this.x + this.s / 2, this.y + this.s / 2);
    pop();
  };

  get_id() {
    return this.id;
  };

  set_settlement(settlement){
    this.settlement = settlement;
  };

  set_color(c){
	  this.c = c;
  };
};