const express = require('express');
exports.login = function(req, res){
    var sess = req.session; 
 
    if(req.method == "POST"){
       var name = post.username;
       var pass = post.password;
      
       var sql = "SELECT username, password FROM `player` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.Id = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home/dashboard');
          }
          else{
            console.log("Wrong username or password")
          }
                  
       });
    }       
 };
