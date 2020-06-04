
class settlement {
    constructor(name, posX, posY, player_id, id) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.player_id = player_id;
        this.id = id
    };   
};

class Player{
  constructor(id,name){
  this.id=id;
  this.name=name;
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

class farmPos{
  constructor([posX1, posX2, posX3, posX4, posX5, posX6, posX7, posX8, posY1, posY2, posY3, posY4, posY5, posY6, posY7, posY8]){
    this.posX = [posX1, posX2, posX3, posX4, posX5, posX6, posX7, posX8];
    this.posY = [posY1, posY2, posY3, posY4, posY5, posY6, posY7]
  }
}

//unfinished objects falta ir buscar os buttoes
class QuestionCreator{
  constructor(id,text,concluded,resets,o1,o2,o3){
    this.id = id; 
    this.text = text;
    this.concluded = concluded;
    this.resets = resets;
    this.option[0] = o1;
    this.option[1] = o2;
    if (o3) {
      this.option[2] = o3;
    }
  }

  PickMe(){
    //codigo que comeca a processo de escolher a opcao
    //talvez dar load de algo que muda o draw se necessario

  }
  PickOption(optionPicked){ //after PickMe()
    ChangeStats(this.option[optionPicked].wheat,this.option[optionPicked].swords,this.option[optionPicked].gold,this.option[optionPicked].faith)
    UpdateStats();
  }

  DrawMe(){
    //o codigo do draw depende do resto
  }
}

class OptionCreator{
  constructor(id,text,wheat,swords,gold,faith){
    this.id = id;
    this.text = text;
    this.wheat = wheat;
    this.swords = swords;
    this.gold = gold;
    this.faith = faith;
  }
}

let questionArray = [] //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
questionArray[0] = new QuestionCreator(1,new OptionCreator(1,20,20,30,40),new OptionCreator(2,-5,10,15,-20),new OptionCreator(3,-10,-15,+30,+10));
questionArray[1] = new QuestionCreator(4,new OptionCreator(1,20,20,30,40),new OptionCreator(5,-5,10,15,-20));

function ChangeStats(wheat,swords,gold,faith){
  //ainda nao temos nomes para os stats <--- we need to fix this soon so we get the game concept right!!!!
  player.wheat = player.wheat + wheat;
  player.swords = player.swords + swords;
  player.gold = player.gold + gold;
  player.faith = player.faith + faith;
}

function UpdateStats(){
  let statsToSend = {
    "wheat":player.wheat,
    "swords":player.swords,
    "gold":player.gold,
    "faith":player.faith
  }
  httpPost('/updateStats','json',statsToSend,UpdateStatsReceiver); //depends on how you are calling your routing
}


function UpdateStatsReceiver(){} //rn doesnt do anything as it doesnt need to.

function PickRandomQuestion(questionArray){ //this is the picks every single one before it refreshes the ones that should be refreshed
   
  if (CheckAnyLeft() == true){
    let foundAPick = false;
    for (let i = 0;foundAPick == true; i++){
      let randompick = int(Math.random(0,questionArray.length));
      if (questionArray[randompick].concluded == false) {
        questionArray[randompick].PickMe();
        foundAPick = true;
      }
    }
  }else if(CheckAnyLeft() == false){
    for(let i = 0;i < questionArray.length;i++){
      if(questionArray[i].resets == true){
        questionArray[i].concluded = false;
      }
    }
  }else{
    console.log("oh no big mistake"); //this shouldnt ever happen, just a caution :D
  }
}
