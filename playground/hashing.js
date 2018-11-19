const {SHA256} = require("crypto-js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'Password@';
var hashedPassword;

bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(password, salt, (err, hash)=> {
      hashedPassword = hash.toString();
      // console.log('saxlt: ',salt,'hash:          ', hash);
    });
});

setTimeout(()=>{
  console.log('hashedPassword:',hashedPassword)



  bcrypt.compare(password, hashedPassword, (err, res)=> {
      console.log(res)
    } );
},3000);

// bcrypt.compare("B4c0/\/", hash, (err, res)=> {
//     console.log(`"B4c0/\/" is ${res}`)
// });
// bcrypt.compare("not_bacon", hash, (err, res)=> {
//   console.log(`"not_bacon" is ${res}`)
// });
//
// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//   console.log(`"B4c0/\/" is ${res}`)
// });

// var data = {
//  id :4
// }

// var token = jwt.sign(data, '123salt')
// console.log('signed token with jwt: ',token)
// var decoded = jwt.verify(token, '123salt')
// console.log('decoded token with jwt: ',decoded)

// var text = 'I am user number 3';
// var hash = SHA256(text).toString()
//
// console.log(text)
// console.log(hash)
//
// var data = {
//  id :4
// }
//
// var token={
//   data,
//   hash: SHA256(JSON.stringify(data)+ 'Salt baby.. ,SALT!!!').toString()
// }
//
// //***************************
// ///Simulating MAN IN THE MIDDLE ATTACK:
// token.data.id = 0;
// token.hash = SHA256(JSON.stringify(token.data)).toString;
// //***************************
//
// var resultHash = SHA256(JSON.stringify(token.data)+ 'Salt baby.. ,SALT!!!').toString();
//
// if(resultHash === token.hash){
//   console.log('SECURE - Data was not changed.');
// }else{
//   console.log('DATA is changed! DO NOT TRUST')
// }
