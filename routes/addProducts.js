var express = require('express');
var mysql = require('mysql');
var db = require('./db');
var dateFormat = require('dateformat');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req,res){
        var cope = req.body;
    cope.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var pname = cope.Pname;
    var s = req.headers.authorization.toString().split(" ");
    console.log(s[0]);
    cope.Userid = parseInt(s[0]);
    db.getConnection(function(err , connection){
        if(!err){
            connection.query('SELECT count(*) as names from added_product where Pname = ?',[pname], function(error, result) {
                console.log(result[0].names);
                if(result[0].names == 1)
                {
                    connection.query('SELECT pid from added_product where Pname = ?' , [pname] , function(error , result){
                        console.log(result[0].pid);
                        cope.pid = result[0].pid;
                        var product =
                        {
                            pid : cope.pid,
                            Userid : cope.Userid,
                            UnitPrice : cope.UnitPrice,
                            Discount : cope.Discount,
                            Quantity : cope.Quantity,
                            Description : cope.Description,
                            Date_Time : cope.Date_Time
                        };
                        connection.query('insert into products set ?', [product], function(err, result) {
                            if (err){
                                console.log("Error detected");
                                res.send("error");
                            }
                            else  {
                                console.log("done 1 more");
                                res.send("done");
                            }
                        });
                    });
                }
                else{
                    var id_category = connection.query('SELECT ITCid from itemcategory where ITCname = ?',[cope.ITCname] , function(error, result){
                        console.log(result[0].ITCid);
                        var added =
                        {
                            pid:'',
                            Pname : cope.Pname,
                            ITCid : result[0].ITCid
                        }
                        connection.query('insert into added_product set ?', added, function(err, result) {
                            connection.query('SELECT pid from added_product where Pname = ?' , [pname , cope.NetWeight , cope.Description] , function(error , result){
                                var product =
                                {
                                    pid :result[0].pid,
                                    Userid : cope.Userid,
                                    UnitPrice : cope.UnitPrice,
                                    Discount : cope.Discount,
                                    Quantity : cope.Quantity,
                                    Description: cope.Description,
                                    Date_Time : cope.Date_Time
                                }
                                connection.query('insert into products set ?', product, function(err, result) {
                                    if (err){
                                        console.log("Error detected");
                                        res.send("errrrrr");
                                    }
                                     else  {
                                        console.log("done");
                                        res.send("done 1st");
                                    }
                                });
                            });
                        });
                    });
                }
            });
        }
            else
                console.log(err);
        });
    });
module.exports = router;