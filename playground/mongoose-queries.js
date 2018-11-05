const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectId} = require('mongodb')

//no need for new ObjectId(...). mongoose take care of it
var tid = '5bdfc746255f5dcf4a752a07'
var uid = '5bdfa04c60e6ffc84259c820'
if(!ObjectId.isValid(tid)){
  return console.log('tID not valid')
}

Todo.findById(tid).then((todo)=>{
  if(!todo){
    return console.log('Todo not found')
  }
  console.log('todo: ', todo)
}).catch((err)=>{
  console.log(err)
})

if(!ObjectId.isValid(uid)){
  return console.log('uID not valid')
}


User.findById(uid).then((user)=>{
  if(!user){
    return console.log('User not found')
  }
  console.log(user)
}).catch((err)=>{
  console.log(err)
})

// //all three find... are similar for this case. but best is findById if we looking for 1 by id.
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   if(todos.length === 0){
//     return console.log('ID not found')
//   }
//   console.log('todos: ', todos)
// }).catch((err)=>{
//   console.log('unable to fetch todo from db')
// })
//
// Todo.findOne({
//   _id: id
// }).then((todos)=>{
//   if(!todos){
//     return console.log('ID not found')
//   }
//   console.log('todo: ', todos)
// }).catch((err)=>{
//   console.log('unable to fetch todo from db')
// })
