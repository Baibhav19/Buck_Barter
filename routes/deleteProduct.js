var express = require('express');
var db = require('./db');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req , res){
        var cope = req.body;
        console.log(cope.UnitPrice);
        db.getConnection(function(err , connection){
        if(!err){
        connection.query('SELECT pid from added_product where Pname = ?',[cope.Pname] , function(error, Pid_result){
            console.log(Pid_result[0].Pid);
            connection.query('DELETE FROM products where Userid = ? AND pid =? AND UnitPrice = ?',[cope.U_id , Pid_result[0].pid, cope.UnitPrice]  , function(error, result){
                if(error)
                    res.status(501).send("error in DELETE");
                else
                    res.send("1 row effected");
            });
        });
    }
    else console.log(err);
    });
    });
module.exports = router;