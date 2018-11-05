const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')


//no need for new ObjectId(...). mongoose take care of it
var id = '5bdfc746255f5dcf4a752a07'



Todo.findById(id).then((todos)=>{
  if(!todos){
    return console.log('ID not found')
  }
  console.log('todo: ', todos)
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
