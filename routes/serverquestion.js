const pool = require('../core/database');

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
            FullQuestionCreator(result[randompick],res);
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
  console.log(unprocessedQuestion)
  let question;
  let sql;
  sql = "select * from Answer where AnswerID = '"+unprocessedQuestion.Answer1ID_FK_Question+"' or AnswerID = '"+unprocessedQuestion.Answer2ID_FK_Question+"' order by AnswerID asc;";
  pool.query(sql, (err, result)=>{
    if(err) throw err;
      let questionParts = {
        "question":question = {
          "id":unprocessedQuestion.QuestionID,
          "text":unprocessedQuestion.Text,
          "concluded":unprocessedQuestion.Concluded,
          "resets":unprocessedQuestion.Reset
        },
        "option0":option0 = {
          "id":result[0].AnswerID,
          "text":result[0].Text,
          "wheat":result[0].Wheat,
          "swords":result[0].Swords,
          "gold":result[0].Gold,
          "faith":result[0].Faith
        },
        "option1":option1 = {
          "id":result[1].AnswerID,
          "text":result[1].Text,
          "wheat":result[1].Wheat,
          "swords":result[1].Swords,
          "gold":result[1].Gold,
          "faith":result[1].Faith
        }
      }
      res.send(questionParts);

  });
}

class QuestionCreator{
    constructor(id,text,concluded,resets,o1,o2){
      this.option = [];
      this.id = id; 
      this.text = text;
      this.concluded = concluded;
      this.resets = resets;
      this.option[0] = o1;
      this.option[1] = o2;
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



      this.building[0] = +1;
      this.building[1] = -1;
      this.building[2] = 0;
      this.building[3] = -1;
    }
}
//"ChangeStats" : ChangeStats,
let sq =  {
    "ChangeStatsFunction" : ChangeStatsFunction,
    "PickRandomQuestion": PickRandomQuestion
  }
module.exports = sq;