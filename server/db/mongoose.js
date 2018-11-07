//https://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');

//grasping Promise of global library to mongoose...
mongoose.Promise = global.Promise
//Asynch connection
mongoose.connect(process.env.MONGODB_URI);


module.exports={
  mongoose: mongoose
}
