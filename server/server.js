var {mongoose} = require('./db/mongoose')

var {Todo} = require('./models/todo')
var {User}= require('./models/user')

var newTodo = new Todo({
  text: 'Feed the Cat'
})

newTodo.save().then((doc)=>{
  console.log('successfully saved newTodo: ',doc)
},(e)=>{
  console.log('Unable to save todo')
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
