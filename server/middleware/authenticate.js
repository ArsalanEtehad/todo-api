var {User}= require('./../models/user')

//midleware
var authenticate = (req, res, next)=>{
  // console.log(req.cookies);
  var token = req.cookies.auth;

  // var token = req.header('x-auth'); //in line 109 we send the header('x-auth') by res and now we taking it to use it

  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    // res.send(user);
    req.user = user;
    req.token = token;
    next();

  }).catch((err)=>{
    res.status(401).redirect('/users/login') //401 status: Unauthorized: authentication is required/
  })
}

module.exports={authenticate}
