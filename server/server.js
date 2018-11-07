require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User}= require('./models/user')

var app = express()
const port = process.env.PORT;

app.use(bodyParser.json());

//  Post /Todo    common URL to post Todo
//  Get /Todo     common URL to get the todos or : Get /todo/dsahfjabgjah   for an individual toro
app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc)=>{
    res.send({doc})
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
});

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
    res.send({todo})  //sending todo as object: {todo}  //res.status(200).send(todo.text)
  }).catch((err)=>{
    res.status(400).send()
  })
});


app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndDelete(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err)=>{
    res.status(400).send()
  })
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err)=>{
    res.status(400).send()
  })
});


app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email','password']);

  var user = new User(body)

  user.save().then((doc)=>{
    res.send({doc})
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

app.get('/users',(req,res)=>{
  User.find().then((users)=>{
    res.send({users})
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

// app.delete('/users/:id', (req, res)=>{
//   var id = req.params.id;
//   if(!ObjectID.isValid(id)){
//     return res.status(404).send();
//   }
//   User.findByIdAndDelete(id).then((user)=>{
//     if(!user){
//       return res.status(404).send();
//     }
//     res.send({user});
//   }).catch((err)=>{
//     res.status(400).send()
//   })
// });

// app.get('/users/:id',(req,res)=>{
//   var id = req.params.id
//   //validating the id in url
//   if(!ObjectID.isValid(id)){
//     return res.status(404).send()
//   }
//   //searching in todo db by the id
//   User.findById(id).then((user)=>{
//     if(!user){
//       return res.status(404).send()
//     }
//     res.send({user})  //sending todo as object: {todo}  //res.status(200).send(todo.text)
//   }).catch((err)=>{
//     res.status(400).send()
//   })
// });





app.listen(port,()=>{
  console.log(`Started up at ${port} ...`)
})

module.exports={app}
