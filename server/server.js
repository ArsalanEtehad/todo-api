//https://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');

//grasping Promise of global library to mongoose...
mongoose.Promise = global.Promise
//Asynch connection
mongoose.connect('mongodb://localhost:27017/TodoApp');

//creating a mongoose model with fields and types of them
var Todo = mongoose.model('Todo', {
  text:{
    type: String
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
  text: 'Cook dinner'
})

//saving the created Todo document to the mongodb [database]
newTodo.save().then((doc)=>{
  console.log('successfully saved newTodo: ',doc)
},(e)=>{
  console.log('Unable to save todo')
})

//----------

var otherTodo = new Todo({
  text: 'walk the dog',
  completed: true,
  completedAt: 123
})

otherTodo.save().then((doc)=>{
  console.log(JSON.stringify(doc,undefined,2))
}).catch((err)=>{
  console.log('Unable to save otherTodo: ',err)
})
