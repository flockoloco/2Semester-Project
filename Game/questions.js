

function DisableButtons(buttonsArray,action){
  if (action == "Disable"){
    for (let i = 0; buttonsArray.length; i++){
      buttonsArray[i].DisableMe();
    }
  }
  if (action == "Enable"){
    for (let i = 0; buttonsArray.length; i++){
      buttonsArray[i].EnableMe();
    }
  }
}
function ChangeStatsReceiver(stats){
  console.log("recieving stats from server")
  console.log(stats)
  playerLoged.wheat = stats.wheat;
  playerLoged.swords = stats.swords;
  playerLoged.gold = stats.gold;
  playerLoged.faith = stats.faith;
  playerLoged.Score = stats.score;

  if (stats.deadCheck == true) {
    console.log("right before the get")
    loadJSON('/getDeadText/'+playerLoged.PlayerID,function(data){
      console.log("get dead text!")
      console.log(data[0].Text)
    deadButton.text = data[0].Text;
    gameButtonArray[0].DisableMe();
    gameButtonArray[1].DisableMe();
  });
    
    dead = true
  }
  

  loadAll();

    GetNewQuestion(false);

  //maybe start loop again
}


/*function LoadQuestions(){
    buttonArray[0] = new ButtonCreator(100,100,50,50,"blue","",0,false,"option1")
    buttonArray[1] = new ButtonCreator(200,100,50,50,"blue","",1,false,"option2")
 //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
}*/
function GetNewQuestion(firstQuestionCheck){
  let objectToSend = {
    "playerID" : playerLoged.PlayerID,
    "firstTimeCheck" : firstQuestionCheck
  }
  httpPost('/getNewQuestion','json',objectToSend,QuestionReceiver);

}
function QuestionReceiver(questionParts){
  activeQuestion = new QuestionCreator(questionParts);
  activeQuestion.PickMe(gameButtonArray);
}
