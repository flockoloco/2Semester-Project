class castle {
    constructor(id, Type, PosX, PosY, PlayerID_FK_Building) {
      this.id = id
      this.Type = Type;
      this.PosX = PosX;
      this.PosY = PosY;
      this.PlayerID_FK_Building = PlayerID_FK_Building
    };   
};

class farm {
  constructor(id, Type, PosX, PosY, PlayerID_FK_Building) {
    this.id = id
    this.Type = Type;
    this.PosX = PosX;
    this.PosY = PosY;
    this.PlayerID_FK_Building = PlayerID_FK_Building
  };   
};

class barrack {
  constructor(id, Type, PosX, PosY, PlayerID_FK_Building) {
    this.id = id
    this.Type = Type;
    this.PosX = PosX;
    this.PosY = PosY;
    this.PlayerID_FK_Building = PlayerID_FK_Building
  };   
};

class bank {
  constructor(id, Type, PosX, PosY, PlayerID_FK_Building) {
    this.id = id
    this.Type = Type;
    this.PosX = PosX;
    this.PosY = PosY;
    this.PlayerID_FK_Building = PlayerID_FK_Building
  };   
};

class church {
  constructor(id, Type, PosX, PosY, PlayerID_FK_Building) {
    this.id = id
    this.Type = Type;
    this.PosX = PosX;
    this.PosY = PosY;
    this.PlayerID_FK_Building = PlayerID_FK_Building
  };   
};

class Player{
  constructor(PlayerID, UserID, Concluded, wheat, swords, gold, faith, Score, KingdomName, PlayerName){
  this.PlayerID = PlayerID;
  this.UserID = UserID
  this.Concluded = Concluded;
  this.wheat = wheat;
  this.swords = swords;
  this.gold = gold;
  this.faith = faith;
  this.Score = Score;
  this.KingdomName = KingdomName;
  this.PlayerName = PlayerName;
  };
};

class tile {
  constructor(x, y, s, c, st, t, id, castle, farm, barrack, bank, church) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.st = st;
    this.t = t;
    this.id = id;
    this.castle = castle;
    this.farm = farm;
    this.barrack = barrack;
    this.bank = bank;
    this.church = church;
  };

  draw_tile() {
    push();
    fill(this.c);
    stroke(this.st);
    square(this.x, this.y, this.s);
    text(this.t, this.x + this.s / 2, this.y + this.s / 2);
    pop();
  };

  set_Castle(castle){
    this.castle = castle;
  };

  set_Farm(farm){
    this.farm = farm;
  }

  set_Barrack(barrack){
    this.barrack = barrack;
  }

  set_Bank(bank){
    this.bank = bank;
  }

  set_Church(church){
    this.church = church;
  }

  set_color(c){
	  this.c = c;
  };
};

class QuestionCreator{
  constructor(values){
    this.option = [];
    this.id = values.id; 
    this.text = values.text;
    this.concluded = values.concluded;
    this.resets = values.resets;
    this.option[0] = values.option[0];
    this.option[1] = values.option[1];
  }
  PickMe(buttonArray){ //assigns each of the 3 buttons to the picked question (the 3rd option only exists for some questions)
    buttonArray[0].AssignQuestion(this.id,this.option[0].text);
    buttonArray[1].AssignQuestion(this.id,this.option[1].text);
  }
  PickOption(optionPicked){ //after PickMe()
    //disable all buttons with the disablebuttons function either here or in the buttons click me function
    let playerID = playerLoged.PlayerID; //change to the correct ID
    console.log("here comes all the prints")
    console.log(optionPicked)
    console.log(this.option[optionPicked]);
    let statsToSend = {
      "PlayerID":playerID,
      "wheat":this.option[optionPicked].wheat,
      "swords":this.option[optionPicked].swords,
      "gold":this.option[optionPicked].gold,
      "faith":this.option[optionPicked].faith
  }
  httpPost('/changeStats','json',statsToSend,ChangeStatsReceiver);
  }
  DrawMe(){
    push();
  		fill("orange");
  	  rect(50, 50, 800, 500, 10);
      textAlign(CENTER);
      textSize(20);
      fill("black");
      text(this.text,80,80);
    pop();
  }
}




class ButtonCreator{
  constructor(x,y,width,height,color,questionAssinged,optionAssigned,disable,text){
	this.posX = x,
	this.posY = y,
	this.width = width,
	this.height = height,
	this.color = color,
  this.questionAssigned = questionAssinged,
  this.optionAssigned = optionAssigned,
	this.hovered = false,
	this.disable = disable,

  this.objectToSend = 0,
  this.text = text
  };
  AssignQuestion(questionNumber,text){
    this.text = text
    this.questionAssigned = questionNumber;
  }
  CheckHover(x1, y1) { 
  	if (this.disable == false) {
	  let testX = x1;
 	  let testY = y1;
	  if (x1 < this.posX){      
	    testX = this.posX; // test left edge
  	  }else if (x1 > this.posX+this.width){
  	    testX = this.posX+this.width; // right edge
  	  };   
      if (y1 < this.posY){
        testY = this.posY; // top edge
      }else if (y1 > this.posY+this.height){
        testY = this.posY+this.height; // bottom edge
      };  
      if (dist(x1, y1, testX, testY) <= 1) {
        this.hovered = true;
  	  }else{
  	    this.hovered = false;
	  };
    }else{
	    this.hovered = false;
    };
  };
  DrawMe(){
    push();
  	if (this.disable == false){
  	  if (this.hovered == true) {
  	    fill("white");
  	  }else{
  		  fill(this.color);
  	  }
  	  rect(this.posX, this.posY, this.width, this.height, 10);
      textAlign(CENTER);
      textSize(15);
      fill("black");
      text(this.text,this.posX+this.width/2,this.posY+this.height/2);
    }
    pop();
  }
  ClickMe(question){ //Might remove one of these gates in the future. probably onetime  WEMIGHT NEED TO CHANGE THIS PART (question)
    if (this.hovered == true){
      if (this.disable == false){
        debugger;
        question.PickOption(this.optionAssigned);
      }
    }
  }
  DisableMe(){
		this.disable = true;
  };
  EnableMe(){
  	this.disable = false;
  };
};




