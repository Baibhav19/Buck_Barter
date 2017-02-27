var express = require('express');
var mysql = require('mysql');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(express.static(__dirname + '/'))
app.use(bodyParser.json());
app.use(passport.initialize());
passport.serializeUser(function(user , done){
    done(null , user.id);
})
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buck1'
});
connection.connect(function(error){
    if(!!error){
        console.log("Error");
    }
    else{
        console.log("connection established");
    }
});
/*
app.use(req,res,next){
    res.header('Access-Control-Allow-Headers: Content-Type , Authorization');
    res.header('Access-Control-Allow-Methods: GET , PUT, POST , DELETE');
    res.header('Access-Control-Allow-Origin: *');
    next();
}
/*var strategy=new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        connection.query('SELECT count(*) as names from users where Email = ?',[username], function(error, result) {
        if(result[0].names == 1)
        {
            connection.query('SELECT Password from users where Email = ?' , [username] , function(error , result){
                console.log(result[0].Password);
                //var salt = bcrypt.genSaltSync(10);
                if(result[0].Password == password) {
                 createToken(username , res);
             }
             else
             {
                return done(null,false,{message:'wrong credentials'});
                //res.status(500).send("error");
            }
        });
        }
        else
        {
            return done(error);
            //res.status(500).send("error");
        }
    });
    });
passport.use(strategy);*/
app.post('/shopadd', function(req,res){
    var cope = req.body;
    console.log(cope);
    cope.Password = passwordHash.generate(cope.Password),
    // var salt = bcrypt.genSaltSync(10);
    // cope.Password = bcrypt.hashSync(cope.Password , salt);
    connection.query('insert into users set ?', [cope], function(err, result) {
        if (err){
            console.log("Error detected");
        }
        else  {
            createToken(cope.Email,res);
            console.log("done");
        }
    });
    res.json({message : "completed"});
});

app.post('/custadd', function(req,res){
    var cope = req.body;
    console.log(cope);
    //var salt = bcrypt.genSaltSync(10);
    //cope.Password = bcrypt.hashSync(cope.Password , salt);
    var query = connection.query('insert into users set ?', cope, function(err, result) {
        if (err){
            console.log("Error detected");
        }
        else  {
            createToken(cope.Email , res);
            console.log("done");
        }
    });
});

app.post('/addProducts', function(req,res){
    var cope = req.body;
    console.log(cope);
    var pname = cope.Pname;
    connection.query('SELECT count(*) as names from added_product where Pname = ?',[pname], function(error, result) {
        if(result[0].names == 1)
        {
            connection.query('SELECT id from added_product where Pname = ?' , [pname] , function(error , result){
                cope.pid = result[0].id;
                var product =
                {
                    pid : cope.pid,
                    Userid : cope.Userid,
                    UnitPrice : cope.UnitPrice,
                    Discount : cope.Discount,
                    Quantity : cope.Quantity,
                    Date_Time : cope.Date_Time
                };
                connection.query('insert into products set ?', product, function(err, result) {
                    if (err){
                        console.log("Error detected");
                    }
                    else  {
                        console.log("done");
                    }
                });
            });
        }
        else{
            var id_category = connection.query('SELECT ITCid from itemcategory where ITCname = ?',[cope.ITCname] , function(error, result){
                console.log(result[0].ITCid);

                var added =
                {
                    id:'',
                    Pname : cope.Pname,
                    ITCid : result[0].ITCid
                }
                connection.query('insert into added_product set ?', added, function(err, result) {
                    var id_product = connection.query('SELECT id from added_product where Pname = ?',[pname] , function(error, result){
                        console.log(result[0].id);
                        var product =
                        {
                            pid :result[0].id,
                            Userid : cope.Userid,
                            UnitPrice : cope.UnitPrice,
                            Discount : cope.Discount,
                            Quantity : cope.Quantity,
                            Date_Time : cope.Date_Time
                        }
                        connection.query('insert into products set ?', product, function(err, result) {
                            if (err){
                                console.log("Error detected");
                            }
                            else  {
                                console.log("done");
                            }
                        });
                    });
                });
});
}
});
});
var name = "baibhav";
app.get('/showProduct' , function(req,res){
    // if(!req.headers.authorization){
    //     return res.status(401).send({
    //         message:'not authentiated , sign in first'
    //     });
    // connection.query('SELECT * from products where Userid = ?',[Userid] , function(error, result){
    //     console.log(result);
    var product = new Array();
    connection.query('SELECT added_product.Pname ,products.Userid , products.UnitPrice, products.Discount , products.Quantity FROM added_product LEFT JOIN products ON (products.pid = added_product.id)' , function(error , result){
        if(error)
        {
            res.status(500).send(error);
        }
        else{
            console.log(result);
            for(var i = 0 ; i < result.length ;i++){
                if(result[i].Userid == '1')
                  product.push(result[i]);
          }
          res.send(product);
      }
  });
// });
});
function createToken(cope , res){
    var payload =  {
        sub : cope
    }
    var token = jwt.encode(payload , "hello");
    console.log('in create token');
    res.send({
        username: cope ,
        token : token
    });
}
app.post('/login' , function(req,res){
    var username = req.body.Email;
    var password = req.body.Password;
    // var salt = bcrypt.genSaltSync(10);
    // password = bcrypt.hashSync(password , salt);
    console.log(password);
    connection.query('SELECT count(*) as names from users where Email = ?',[username], function(error, result) {
        if(result[0].names == 1)
        {
            connection.query('SELECT Password from users where Email = ?' , [username] , function(error , result){
                console.log(result[0].Password);
                var salt = bcrypt.genSaltSync(10);
                if(result[0].Password == password) {
                 createToken(username , res);
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
});
app.listen(8091);