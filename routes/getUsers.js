var express = require('express');
var db = require('./db');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.get(function(req,res){
        var All_Users = new Array();
        db.getConnection(function(err , connection){
        if(!err){
            connection.query('SELECT Userid , Store_Name , Email , PhoneNo , Home_Delivery , Selectid , Latitude , Longitude FROM users where Selectid = 2' , function(error , result){
                if(error)
                {
                    res.status(500).send("no Availability");
                }
                else
                {
                    for(var i = 0 ; i < result.length ;i++){
                        All_Users.push(result[i]);
                }
                res.send(All_Users);
            }
            });
        }
    else console.log(err);
    });
});
module.exports = router;