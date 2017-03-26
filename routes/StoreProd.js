var express = require('express');
var db = require('./db');
var router = express.Router();
var bodyParser = require('body-parser');
router.route('/')
.post(function(req,res){
        var detailed_prod = new Array();
        //console.log(req.body.id);
        db.getConnection(function(err , connection){
        if(!err){
        connection.query('SELECT added_product.Pname , added_product.ITCid , products.Userid , products.UnitPrice ,products.Discount , products.Description , products.Quantity FROM added_product LEFT JOIN products ON (products.Pid = added_product.Pid)' , function(error , result){
            //console.log(result);
            if(error)
            {
                res.status(500).send('No Products');
            }
            else
            {
                for(var i = 0 ; i < result.length ;i++){
                    if(result[i].Userid == req.body.id){
                        result[i] =
                        {
                            Userid : result[i].Userid ,
                            Pname : result[i].Pname,
                            UnitPrice: result[i].UnitPrice,
                            Discount: result[i].Discount,
                            Description: result[i].Description,
                            Quantity : result[i].Quantity ,
                            Category : result[i].ITCid
                        }
                        detailed_prod.push(result[i]);
                    }
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