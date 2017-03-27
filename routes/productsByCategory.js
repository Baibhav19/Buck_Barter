var express = require('express');
var db = require('./db');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req,res){
        var detailed_prod = new Array();
        db.getConnection(function(err , connection){
        if(!err){
        connection.query('SELECT added_product.Pname , added_product.ITCid , products.Userid , products.UnitPrice ,products.Discount , products.Description , products.Quantity FROM added_product JOIN products ON (products.Pid = added_product.Pid AND added_product.ITCid = ? )' , [req.body.iCategory] , function(error , result){
            if(error)
            {
                res.status(500).send('No Products');
            }
            else
            {
                for(var i = 0 ; i < result.length ;i++){
                    detailed_prod.push(result[i]);
                }
                res.send(detailed_prod);
            }
            
            });
        }
        else{
            console.log(error);
        }
        });
    });
module.exports = router;