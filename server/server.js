const express = require('express')
const bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User}= require('./models/user')

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
})


app.listen(3000,()=>{
  console.log('Started on port 3000 ...')
})


module.exports={app}
