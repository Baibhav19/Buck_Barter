var express = require('express');
var db = require('./db');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req,res){
    var cope = req.body;
    console.log(cope);
    var salt = bcrypt.genSaltSync(10);
    cope.Password = bcrypt.hashSync(cope.Password , salt);
    db.getConnection(function(err , connection){
        if(!err){
            var query = connection.query('insert into users set ?',cope, function(err, result) {
                if (err){
                    console.log(err);
                    res.status(500).send("error");
                }
                else  {
                    console.log("done");
                    res.send("registered successfully");
                }
            });
        }
        else console.log(err);
    });
});
module.exports = router;