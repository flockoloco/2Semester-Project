/*function chooseDeleteFarm(){
    let farmX = farm.posX[Math.floor(Math.random() * (farm.posX).length)];
    let farmY = farm.posY[Math.floor(Math.random() * (farm.posY).length)];

    // search the position based on the value chosen
    let positionX = (farm.posX).indexOf(farmX);
    let positionY = (farm.posX).indexOf(farmY);

    // if the result >= 0 get this value and remove from DB
    if(~positionX & ~positionY) {
        httpPost('/FarmDB/' , "json", {"name": 'Farm', "posX": positionX, "posY":  positionY, "player_id": playerLoged.id}, function(data){})
    }
    print("oi")
}*/