//https://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');

//grasping Promise of global library to mongoose...
mongoose.Promise = global.Promise
//Asynch connection
mongoose.connect('mongodb://localhost:27017/TodoApp');

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

//creating a document of Todo model [mongoose model]
var newTodo = new Todo({
  text: 'Feed the Cat'
})

//saving the created Todo document to the mongodb [database]
newTodo.save().then((doc)=>{
  console.log('successfully saved newTodo: ',doc)
},(e)=>{
  console.log('Unable to save todo')
})

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

var user1 = new User({
  name: 'John',
  email: ' johndoe4@gmail.com'
})

user1.save().then((res)=>{
  console.log('successfully added ',res)
}).catch((err)=>{
  console.log('Failed to add user: ', err)
})
