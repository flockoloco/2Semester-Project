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