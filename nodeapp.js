var express = require('express');
var mysql = require('mysql');
var app = express();
var http = require('http');
var dateFormat = require('dateformat');
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

    app.post('/deleteProduct' , function(req , res){
        var cope = req.body;
        console.log(cope.UnitPrice);
        connection.query('SELECT pid from added_product where Pname = ?',[cope.Pname] , function(error, Pid_result){
            console.log(Pid_result[0].Pid);
            connection.query('DELETE FROM products where Userid = ? AND pid =? AND UnitPrice = ?',[cope.U_id , Pid_result[0].pid, cope.UnitPrice]  , function(error, result){
                if(error)
                    res.status(501).send("error in DELETE");
                else
                    res.send("1 row effected");
            });
        });
    });

    app.post('/updateProduct' , function(req , res){
        var cope = req.body;
        cope.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        connection.query('SELECT pid from added_product where Pname = ?',[cope.Pname] , function(error, Pid_result){
            connection.query('UPDATE products SET UnitPrice = ? , Discount= ? , Quantity= ? , Date_Time = ? WHERE Userid = ? AND pid = ? ',[cope.UnitPrice, cope.Discount , cope.Quantity , cope.Date_Time , cope.U_id  , Pid_result[0].pid] , function(err,result)
            {
                console.log(result);
                if(err)
                 res.status(500).send("error in updating");
             else
                res.status(200).send('Updated successfully');
        });
        });
    });
    app.post('/shopadd', function(req,res){
        var cope = req.body;
        console.log(cope);
        var salt = bcrypt.genSaltSync(10);
        cope.Password = bcrypt.hashSync(cope.Password , salt);
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
    });

    app.post('/custadd', function(req,res){
        var cope = req.body;
        console.log(cope);
        var salt = bcrypt.genSaltSync(10);
        cope.Password = bcrypt.hashSync(cope.Password , salt);
        var query = connection.query('insert into users set ?', cope, function(err, result) {
            if (err){
                console.log("Error detected");
            }
            else  {
                console.log("done");
            }
        });
    });

    app.post('/addProducts', function(req,res){
        var cope = req.body;
    //cope.Date_Time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //cope.Date_Time = moment().format('MMMM Do YYYY, h:mm:ss a');
    cope.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var pname = cope.Pname;
    var s = req.headers.authorization.toString().split(" ");
    console.log(s[0]);
    cope.Userid = parseInt(s[0]);
    connection.query('SELECT count(*) as names from added_product where Pname = ? AND NetWeight = ? AND Description = ?',[pname , cope.NetWeight , cope.Description], function(error, result) {
        console.log(result[0].names);
        if(result[0].names == 1)
        {
            connection.query('SELECT pid from added_product where Pname = ? AND NetWeight = ? AND Description = ?' , [pname , cope.NetWeight , cope.Description] , function(error , result){
                console.log(result[0].pid);
                cope.pid = result[0].pid;
                var product =
                {
                    pid : cope.pid,
                    Userid : cope.Userid,
                    UnitPrice : cope.UnitPrice,
                    Discount : cope.Discount,
                    Quantity : cope.Quantity,
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
                    NetWeight: cope.NetWeight,
                    Description: cope.Description,
                    ITCid : result[0].ITCid
                }
                connection.query('insert into added_product set ?', added, function(err, result) {
                 connection.query('SELECT pid from added_product where Pname = ? AND NetWeight = ? AND Description = ?' , [pname , cope.NetWeight , cope.Description] , function(error , result){
                    var product =
                    {
                        pid :result[0].pid,
                        Userid : cope.Userid,
                        UnitPrice : cope.UnitPrice,
                        Discount : cope.Discount,
                        Quantity : cope.Quantity,
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
});
    app.get('/showProduct' , function(req,res){
    // if(!req.headers.authorization){
    //     return res.status(401).send({
    //         message:'not authentiated , sign in first'
    //     });
    // connection.query('SELECT * from products where Userid = ?',[Userid] , function(error, result){
    //     console.log(result);

    var product = new Array();
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'not authentiated'
        });
    }
    var s = req.headers.authorization.toString().split(" ");
    connection.query('SELECT added_product.Pname ,products.Userid , products.UnitPrice, products.Discount , products.Quantity , added_product.Description FROM added_product LEFT JOIN products ON (products.Pid = added_product.Pid)' , function(error , result){
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
});
    app.get('/showCoords' , function(req,res){
        var coords = new Array();
        connection.query('SELECT users.Latitude,users.Longitude FROM users where Selectid = 2' , function(error , result){
            if(error)
            {
                res.status(500).send(error);
            }
            else{
                console.log(result);
                for(var i = 0 ; i < result.length ;i++){
                  coords.push(result[i]);
              }
              res.send(coords);
          }
      });
    });
    function createToken(cope , res){
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
    app.post('/login' , function(req,res){
        var username = req.body.Email;
        var password = req.body.Password;
        connection.query('SELECT count(*) as names from users where Email = ?',[username], function(error, result) {
            if(result[0].names == 1)
            {
                connection.query('SELECT Password from users where Email = ?' , [username] , function(error , result){
                    if(bcrypt.compareSync(password , result[0].Password )) {
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