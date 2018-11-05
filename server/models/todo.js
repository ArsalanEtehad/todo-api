var mongoose = require('mongoose');

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
  }
})


module.exports={
  Todo
}
