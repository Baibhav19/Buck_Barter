var express = require('express');
var db = require('./db');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.get(function(req,res){
    var product = new Array();
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'not authentiated'
        });
    }
    var s = req.headers.authorization.toString().split(" ");
    db.getConnection(function(err , connection){
        if(!err){
            connection.query('SELECT added_product.Pname ,products.Userid , products.UnitPrice, products.Discount , products.Quantity , products.Description FROM added_product LEFT JOIN products ON (products.Pid = added_product.Pid)' , function(error , result){
            if(error)
            {
                res.status(500).send(error);
            }
            else{
                for(var i = 0 ; i < result.length ;i++){
                    if(result[i].Userid == s[0])
                        product.push(result[i]);
                }
            res.send(product);
            }

    });
        }
        else console.log(err);
    });
});
module.exports = router;