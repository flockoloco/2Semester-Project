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
  constructor(i, x, y, w, h, st, id, castle, farm, barrack, bank, church) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = i;
    this.st = st;
    this.id = id;
    this.castle = castle;
    this.farm = farm;
    this.barrack = barrack;
    this.bank = bank;
    this.church = church;
  };

  draw_tile() {
    push();
    stroke(this.st);
    image(this.i, this.x, this.y, this.w, this.h);
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

  set_image(i){
	  this.i = i;
  };
};

class QuestionCreator{
  constructor(values){
    this.option = [];
    this.id = values.question.id; 
    this.text = values.question.text;
    this.theme = values.question.theme;
    this.option[0] = values.option0;
    this.option[1] = values.option1;
  }
  PickMe(pickedButtonArray){ //assigns each of the 3 buttons to the picked question (the 3rd option only exists for some questions)
    pickedButtonArray[0].AssignQuestion(this.id,this.option[0].text);
    pickedButtonArray[1].AssignQuestion(this.id,this.option[1].text);
  }
  PickOption(optionPicked){ //after PickMe()
    //disable all buttons with the disablebuttons function either here or in the buttons click me function
    let playerID = playerLoged.PlayerID; //change to the correct ID

    let statsToSend = {
      "PlayerID":playerID,
      "AnswerID":this.option[optionPicked].id
    }
    httpPost('/changeStats','json',statsToSend,ChangeStatsReceiver);
  }
  DrawMe(imageArray){
    push();
  		fill("orange");
  	  rect(50, 50, 800, 500, 10);
      textAlign(CENTER);
      textSize(30);
      
      fill("black");
      text(this.text,425,200);
    pop();
    image(imageArray[this.theme], 80, 25);
  }
}

class ButtonCreator{
  constructor(x,y,width,height,color,action,questionAssinged,optionAssigned,disable,text){
	this.posX = x,
	this.posY = y,
	this.width = width,
	this.height = height,
  this.color = color,
  this.action = action,
  this.questionAssigned = questionAssinged,
  this.optionAssigned = optionAssigned,
	this.hovered = false,
	this.disable = disable,

  this.objectToSend = 0,
  this.text = text
  };
  AssignQuestion(questionNumber,text){
    this.text = text;
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
  	  if (this.hovered == true && this.action != "lost") {
  	    fill("white");
  	  }else{
  		  fill(this.color);
  	  }
  	  rect(this.posX, this.posY, this.width, this.height, 10);
      textAlign(CENTER);
      if (this.action == "lost"){
        textSize(30);
      }else{
        textSize(25);
      }
      fill("black");
      text(this.text,this.posX+this.width/2,this.posY+this.height/2);
    }
    pop();
  }
  ClickMe(multiUseVariable){
    
    if (this.hovered == true){
      if (this.disable == false){
        console.log("inside of the click me function")
        if (this.action == "options"){
        multiUseVariable.PickOption(this.optionAssigned);

        }else if(this.action == "newRun"){
          let objectToSend1 = {
            "userID":multiUseVariable,
            "bla": 2
          }
            httpPost('/newRun','json',objectToSend1,function(data){
              window.location.replace("http://127.0.0.1:3000/game");
            });
        }else if(this.action == "continueRun"){
          window.location.replace("http://127.0.0.1:3000/game");
        }else if(this.action == "leaderboard"){
          window.location.replace("http://127.0.0.1:3000/leaderboard");
        }else if (this.action == "lost"){
          window.location.replace("http://127.0.0.1:3000/menu");
        }
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



//change function place

function SceneChanger(currentScene,futureScene){
  let oldButtonArray;
  let newButtonArray;
  if (currentScene){
    if (currentScene == "Main Menu" ) {
      oldButtonArray = mainMenuButtonArray;
    }else if (currentScene == "Game") {
      oldButtonArray = gameButtonArray;
    }else if (currentScene == "Leaderboard") {
      oldButtonArray = leaderboardButtonArray;
    }else if (currentScene == "fodase") {
      //...
    }
  }
  if (futureScene == "Main Menu" ) {
    newButtonArray = mainMenuButtonArray;
  }else if (currentScene == "Game") {
    newButtonArray = gameButtonArray;
  }else if (currentScene == "Leaderboard") {
    newButtonArray = leaderboardButtonArray;
  }else if (currentScene == "fodase") {
    //...
  }
  for (let i = 0; i < oldButtonArray.length;i++){
    oldButtonArray[i].DisableMe();
  }
  for (let i = 0; i < newButtonArray.length;i++){
    newButtonArray[i].EnableMe();
  }

  Scene = futureScene;
}




