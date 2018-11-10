const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value)=>{
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
})

//overriding the toJSON function to hide tokens and password to be shown to user
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject()  //takes the mangoose variable and convert it to an js object

  return _.pick(userObject, ['_id', 'email'])
}

//arrow functions don't bind the "this" keyword. so we just use reqular function here:
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString() , access}, 'secretSalt').toString();

  user.tokens = user.tokens.concat([{access, token}])

  return user.save().then(()=>{
    return token;
  });
}

UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{
      tokens:{token}
    }
  })
}

//.statics.y is a model model where as .methods.x is a instance method
UserSchema.statics.findByToken = function (token){
  var User = this; //notice it's User not user. as this is a model method not an instance method
  var decoded;
  try{
    decoded = jwt.verify(token, 'secretSalt');
  }catch(e){
    return new Promise((resolve, reject)=>{
      reject();//the "then" block on returns will never get called and it will invoked the catch part.
    })
  }
  return User.findOne({
    "_id": decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
}



UserSchema.statics.findByCredentials = function(email, password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, user.password, (err, res)=>{
        if(res){
          resolve(user);
        }else{
          reject();
        }
      })
    })
  })
}

// var schema = new Schema(..);
// schema.pre('save', function(next) {
//   // do stuff
//   next();
// });


//middleware PRE, runs before the action 'save'.
UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){

    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(user.password, salt, (err, hash)=> {
          user.password = hash;
          next();
        });
    });

  }else{
    next();
  }

});


var User = mongoose.model('User',UserSchema)


module.exports={
  User
}
