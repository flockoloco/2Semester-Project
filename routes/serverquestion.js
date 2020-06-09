const pool = require('../core/database');


//Serverside

/*function optionchosen(questionID,OptionID){
    let sql;
    if (optionpicked == 1){
      sql = "select * from Answer inner join Question on Question.Answer1ID_FK_Question = Answer.ID where QuestionID = '"+questionID+"' and where AnswerID = '"+optionID+"';";
    }else if (optionpicked == 2){
      sql = "select * from Answer inner join Question on Question.Answer2ID_FK_Question = Answer.ID where QuestionID = '"+questionID+"' and where AnswerID = '"+optionID+"';";
    }else if (optionPicked = 3){
      sql = "select * from Answer inner join Question on Question.Answer3ID_FK_Question = Answer.ID where QuestionID = '"+questionID+"' and where AnswerID = '"+optionID+"';";
    }
    pool.query(sql, (err, result)=>{
      if(err) throw err;
      ChangeStats(result[0].Wheat,result[0].Swords,result[0].gold,result[0].Faith);
  
    });
}*/
function ChangeStatsFunction(req,res){

    ChangeStats(req.body.PlayerID,req.body.wheat,req.body.swords,req.body.gold,req.body.faith,res);
    
}

function ChangeStats(id,wheat,swords,gold,faith,res){

    let sql = "select * from player where PlayerID = '"+id+"' ;";
    pool.query(sql, (err, result)=>{
        if(err) throw err;

        result[0].Wheat = result[0].Wheat + wheat;
        result[0].Swords = result[0].Swords + swords;
        result[0].Gold = result[0].Gold + gold;
        result[0].Faith = result[0].Faith + faith;

        let sql1 = "update player set Wheat = '"+result[0].Wheat +"', Swords = '"+result[0].Swords+"', Gold = '"+result[0].Gold+"', Faith = '"+result[0].Faith+"' where PlayerID = '"+id+"'"
        pool.query(sql1, (err1, result1)=>{
            if(err1) throw err1;
        });
        let objectToSend = {
            "wheat": result[0].Wheat,
            "swords":result[0].Swords,
            "gold":result[0].Gold,
            "faith":result[0].Faith
        }
        res.send(objectToSend);

    });
}  

function CheckAnyLeft(questionArray){
    let checkCounter = 0
    for(let i = 0;i< questionArray.length;i++){
        if (questionArray[i].Concluded == 0){
            checkCounter = checkCounter + 1;
        }
    }
    if (checkCounter > 0){
        return true;
    }else{
        return false;
    }
}

function PickRandomQuestion(req,res){ //this is the picks every single one before it refreshes the ones that should be refreshed
  let infinityLoop = false;  //fix loop
  do {
    infinityLoop = true;
    let sql = "select * from Question where PlayerID_FK_Question = '"+req.body.playerID+"'order by QuestionID asc;";
    pool.query(sql, (err, result)=>{
      if(err) throw err;
      if (CheckAnyLeft(result) == true){
        let foundAPick = false;
        do{
          let randompick = Math.floor(Math.random()*result.length);
          if (result[randompick].Concluded == 0){
            foundAPick = true;
            infinityLoop = true;
            FullQuestionCreator(result[0],res);
          }
        }while(foundAPick == false);
      }else if(CheckAnyLeft(result) == false){
        let sqlUpdate = "update Question set Concluded = false where PlayerID_FK_Question = '"+req.body.playerID+"' and Reset = true";
        pool.query(sqlUpdate, (err2, result2)=>{
          if (err2) throw err2;
        });  
      }
    });
  }while(infinityLoop == false);
}
function FullQuestionCreator(unprocessedQuestion,res){
    let question;
    let sql;
    if(unprocessedQuestion.Answer3ID_FK_Question){
        sql = "select * from Answer where AnswerID = '"+unprocessedQuestion.Answer1ID_FK_Question+"' or AnswerID = '"+unprocessedQuestion.Answer2ID_FK_Question+"' or AnswerID = '"+unprocessedQuestion.Answer3ID_FK_Question+"' order by AnswerID asc;";
        question = new QuestionCreator(unprocessedQuestion.QuestionID,unprocessedQuestion.Text,unprocessedQuestion.Concluded,unprocessedQuestion.Reset,0,0,0);
    }else{
        sql = "select * from Answer where AnswerID = '"+unprocessedQuestion.Answer1ID_FK_Question+"' or AnswerID = '"+unprocessedQuestion.Answer2ID_FK_Question+"' order by AnswerID asc;";
        question = new QuestionCreator(unprocessedQuestion.QuestionID,unprocessedQuestion.Text,unprocessedQuestion.Concluded,unprocessedQuestion.Reset,0,0);
    }
    pool.query(sql, (err, result)=>{
      if(err) throw err;
        question.option[0] = new OptionCreator(result[0].AnswerID,result[0].Text,result[0].Wheat,result[0].Swords,result[0].Gold,result[0].Faith);
        
        question.option[1] = new OptionCreator(result[1].AnswerID,result[1].Text,result[1].Wheat,result[1].Swords,result[1].Gold,result[1].Faith);
        if(unprocessedQuestion.Answer3ID_FK_Question){
            question.option[2] = new OptionCreator(result[2].AnswerID,result[2].Text,result[2].Wheat,result[2].Swords,result[2].gold,result[2].Faith);
        }
      res.send(question);
    });
}

class QuestionCreator{
    constructor(id,text,concluded,resets,o1,o2,o3){
      this.option = [];
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
    PickMe(buttonArray){ //assigns each of the 3 buttons to the picked question (the 3rd option only exists for some questions)
      buttonArray[0].AssignQuestion(this.id)
      buttonArray[1].AssignQuestion(this.id)
      if (this.option[2]){
        buttonArray[2].AssignQuestion(this.id)
      }else {
        buttonArray[2].DisableMe();
      }
    }
    PickOption(optionPicked){ //after PickMe()
      //disable all buttons with the disablebuttons function either here or in the buttons click me function
      let playerID = playerLoged.PlayerID; //change to the correct ID
    let statsToSend = {
    "PlayerID":playerID,
    "wheat":this.option[optionPicked].wheat,
    "swords":this.option[optionPicked].swords,
    "gold":this.option[optionPicked].gold,
    "faith":this.option[optionPicked].faith
    }
    httpPost('/changeStats','json',statsToSend,ChangeStatsReceiver);UpdateStats();
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
//"ChangeStats" : ChangeStats,
let sq =  {
    "ChangeStatsFunction" : ChangeStatsFunction,
    "PickRandomQuestion": PickRandomQuestion
  }
module.exports = sq;