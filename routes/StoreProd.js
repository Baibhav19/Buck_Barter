var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buck1'
});
router.route('/')
.post(function(req,res){
        var detailed_prod = new Array();
        //console.log(req.body.id);
        connection.query('SELECT added_product.Pname , products.Userid , products.UnitPrice ,products.Discount , products.Description FROM added_product LEFT JOIN products ON (products.Pid = added_product.Pid)' , function(error , result){
            console.log(result);
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
                            Pname : result[i].Pname,
                            UnitPrice: result[i].UnitPrice,
                            Discount: result[i].Discount,
                            Description: result[i].Description
                        }
                        detailed_prod.push(result[i]);
                    }
                }
            res.send(detailed_prod);
            }
    });
    });
   module.exports = router;