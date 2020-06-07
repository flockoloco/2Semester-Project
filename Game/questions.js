import { Router } from "express";

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
  playerLoged.wheat = stats.wheat;
  playerLoged.swords = stats.swords;
  playerLoged.gold = stats.gold;
  playerLoged.faith = stats.faith;
  //CheckAlive()

  GetNewQuestion();
  //maybe start loop again
}


function LoadQuestions(){
    buttonArray[0] = new ButtonCreator(100,100,50,50,"blue","",1,false,"option1")
    buttonArray[1] = new ButtonCreator(200,100,50,50,"blue","",2,false,"option2")
    buttonArray[2] = new ButtonCreator(300,100,50,50,"blue","",3,false,"option3")
 //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
    questionArray[0] = new QuestionCreator(1,new OptionCreator(1,20,20,30,40),new OptionCreator(2,-5,10,15,-20),new OptionCreator(3,-10,-15,+30,+10));
    questionArray[1] = new QuestionCreator(4,new OptionCreator(1,20,20,30,40),new OptionCreator(5,-5,10,15,-20));
}
function GetNewQuestion(){
  playerID = playerLoged.playerID
  httpPost('/getNewQuestion','json',playerID,QuestionReceiver);

}
function QuestionReceiver(question){
  question.PickMe(buttonArray);
}