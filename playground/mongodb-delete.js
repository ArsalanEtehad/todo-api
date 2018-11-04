const {MongoClient, ObjectID} = require('mongodb')  //just the alternative way of casting these 2 - deconstructioning

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndDelete({text:'Eat lunch'}).then((docs)=>{
      console.log('deleted: ',docs)

    }).catch((err)=>{
      console.log(err)
    })
    // client.close()
})
