require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const {ObjectID} = require('mongodb')
var {authenticate} = require('./middleware/authenticate')
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User}= require('./models/user')
const hbs = require('hbs') //handle bars
var app = express()
var session = require('express-session')
var cookieParser = require('cookie-parser')
app.use(cookieParser())


const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


hbs.registerPartials(__dirname + '/../views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase() + '!!';
})



// app.use(express.static(__dirname + '/public',options))
//
// app.use((req, res, next)=>{
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} , ${req.url}, ${req}`
//   console.log(log);
//   fs.appendFile('server.log',log + '\n',(err)=>{
//     console.log('unable to append the log to the file');
//   })
//   next()
// })


//========================USER ROUTERS============================

//----------------------GET /-------------------------
app.get('/', (req, res)=> {
  res.render('home.hbs',{
    pageTitle: 'ToDooz',
    pContent: 'Just a Welcome msg'
  })
})

//----------------------GET /users/login-------------------------
app.get('/users/login',(req, res)=>{
  res.render('login.hbs',{
    pageTitle: 'LOGIN PAGE',
    pContent: 'sample content'
  })
});

//----------------------POST /users/login-------------------------
app.post('/users/login',(req, res)=>{
  var body = _.pick(req.body, ['email','password']);
  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
    res.header('x-auth', token).cookie('auth', token);
    res.redirect('/users/me');
  }).catch((e)=>{
    res.status(400).send();
  })
}).catch((e)=>{
  res.status(401).redirect('/users/login')
})
});

//--------------------------GET /users/me----------------------------
app.get('/users/me', authenticate,(req,res)=>{
  res.render('me.hbs',{
    pageTitle: `Hello ${req.user.email}`,
    pContent: `your token will expire in 1 hour`
  })
  // res.render('me.hbs',{
  //   pageTitle: `Hello ${req.user.email}`,
  //   pContent: `${todoss}`
  // })
  //res.send(req.user);
})


//-------------------DELETE /users/me/token-------------------------

//deleting the token of currently logged in user.
app.delete('/users/me/token', authenticate, (req, res)=>{

  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((e)=>{
    res.status(400).send();
  })
});


//------------------------POST /users------------------------------
app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((err)=>{
    res.status(400).send(err)
  })
});



//--------------------------GET /users------------------------------
app.get('/users',(req,res)=>{
  User.find().then((users)=>{
    res.send(users)
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

//------------------------DELETE /users/:id------------------------------
app.delete('/users/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  User.findByIdAndDelete(id).then((user)=>{
    if(!user){
      return res.status(404).send();
    }
    res.send({user});
  }).catch((err)=>{
    res.status(400).send()
  })
});

//--------------------------GET /users/:id------------------------------
app.get('/users/:id',(req,res)=>{
  var id = req.params.id
  //validating the id in url
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  User.findById(id).then((user)=>{
    if(!user){
      return res.status(404).send()
    }
    res.send({user})  //sending todo as object: {todo}  //res.status(200).send(todo.text)
  }).catch((err)=>{
    res.status(400).send()
  })
});

//========================TODO ROUTERS============================
//-----------------------POST /todos------------------------------
//  Post /Todo    common URL to post Todo
//  Get /Todo     common URL to get the todos or : Get /todo/dsahfjabgjah   for an individual toro
app.post('/todos', authenticate,  (req, res)=>{
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })
  todo.save().then((doc)=>{
    res.redirect('/users/me');
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

//------------------------GET /todos------------------------------
app.get('/todos',authenticate, (req,res)=>{
  Todo.find({
    _creator: req.user._id
  }).then((todos)=>{
    res.send({todos})
  }).catch((err)=>{
    res.status(400).send(err)
  })
});

//------------------------GET /todos/:id------------------------------
app.get('/todos/:id',authenticate, (req,res)=>{
  var id = req.params.id
  //validating the id in url
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  //searching in todo db by the id
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo})  //sending todo as object: {todo}  //res.status(200).send(todo.text)
  }).catch((err)=>{
    res.status(400).send()
  })
});

//------------------------DELETE /todos/:id------------------------------
app.delete('/todos/:id',authenticate ,(req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findOneAndDelete({
    _id: id,
    _creator: req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err)=>{
    res.status(400).send()
  })
});

//------------------------PATCH /todos/:id------------------------------
app.patch('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findOneAndUpdate({_id:id, _creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err)=>{
    res.status(400).send()
  })
});





app.listen(port,()=>{
  console.log(`Started up at ${port} ...`)
})

module.exports={app}
