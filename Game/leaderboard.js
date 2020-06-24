let bar;
let playerID;

let arrCastle = [];
let arrFarm = [];
let arrBarrack = [];
let arrBank = [];
let arrChurch = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    initTile();
    searchBar()
    //loadAll();
};

function draw() {
    background(250, 218, 94);
    drawTile();
}


const searchBar = () => {
    bar = createInput();
    bar.position(1300, 100);
    bar.size(200, 30);

    button = createButton('Search Player');
    button.position(1525, 105);
    button.mousePressed(findPlayer);
}

function findPlayer(){
    initTile();
    playerID = bar.value()
    loadAll();
}

function loadAll(){
    loadJSON('/getAllBuildingsLeaderboard/'+playerID,function(data){
    parseTile(data);
    });
}

function parseTile(data){

    arrCastle = [];
    arrFarm = [];
    arrBarrack = [];
    arrBank = [];
    arrChurch = [];

    for(let i=0;i<data.length;i++){
        if(data[i].Type == "Castle"){
            arrCastle.push(data[i]);
        }
        else if(data[i].Type == "Farm"){
            arrFarm.push(data[i])
        }
        else if(data[i].Type == "Barrack"){
            arrBarrack.push(data[i])
        }
        else if(data[i].Type == "Bank"){
            arrBank.push(data[i])
        }
        else if(data[i].Type == "Church"){
            arrChurch.push(data[i])
        }
    }
    updateTile();
}

function leaderboard() {
    
    var leaderboard = document.getElementById('leaderboard');
    var tbody = leaderboard.querySelector('tbody');
    var tbodyHtml = '';
  
    var player1 = {name:"Thomas",date:"1",score:"201", death: "arroz"};
    var player2 = {name:"Thomas",date:"1",score:"201", death: "arroz"};
    var player3 = {name:"Thomas",date:"1",score:"201", death: "arroz"};
  
    var players = [
      player1,
      player2,player3
    ]; 
    
    for (var player of players) {
      tbodyHtml += '<tr><td>' +   player.date + '</td><td>' + player.name + '</td><td>' + player.score + '</td><td>' + player.death + '</td></tr>';
    }
    
    tbody.innerHTML = tbodyHtml;
  }
  
  leaderboard();