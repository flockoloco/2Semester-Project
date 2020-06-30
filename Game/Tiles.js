let tiles = []; 

let castleNWImage, castleNEImage, castleSWImage, castleSEImage;
let grassIndex;
let grassImage;
let farmImage;
let churchImage;
let barrackImage;
let bankImage;

//DRAW THE TILES
function drawTile() {
for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles.length; j++) {
        tiles[i][j].draw_tile();
    }
}
}

//CREATE THE TILE INFORMATION AND POSITION
function initTile() {

let numberOfCols = 6;
let sizeOfTile = 100;
let GBW = 600;
let GBH = 600;
let y = 0;
let x = 0;
let countID = 0;
let initialY = height / 1.7 - GBH / 2;
let initialX = width / 1.25 - GBW / 2;

for (let i = 0; i < numberOfCols; i++) {
    tiles[i] = [];
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
    grassIndex = grassImage[Math.floor(Math.random() * grassImage.length)]
    tiles[i][j] = new tile(grassIndex, x, y, sizeOfTile, sizeOfTile, 25, countID);
    }
}
}

        //UPDATE THE TILE INFORMATION
function updateTile(){
for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles.length; j++) {
    for(let k=0;k<arrCastle.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrCastle[k].PosX & py==arrCastle[k].PosY){
    tiles[i][j].set_Castle(arrCastle[k]);
        if(arrCastle[k].Type == 'CastleNW'){
            tiles[i][j].set_image(castleNWImage)}
            if(arrCastle[k].Type == 'CastleNE'){
                tiles[i][j].set_image(castleNEImage)}
                if(arrCastle[k].Type == 'CastleSW'){
                    tiles[i][j].set_image(castleSWImage)}
                    if(arrCastle[k].Type == 'CastleSE'){
                        tiles[i][j].set_image(castleSEImage)}
    }}
    for(let k=0;k<arrFarm.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrFarm[k].PosX & py==arrFarm[k].PosY){
    tiles[i][j].set_Farm(arrFarm[k]);
    tiles[i][j].set_image(farmImage);
    }}
    for(let k=0;k<arrBarrack.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrBarrack[k].PosX & py==arrBarrack[k].PosY){
    tiles[i][j].set_Barrack(arrBarrack[k]);
    tiles[i][j].set_image(barrackImage);
    }}
    for(let k=0;k<arrBank.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrBank[k].PosX & py==arrBank[k].PosY){
    tiles[i][j].set_Bank(arrBank[k]);
    tiles[i][j].set_image(bankImage);
    }}
    for(let k=0;k<arrChurch.length;k++){
    let px=i+1;
    let py=j+1;
    if(px==arrChurch[k].PosX & py==arrChurch[k].PosY){
    tiles[i][j].set_Church(arrChurch[k]);
    tiles[i][j].set_image(churchImage);
    }}
    }
}
drawTile();
}