//https://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');

//grasping Promise of global library to mongoose...
mongoose.Promise = global.Promise
//Asynch connection
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports={
  mongoose: mongoose
}