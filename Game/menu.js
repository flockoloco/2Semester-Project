let userid;
let MenuButtonsArray = [];
let answerImage1;
let answerImage2;

function preload() {
    GetUser();
    answerImage1 = loadImage('../images/answerimage1.png');
    answerImage2 = loadImage('../images/answerimage2.png');
}

function GetUser(){
    loadJSON('/getUser', function(data){
        userid = data.UserID;
    });
}

function setup() { 
    createCanvas(windowWidth, windowHeight);
    MenuButtonsArray[0] = new ButtonCreator(960-100,300,200,50,"blue","newRun","","",false,"Start a new game!"); //new Run
    MenuButtonsArray[1] = new ButtonCreator(960-100,400,200,50,"blue","continueRun","","",false,"Continue game!"); //continue Run
    MenuButtonsArray[2] = new ButtonCreator(960-100,500,200,50,"blue","leaderboard","","",false,"Leaderboard"); //leaderboard
    CheckUserPlayer();
};

function draw() {
    background(250, 218, 94);
    // check hovers
    for (let i = 0; MenuButtonsArray.length > i; i++){
        MenuButtonsArray[i].CheckHover(mouseX,mouseY);
        MenuButtonsArray[i].DrawMe();

    }
}
function mouseReleased() {
    for (let i = 0; MenuButtonsArray.length > i; i++){
    MenuButtonsArray[i].ClickMe(userid);
    }
}
function CheckUserPlayer(){
    let objectToSend = {
        "userID": userid
    }
    
    httpPost('/checkPlayerActiveRun','json',objectToSend,CheckUserPlayerReceiver);

}
function CheckUserPlayerReceiver(data){
    if (data == false) {
        MenuButtonsArray[1].DisableMe()
    }else {
        MenuButtonsArray[1].EnableMe()
    }
}


