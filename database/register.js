const express = require('express');
exports.signup = function(req, res){
    if(req.method == "POST"){
       var name = post.username;
       var pass = post.password;
 
       var sql = "INSERT INTO `player`(user_name`, `password`) VALUES ('" + name + "','" + pass + "')";
 
       var query = db.query(sql, function(err, result) {
 
          console.log("Succesfully! Your account has been created.");
       });
 
    } else {
       res.render('signup');
    }
 };