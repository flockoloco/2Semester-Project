const pool = require('../core/database');

function buildingCall(bWheat, bSword, bGold, bFaith, playerID){



    let insert = {
        "Type": '',
        "Building": []
    };
    let remove = {
        "Type": '',
        "Building": []
    };


    if(bWheat == 1){insert.Type = "Farm"};
    if(bWheat == -1){remove.Type = "Farm"};
    if(bSword == 1){insert.Type = "Barrack"};
    if(bSword == -1){remove.Type = "Barrack"};
    if(bGold == 1){insert.Type = "Bank"};
    if(bGold == -1){remove.Type = "Bank"};
    if(bFaith == 1){insert.Type = "Church"};
    if(bFaith == -1){remove.Type = "Church"};

    //----------------------------------INSERT PART---------------------------------

    let sql2 = "SELECT PosX, PosY FROM tile WHERE Type = '"+insert.Type+"' AND PlayerID_FK_Tile="+playerID;

    pool.query(sql2, (err, result)=>{
        if(err) throw err;
        insert.Building = [];
        for(i = 0; i < result.length; i++){
            (insert.Building).push(result[i])
        }
    });

    let insertIndex = insert.Building[Math.floor(Math.random() * (insert.Building).length)]

    if (insertIndex){
        let insert = "INSERT INTO building(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+insert.Type+"', '"+(insert.Index).PosX+"', '"+(insert.Index).PosY+"', '"+playerID+"' )";
        let deleter = "DELETE FROM tile WHERE PosX = '"+(insert.Index).PosX+"' AND PosY = '"+(insert.Index).PosY+"' AND Type = '"+insert.Type+"' AND PlayerID_FK_Tile = '"+playerID+"' ";
        pool.query(insert, deleter, ()=>{res.send(true)});
    }

    //------------------------------------REMOVE PART--------------------------

    let sql3 = "SELECT PosX, PosY FROM tile WHERE Type = '"+remove.Type+"' AND PlayerID_FK_Tile="+playerID;

    pool.query(sql3, (err, result)=>{
        if(err) throw err;
        remove.Building = [];
        for(i = 0; i < result.length; i++){
            (remove.Building).push(result[i])
        }
    });

    let removeIndex = remove.Building[Math.floor(Math.random() * (remove.Building).length)]

    if (removeIndex){
        let insert = "INSERT INTO tile(Type, PosX, PosY, PlayerID_FK_Building) VALUES('"+remove.Type+"', '"+(remove.Index).PosX+"', '"+(remove.Index).PosY+"', '"+playerID+"' )";
        let deleter = "DELETE FROM building WHERE PosX = '"+(remove.Index).PosX+"' AND PosY = '"+(remove.Index).PosY+"' AND Type = '"+remove.Type+"' AND PlayerID_FK_Tile = '"+playerID+"' ";
        pool.query(insert, deleter, ()=>{res.send(true)});
    }
}

let ex = {
    "buildingCall" : buildingCall
}
module.exports = ex;