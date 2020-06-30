let userid;
let MenuButtonsArray = [];
let newrunobject;

let BG

function preload() {
    GetUser();
    BG = loadImage('../images/background.jpg');
}

function GetUser(){
    loadJSON('/getUser', function(data){
        userid = data.UserID;
        Username = data.UserName
    });
}

function setup() { 
    createCanvas(windowWidth, windowHeight);
    MenuButtonsArray[0] = new ButtonCreator(960-100,100,200,50,"blue","newRun","","",false,"Start a new game!"); //new Run
    MenuButtonsArray[1] = new ButtonCreator(960-100,200,200,50,"blue","continueRun","","",false,"Continue game!"); //continue Run
    MenuButtonsArray[2] = new ButtonCreator(960-100,300,200,50,"blue","leaderboard","","",false,"Leaderboard"); //leaderboard
    MenuButtonsArray[3] = new ButtonCreator(960-100,400,200,50,"blue","settings","","",false,"Settings"); //settings
    CheckUserPlayer();
    newrunobject = {
        "userID": userid,
        "Username": Username
    }
};

function draw() {
    background(BG)
    // check hovers
    for (let i = 0; MenuButtonsArray.length > i; i++){
        MenuButtonsArray[i].CheckHover(mouseX,mouseY);
        MenuButtonsArray[i].DrawMe();

    }
}
function mouseReleased() {
    for (let i = 0; MenuButtonsArray.length > i; i++){
        if(MenuButtonsArray[i].action == "newRun"){
            MenuButtonsArray[i].ClickMe(newrunobject);
        }else{
            MenuButtonsArray[i].ClickMe(userid);
        }
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


