var express = require('express');
var db = require('./db');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var router = express.Router();
var bodyParser = require('body-parser');

function createToken(cope , res , connection){
        var payload =  {
            sub : cope
        }
        var token = jwt.encode(payload , "hello");
        console.log('in create token');
        var query = connection.query('SELECT Userid from users where Email = ?' , [cope] , function(error , result){
            res.send({
                username: cope ,
                useridd: result[0].Userid,
                token : token
            });
        });
    }
router.route('/')
.post(function(req , res){
        var username = req.body.Email;
        var password = req.body.Password;
        db.getConnection(function(err , connection){
        if(!err){
        connection.query('SELECT count(*) as names from users where Email = ?',[username], function(error, result) {
            if(result[0].names == 1)
            {
                connection.query('SELECT Password from users where Email = ?' , [username] , function(error , result){
                    if(bcrypt.compareSync(password , result[0].Password )) {
                       createToken(username , res , connection);
                   }
                   else
                   {
                    res.status(500).send("error");
                }
            });
            }
            else
            {
                res.status(500).send("error");
            }
        });
    }
    else
        console.log(err);
});
    });
module.exports = router;