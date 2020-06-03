
//draw the tiles
function drawTile() {
for (let i = 0; i < Settlement.length; i++) {
    for (let j = 0; j < Settlement.length; j++) {
    Settlement[i][j].draw_tile();
    }
}
}

//Tile Info
function initTile() {

let numberOfCols = 6;
let sizeOfTile = 100;
let GBW = 600;
let GBH = 600;
let y = 0;
let x = 0;
let countID = 0;
let initialY = height / 1.7 - GBH / 2;
let initialX = width / 1.3 - GBW / 2;

for (let i = 0; i < numberOfCols; i++) {
//every colum is also an array
Settlement[i] = [];
if (i == 0) {
y = initialY;
} else {
y = y + GBH / numberOfCols;
}
    for (var j = 0; j < numberOfCols; j++) {
    if (j == 0) {
    x = initialX;
    } else {
    x = x + GBW / numberOfCols;
    }
    countID++;
    Settlement[i][j] = new tile(x, y, sizeOfTile, 'lightgreen', 25, '', countID);
    }
}
}

//update the tile info 
function updateSettlement(){

for (let i = 0; i < Settlement.length; i++) {
    for (let j = 0; j < Settlement.length; j++) {
    for(let k=0;k<arrSettlement.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrSettlement[k].posX & py==arrSettlement[k].posY){
    Settlement[i][j].set_settlement(arrSettlement[k]);
    Settlement[i][j].set_color("LightGray");
    }}
    }
}
drawTile();
}