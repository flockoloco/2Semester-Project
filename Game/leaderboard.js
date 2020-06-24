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
    leaderboard()
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

    loadJSON('/playersBoard', function(data){
        player1 = {rank: 1, name: data[0].PlayerName,score: data[0].Score, death: "arroz"};
        player2 = {rank: 2, name: data[1].PlayerName,score: data[1].Score, death: "arroz"};
        player3 = {rank: 3, name: data[2].PlayerName,score: data[2].Score, death: "arroz"};
        player4 = {rank: 4, name: data[3].PlayerName,score: data[3].Score, death: "arroz"};
        player5 = {rank: 5, name: data[4].PlayerName,score: data[4].Score, death: "arroz"};
        player6 = {rank: 6, name: data[5].PlayerName,score: data[5].Score, death: "arroz"};
        player7 = {rank: 7, name: data[6].PlayerName,score: data[6].Score, death: "arroz"};
        player8 = {rank: 8, name: data[7].PlayerName,score: data[7].Score, death: "arroz"};
        player9 = {rank: 9, name: data[8].PlayerName,score: data[8].Score, death: "arroz"};
        player10 = {rank: 10, name: data[9].PlayerName,score: data[9].Score, death: "arroz"};

        var players = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10]; 

        for (var player of players) {
            tbodyHtml += '<tr><td>' +   player.rank + '</td><td>' + player.name + '</td><td>' + player.score + '</td><td>' + player.death + '</td></tr>';
        }
        tbody.innerHTML = tbodyHtml;
    })
}
  leaderboard();