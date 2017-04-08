var express = require('express');
var mysql = require('mysql');
var app = express();
var http = require('http');
var fs = require('fs');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var multer  = require('multer');
var upload = multer({ dest : '/uploads/'});
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
app.use(express.static(__dirname + '/'))
app.use(bodyParser.json());
//app.use(passport.initialize());
/*passport.serializeUser(function(user , done){
    done(null , user.id);
})*/
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
app.get('/getUsers' , function(req,res){
        var All_Users = new Array();
            connection.query('SELECT Userid , Store_Name , Email , PhoneNo , Home_Delivery , Selectid , Latitude , Longitude FROM users where Selectid = 2' , function(error , result){
                if(error)
                {
                    res.status(500).send("no Availability");
                }
                else
                {
                    for(var i = 0 ; i < result.length ;i++){
                        All_Users.push(result[i]);
                }
                res.send(All_Users);
            }
            });
    });
app.get('/bySearch' , function(req,res){
        var All_Products = new Array();
            connection.query('SELECT Pname , pid FROM added_product' , function(error , result){
                if(error)
                {
                    res.status(500).send("no Availability");
                }
                else
                {
                    for(var i = 0 ; i < result.length ;i++){
                        All_Products.push(result[i]);
                }
                res.send(All_Products);
            }
            });
    });

app.post('/addToCart' , function(req,res){
    req.body.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var cope = {
        Userid : req.body.Userid,
        pid : req.body.pid,
        Quantity : req.body.Quantity,
        Description : req.body.Description,
        Date_Time : req.body.Date_Time
    }
    var flag = 0;
    connection.query('SELECT Description , Quantity FROM cart where pid = ? AND Userid = ?',[cope.pid , cope.Userid] ,function(error , result){
        console.log(result.length);
        for(var i = 0 ; i < result.length ; i++){
            if(flag === 0 && result[i].Description === cope.Description){
                flag = 1;
                var quantity = result[i].Quantity;
                connection.query('UPDATE cart set Quantity = ? where Userid = ? AND Description = ?' , [cope.Quantity + quantity , cope.Userid , cope.Description] , function(err, result){
                    if(err){
                        res.status(500).send('No Products');
                    }
                    else{
                        res.status(200).send('added to cart');
                    }
                });
            }
        }
        if(flag === 0){
            connection.query('INSERT into cart set ?' ,[cope] , function(error , result){
                if(error){
                    console.log("error in cart");
                    res.status(500).send('No Products');
                }
                else{
                    console.log("added to cart");
                    res.status(200).send('added to cart');
                }
            });
        }
    });
});
app.post('/showCart' , function(req , res){
    connection.query('SELECT cart.Quantity , cart.Description ,  added_product.Pname FROM cart JOIN added_product ON (added_product.pid = cart.pid AND cart.Userid = ? )' , [req.body.Userid] , function(error , result){
        console.log(result);
        if(error){
            res.status(500).send("Error");
        }
        else{
            res.status(200).send(result);
        }
    });
});
app.post('/productsByCategory' , function(req,res){
        var detailed_prod = new Array();

        connection.query('SELECT added_product.Pname , added_product.ITCid , products.pid , products.Userid , products.UnitPrice ,products.Discount , products.Description , products.Quantity , filename FROM added_product JOIN products ON (products.pid = added_product.pid AND added_product.ITCid = ? )' , [req.body.iCategory] , function(error , result){
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

});
app.post('/StoreProd' , function(req,res){
        var detailed_prod = new Array();
        connection.query('SELECT added_product.Pname , added_product.ITCid , products.Userid , products.pid , products.UnitPrice ,products.Discount , products.Description , products.Quantity  , products.filename FROM added_product LEFT JOIN products ON (products.pid = added_product.pid)' , function(error , result){
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
                            Userid : result[i].Userid,
                            pid : result[i].pid,
                            Pname : result[i].Pname,
                            UnitPrice: result[i].UnitPrice,
                            Discount: result[i].Discount,
                            Description: result[i].Description,
                            Quantity : result[i].Quantity ,
                            Category : result[i].ITCid ,
                            filename : result[i].filename
                        }
                        detailed_prod.push(result[i]);
                    }
                }
            res.send(detailed_prod);
            }
    });
});

app.post('/bySearchProduct' ,function(req , res){
    connection.query('SELECT * FROM products where pid = ?' ,[req.body.searchStr] ,function(error , result){
        if(error)
            res.status(501).send("error while searching");
        else
            res.status(200).send(result);
    });
});

app.post('/deleteProduct' , function(req , res){
    var cope = req.body;
    connection.query('SELECT pid from added_product where Pname = ?',[cope.Pname] , function(error, Pid_result){
        connection.query('DELETE FROM products where Userid = ? AND pid =? AND Description = ?',[cope.U_id , Pid_result[0].pid, cope.Description]  , function(error, result){
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
        connection.query('UPDATE products SET UnitPrice = ? , Discount= ? , Quantity= ? , Date_Time = ?  , Description=? WHERE Userid = ? AND pid = ? AND filename=?',[cope.UnitPrice, cope.Discount , cope.Quantity , cope.Date_Time , cope.Description , cope.U_id  , Pid_result[0].pid , cope.filename] , function(err,result)
        {
            console.log(result);
            if(err)
                 res.status(500).send("error in updating");
            else
                res.status(200).send('Updated successfully');
        });
    });
});
app.post('/shopadd', upload.any() , function(req,res){
    console.log(req.body);
    if(req.files){
        req.files.forEach(function(file){
            console.log(file);
            var filename = req.body.Email + "-" + file.originalname;
            fs.rename(file.path , 'uploads/' + filename , function(err ){
                if(err) throw err;
                var cope = {
                    Userid :'',
                    Fname : req.body.Fname,
                    Lname : req.body.Lname,
                    Store_Name: req.body.Store_Name,
                    Email : req.body.Email,
                    PhoneNo : req.body.PhoneNo,
                    Password : req.body.Password,
                    Address : req.body.Address ,
                    Home_Delivery: req.body.Home_Delivery,
                    Selectid : req.body.Home_Delivery,
                    Latitude: req.body.Latitude,
                    Longitude: req.body.Longitude,
                    filename : filename
                }
                console.log(cope);
                var salt = bcrypt.genSaltSync(10);
                cope.Password = bcrypt.hashSync(cope.Password , salt);
                console.log("file uploded");
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
        });
    }
});

app.post('/custadd', function(req,res){
    var cope = req.body;
    var salt = bcrypt.genSaltSync(10);
    cope.Password = bcrypt.hashSync(cope.Password , salt);
    var query = connection.query('insert into users set ?', cope, function(err, result) {
        if (err){
            console.log("Error detected");
            res.status(500).send("error");
        }
        else  {
            console.log("done");
            res.send("registered successfully");
        }
    });
});

app.post('/addProducts', upload.any() , function(req,res){
    var cope = req.body;
    cope.Date_Time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var pname = cope.Pname;
    var s = req.headers.authorization.toString().split(" ");
    //console.log(s[0]);
    cope.Userid = parseInt(s[0]);
    if(req.files){
        req.files.forEach(function(file){
            var filename = s[0] + "-" + file.originalname;
            fs.rename(file.path , 'uploads/' + filename , function(err ){
                if(err) throw err;
                console.log("file uploded");
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
                                Date_Time : cope.Date_Time,
                                filename : filename
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
                                connection.query('SELECT pid from added_product where Pname = ?' , [pname ] , function(error , result){
                                    var product =
                                    {
                                        pid :result[0].pid,
                                        Userid : cope.Userid,
                                        UnitPrice : cope.UnitPrice,
                                        Discount : cope.Discount,
                                        Quantity : cope.Quantity,
                                        Description: cope.Description,
                                        Date_Time : cope.Date_Time,
                                        filename : filename
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
        });
    }
});
app.get('/showProduct' , function(req,res){
    var product = new Array();
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'not authentiated'
        });
    }
    var s = req.headers.authorization.toString().split(" ");
    connection.query('SELECT added_product.Pname , products.Userid , products.pid , products.UnitPrice, products.Discount , products.Quantity , products.Description  , products.filename FROM added_product LEFT JOIN products ON (products.pid = added_product.pid)' , function(error , result){
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
function createToken(email, res){
    var payload =  {
        sub : email
    }
    var token = jwt.encode(payload , "hello");
    console.log('in create token');
    var query = connection.query('SELECT Userid , Selectid from users where Email = ?' , [email] , function(error , result){
        res.send({
            username: email ,
            useridd: result[0].Userid ,
            Selectid: result[0].Selectid ,
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