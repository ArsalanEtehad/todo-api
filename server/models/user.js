var {mongoose} = require('../db/mongoose')

var User = mongoose.model('User',{
  name: {
    type: String
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})


module.exports={
  User
}
