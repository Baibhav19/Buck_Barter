var express = require('express');
var db = require('./db');
var dateFormat = require('dateformat');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req , res){
        var cope = req.body;
        cope.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        db.getConnection(function(err , connection){
        if(!err){
        connection.query('SELECT pid from added_product where Pname = ?',[cope.Pname] , function(error, Pid_result){
            connection.query('UPDATE products SET UnitPrice = ? , Discount= ? , Quantity= ? , Description= ?, Date_Time = ? WHERE Userid = ? AND pid = ? ',[cope.UnitPrice, cope.Discount , cope.Quantity , cope.Description , cope.Date_Time , cope.U_id  , Pid_result[0].pid] , function(err,result)
            {
                console.log(result);
                if(err)
                 res.status(500).send("error in updating");
             else
                res.status(200).send('Updated successfully');
        });
        });
        }
        else console.log(err);
    });
});
module.exports = router;