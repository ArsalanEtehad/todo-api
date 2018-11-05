const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User}= require('./models/user')
const {ObjectID} = require('mongodb')

var app = express()

app.use(bodyParser.json());

//  Post /Todo    common URL to post Todo
//  Get /Todo     common URL to get the todos or : Get /todo/dsahfjabgjah   for an individual toro
app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc)=>{
    res.status(200).send(doc)
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id
  //validating the id in url
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  //searching in todo db by the id
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.status(200).send({todo})  //sending todo as object: {todo}  //res.status(200).send(todo.text)
  }).catch((err)=>{
    res.status(400).send()
  })
})


app.listen(3000,()=>{
  console.log('Started on port 3000 ...')
})


module.exports={app}
