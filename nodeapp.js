var express = require('express'); 
var mysql = require('mysql');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
app.use(express.static(__dirname + '/'))
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'custom'
});
connection.connect(function(error){
    if(!!error){
        console.log("Error");
    } 
    else{
        console.log("connection established");
    }
});
var name = "baibhav";
app.get('/showProduct' , function(req,res){
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'not authentiated , sign in first'
        });
    }
    res.send(name);
});
function createToken(cope , res){
    var payload =  {
        sub : cope.email
    }
    var token = jwt.encode(payload , "hello");
    console.log('in create token');
    res.send({
        token : token
    });
}
app.post('/login' , function(req,res){
    var cope = req.body;
    if(cope.email === 'baibhav19@outlook.com' && cope.password === '123'){
        createToken(cope , res);
    }
    else{
        res.status(401).send({
            message:'Invalid email or password'
        });
    }
});
app.post('/contact', function(req,res,next){
    var cope = req.body;
    var salt = bcrypt.genSaltSync(10);
    cope.password = bcrypt.hashSync(cope.password , salt);
    var query = connection.query('insert into customer set ?', cope, function(err, result) {
        if (err){
            if (err.code === 'ER_DUP_ENTRY'){
                g = true;
                console.log("mylog : fb ER_DUP_ENTRY detected");
                res.status(409).send(g);
            }
            else{
                console.log(err);
            }
        }  
        else {
            console.log("done");
            createToken(cope , res);
        }
    });
  //res.json({message : "completed"});
});
app.post('/contact_shop', function(req,res){
  var cope = req.body;
  console.log(cope);
  var query = connection.query('insert into shopkeeper set ?', cope, function(err, result) {
    if (err){
      if (err.code === 'ER_DUP_ENTRY') {
        console.log("mylog : fb ER_DUP_ENTRY detected");
    }
} 
else  {
  console.log("done");
}
});
  res.json({message : "completed"});
});
app.listen(8091);