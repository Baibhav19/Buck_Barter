var express = require('express');
var app = express();
var login = require('./routes/login');
var addProducts = require('./routes/addProducts');
var deleteProduct = require('./routes/deleteProduct');
var showProduct = require('./routes/showProduct');
var updateProduct = require('./routes/updateProduct');
var getUsers = require('./routes/getUsers');
var storeProd = require('./routes/storeProd');
var custadd = require('./routes/custadd');
var shopadd = require('./routes/shopadd');
var prodByCat = require('./routes/productsByCategory');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(express.static(__dirname + '/'))
app.use(bodyParser.json());
app.use(passport.initialize());
passport.serializeUser(function(user , done){
    done(null , user.id);
})

    app.use('/login',login);
    app.use('/addProducts',addProducts);
    app.use('/deleteProduct', deleteProduct);
    app.use('/showProduct' , showProduct);
    app.use('/updateProduct' , updateProduct);
    app.use('/getUsers' , getUsers);
    app.use('/showProduct' , showProduct);
    app.use('/productsByCategory' , prodByCat);
    app.use('/custadd' , custadd);
    app.use('/shopadd' , shopadd);
    app.use('/storeProd' , storeProd);

    app.listen(8091);
