var express = require('express'); 
var mysql = require('mysql');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
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
app.post('/contact', function(req,res){
  var cope = req.body;
  g = false;
  var query = connection.query('insert into customer set ?', cope, function(err, result) {
    if (err){
      if (err.code === 'ER_DUP_ENTRY'){
        g = true;
        console.log("mylog : fb ER_DUP_ENTRY detected");
        res.status(200).send(g);
      }
      else{
        console.log(err);
      }
    }  
    else {
      console.log(result);
      console.log("done");
    }
  });
  //res.send(g);
  //res.status(404).jsonp(g);
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