var express = require('express');
var mysql = require('mysql');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
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
    cope.Password = passwordHash.generate(cope.Password),
	// var salt = bcrypt.genSaltSync(10);
	// cope.Password = bcrypt.hashSync(cope.Password , salt);
	 connection.query('insert into users set ?', [cope], function(err, result) {
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
            Uid : cope.Uid,
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
            var id_product = connection.query('SELECT id from added_product where ITCid = ?',[added.ITCid] , function(error, result){
            console.log(result[0].id);
            var product =
            {
                pid :result[0].id,
                Uid : cope.Uid,
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
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'not authentiated , sign in first'
        });
    }
    res.send(name);
});
function createToken(cope , res){
    var payload =  {
        sub : cope
    }
    var token = jwt.encode(payload , "hello");
    console.log('in create token');
    res.send({
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