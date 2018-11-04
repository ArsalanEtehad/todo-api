const {MongoClient, ObjectID} = require('mongodb')  //just the alternative way of casting these 2 - deconstructioning

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({text:'Wash the dishes'},{ $set: {completed: true}}, {returnOriginal: false}).then((res)=>{
        console.log(res);
    })
    // client.close()
})
