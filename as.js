var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
abc = bcrypt.hashSync("1234" , salt);
console.log(abc);
//pass = "$2a$10$0RgkyOVAIOMA4Z.cmS201u1z4jovy6K1z5tqEyAl6hH";

//console.log(pass);

                console.log(bcrypt.compareSync("1234" , "$2a$10$vMCqBj.AYw1hRRVseHjC3uMXdKClqNDqgagQ6Wx3Xbg"));
