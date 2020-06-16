const pool = require('../core/database');
const ex = require('./buildingCall');
function ChangeStatsFunction(req,res){
console.log("change stats funcion")
    ChangeStats(req.body.PlayerID,req.body.wheat,req.body.swords,req.body.gold,req.body.faith,req.body.bwheat,req.body.bswords,req.body.bgold,req.body.bfaith,res);
    
}

function ChangeStats(id,wheat,swords,gold,faith,bwheat,bswords,bgold,bfaith,res){
  ex.buildingCall(bwheat,bswords,bgold,bfaith)
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
        console.log(objectToSend)
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
  console.log("inside of the pickrandomquestion")
  let infinityLoop = false;
  do {
    infinityLoop = true;
    let sql = "select * from Player_Question where PlayerID_FK_Player_Question = '"+req.body.playerID+"' order by QuestionID_FK_Player_Question asc;";
    console.log(sql)
    console.log("result print")
    pool.query(sql, (err, result)=>{
      console.log(result)
      if(err) throw err;
      if (CheckAnyLeft(result) == true){
        let foundAPick = false;
        do{
          let randompick = Math.floor(Math.random()*result.length);
          if (result[randompick].Concluded == 0){
            /*let update = "update Player_Question set Concluded = true where PlayerID_FK_Player_Question = '"+req.body.playerID+"';";
            pool.query(update,(err0,result0)=>{
              if (err0) throw err0;});*/
            foundAPick = true;
            infinityLoop = true;
            FullQuestionCreator(result[randompick],res);
          }
        }while(foundAPick == false);
      }else if(CheckAnyLeft(result) == false){
        let sqlUpdate = "update Player_Question set Concluded = false where PlayerID_FK_Player_Question = '"+req.body.playerID+"';";
        pool.query(sqlUpdate, (err2, result2)=>{
          if (err2) throw err2;
        });  
      }
    });
  }while(infinityLoop == false);
}

function FullQuestionCreator(unprocessedQuestion,res){

  console.log(unprocessedQuestion)
  let sql0 = "select * from Question where QuestionID = '"+unprocessedQuestion.QuestionID_FK_Player_Question+"';";
  pool.query(sql0, (err, result1)=>{
    if(err) throw err;

    let sql = "select * from Answer where AnswerID = '"+result1[0].Answer1ID_FK_Question+"' or AnswerID = '"+result1[0].Answer2ID_FK_Question+"' order by AnswerID asc;";
    console.log(sql)
    pool.query(sql, (err, result)=>{
      console.log("heres the result from the Answer log")
      console.log(result)
      if(err) throw err;
      let questionParts = {
        "question":question = {
          "id":result1[0].QuestionID,
          "text":result1[0].Text
        },
        "option0":option0 = {
          "id":result[0].AnswerID,
          "text":result[0].Text,
          "wheat":result[0].Wheat,
          "swords":result[0].Swords,
          "gold":result[0].Gold,
          "faith":result[0].Faith,
          "bwheat":result[0].BuildingWheat,
          "bswords":result[0].BuildingSwords,
          "bgold":result[0].BuildingGold,
          "bfaith":result[0].BuildingFaith
        },
        "option1":option1 = {
          "id":result[1].AnswerID,
          "text":result[1].Text,
          "wheat":result[1].Wheat,
          "swords":result[1].Swords,
          "gold":result[1].Gold,
          "faith":result[1].Faith,
          "bwheat":result[1].BuildingWheat,
          "bswords":result[1].BuildingSwords,
          "bgold":result[1].BuildingGold,
          "bfaith":result[1].BuildingFaith
        }
      }
      res.send(questionParts);
    });
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