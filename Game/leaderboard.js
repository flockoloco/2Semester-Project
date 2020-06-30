let bar;
let playerID;

let arrCastle = [];
let arrFarm = [];
let arrBarrack = [];
let arrBank = [];
let arrChurch = [];

function preload(){
  castleNWImage = loadImage('../images/castleNW.png');
  castleNEImage = loadImage('../images/castleNE.png');
  castleSWImage = loadImage('../images/castleSW.png');
  castleSEImage = loadImage('../images/castleSE.png');
  grassImage = [loadImage('../images/Grass1.png'), loadImage('../images/Grass2.png'), loadImage('../images/Grass3.png'), loadImage('../images/Grass4.png'), loadImage('../images/Grass5.png'), loadImage('../images/Grass6.png'), loadImage('../images/Grass7.png'), loadImage('../images/Grass8.png'), loadImage('../images/Grass9.png'), loadImage('../images/Grass10.png'), loadImage('../images/Grass11.png'), loadImage('../images/Grass12.png'), loadImage('../images/Grass13.png')];
  farmImage = loadImage('../images/Farm.png')
  churchImage = loadImage('../images/Church.png');
  barrackImage = loadImage('../images/Barrack.png');
  bankImage = loadImage('../images/Bank.png');
}

function setup() {
    noLoop();
    createCanvas(windowWidth, windowHeight);
    initTile();
    searchBar()
    loadAll();
    leaderboard();
    loop();
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
        if(data[i].Type == "CastleNW" || data[i].Type == "CastleNE" || data[i].Type == "CastleSW" || data[i].Type == "CastleSE"){
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

    loadJSON('/playersBoard', function(data){
        player1 = {rank: 1, name: data[0].username,score: data[0].Score};
        player2 = {rank: 2, name: data[1].username,score: data[1].Score};
        player3 = {rank: 3, name: data[2].username,score: data[2].Score};
        player4 = {rank: 4, name: data[3].username,score: data[3].Score};
        player5 = {rank: 5, name: data[4].username,score: data[4].Score};
        player6 = {rank: 6, name: data[5].username,score: data[5].Score};
        player7 = {rank: 7, name: data[6].username,score: data[6].Score};
        player8 = {rank: 8, name: data[7].username,score: data[7].Score};
        player9 = {rank: 9, name: data[8].username,score: data[8].Score};
        player10 = {rank: 10, name: data[9].username,score: data[9].Score};

        var players = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10]; 

        for (var player of players) {
            tbodyHtml += '<tr><td>' +   player.rank + '</td><td>' + player.name + '</td><td>' + player.score + '</td></tr>';
        }
        tbody.innerHTML = tbodyHtml;
    })
}
  leaderboard();