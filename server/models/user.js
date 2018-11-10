const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')


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

var User = mongoose.model('User',UserSchema)


module.exports={
  User
}
