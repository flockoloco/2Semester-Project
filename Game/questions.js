

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
  console.log("in change stats receiver");
  playerLoged.wheat = stats.wheat;
  playerLoged.swords = stats.swords;
  playerLoged.gold = stats.gold;
  playerLoged.faith = stats.faith;
  //CheckAlive()

  GetNewQuestion();
  //maybe start loop again
}
function LoadQuestions(){
    buttonArray[0] = new ButtonCreator(100,100,50,50,"blue","",0,false,"option1")
    buttonArray[1] = new ButtonCreator(200,100,50,50,"blue","",1,false,"option2")
 //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
}
function GetNewQuestion(){
  playerID = playerLoged.PlayerID;
  httpPost('/getNewQuestion','json',{playerID},QuestionReceiver);

}
function QuestionReceiver(question){
  console.log("the OH SHIT MOMENT");
  activeQuestion = new QuestionCreator(question);
  activeQuestion.PickMe(buttonArray);
  console.log(activeQuestion);
}
