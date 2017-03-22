var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buck1'
});
exports.getConnection = function(callback){
    pool.getConnection(function(err , connection){
        callback(err , connection);
    });
};

// connection.connect(function(error){
//     if(!!error){
//         console.log("Error");
//     }
//     else{
//         console.log("connection established");
//     }
// });