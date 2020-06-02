
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
    ChangeStats(this.option[optionPicked].stat1,this.option[optionPicked].stat2,this.option[optionPicked].stat3,this.option[optionPicked].stat4)
    UpdateStats();
  }

  DrawMe(){
    //o codigo do draw depende do resto
  }
}

class OptionCreator{
  constructor(id,text,stat1,stat2,stat3,stat4){
    this.id = id;
    this.text = text;
    this.stat1 = stat1;
    this.stat2 = stat2;
    this.stat3 = stat3;
    this.stat4 = stat4;
  }
}

let questionArray = [] //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
questionArray[0] = new QuestionCreator(1,new OptionCreator(1,20,20,30,40),new OptionCreator(2,-5,10,15,-20),new OptionCreator(3,-10,-15,+30,+10));
questionArray[1] = new QuestionCreator(4,new OptionCreator(1,20,20,30,40),new OptionCreator(5,-5,10,15,-20));

function ChangeStats(stat1,stat2,stat3,stat4){
  //ainda nao temos nomes para os stats <--- we need to fix this soon so we get the game concept right!!!!
  pao = pao + stat1;
  igreja = igreja + stat2;
  whatever = whatever + stat3;
  fodase = fodase + stat4;
}

function UpdateStats(){
  stats = {
    "pao":pao,
    "igreja":igreja,
    "whatever":whatever,
    "fodase":fodase
  }
  httpPost('/UpdateStats','json',stats,UpdateStatsReceiver); //depends on how you are calling your routing
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
