var mongoose = require('mongoose');
const {ObjectID} = require('mongodb')

//creating a mongoose model with fields and types of them
var Todo = mongoose.model('Todo', {
  text:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  },
  _creator:{
    required: true,
    type: ObjectID
  }
})


module.exports={
  Todo
}
