function DisableButtons(buttonsArray,action){
    if (action == "Disable"){
      for (let i = 0; buttonsArray.length; i++){
        buttonsArray[i].DisableMe()
      }
    }
    if (action == "Enable"){
      for (let i = 0; buttonsArray.length; i++){
        buttonsArray[i].EnableMe()
      }
    }
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

function UpdateStats(){
    //NEEDS PLAYER ID       let playerID = getplayerid? 
    let statsToSend = {
      
        //NEEDS PLAYER ID    "playerID":playerID,
      "wheat":player.wheat,
      "swords":player.swords,
      "gold":player.gold,
      "faith":player.faith
    }
    httpPost('/updateStats','json',statsToSend,UpdateStatsReceiver); //depends on how you are calling your routing
}

function ChangeStats(wheat,swords,gold,faith){
    player.wheat = player.wheat + wheat;
    player.swords = player.swords + swords;
    player.gold = player.gold + gold;
    player.faith = player.faith + faith;
}  

function LoadQuestions(){
    buttonArray[0] = new ButtonCreator(100,100,50,50,"blue","",1,false,"option1")
    buttonArray[1] = new ButtonCreator(200,100,50,50,"blue","",2,false,"option2")
    buttonArray[2] = new ButtonCreator(300,100,50,50,"blue","",3,false,"option3")
 //this is probably the best way to initialize the object i think desta maneira nao temos de os chamar em separado
    questionArray[0] = new QuestionCreator(1,new OptionCreator(1,20,20,30,40),new OptionCreator(2,-5,10,15,-20),new OptionCreator(3,-10,-15,+30,+10));
    questionArray[1] = new QuestionCreator(4,new OptionCreator(1,20,20,30,40),new OptionCreator(5,-5,10,15,-20));
}