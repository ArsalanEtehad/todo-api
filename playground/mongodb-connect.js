const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')
    db.close()
})
