const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectId} = require('mongodb')

var id = '5be004663cc13dd49395355c';
// Todo.findOneAndDelete({_id:id}).then((docs)=>{
//   console.log(docs)
// })

// Todo.findByIdAndDelete(id).then((docs)=>{
//   console.log(docs)
// })

Todo.findByIdAndDelete(id).then((docs)=>{
  console.log(docs)
})
