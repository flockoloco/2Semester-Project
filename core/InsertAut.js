function PremiumInsert() {
    let sql = "INSERT INTO player(UserID_FK_Player, Concluded, Wheat, Swords, Money, Faith, Score) VALUES('"+result.insertId+"', FALSE, '50', '50', '50', '50', 0) "
}

function BasicInsert() {

}

let GInser = {
    "PremiumINser": PremiumInsert,
    "BasicInsert": BasicInsert
}

module.exports = GInser;