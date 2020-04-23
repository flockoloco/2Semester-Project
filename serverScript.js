const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static("libraries"));
app.use(express.static("public"));
app.use(express.static("addons"));
<<<<<<< HEAD
=======
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//AAAAAAAAAAAAAAAAAA

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

console.log("bbbbbbbbbbbbbbbbbb");
>>>>>>> fbc6695cb31040e22537802b3a1e721ace7974cb
