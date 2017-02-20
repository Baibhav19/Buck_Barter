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
    database: 'buck'
});
connection.connect(function(error){
    if(!!error){
        console.log("Error");
    } 
    else{
        console.log("connection established");
    }
});

app.post('/shopadd', function(req,res){
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
	res.json({message : "completed"});
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
	res.json({message : "completed"});
});

app.post('/additem', function(req,res){
	var cope = req.body;
	function fetchID(callback) {
		connection.query('SELECT ITCid FROM itemcategory WHERE ITCtype = ?', cope.ITCtype, function(err, rows) {
			if (err) {
				callback(err, null);
			} else 
			callback(null, rows[0].ITCid);
		});
	}
	var user_id;
	fetchID(function(err, content) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		} else {
			user_id = content;
            console.log(user_id); //undefined
        }
    });
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
app.listen(8091);