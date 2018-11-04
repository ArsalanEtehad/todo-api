// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')  //just the alternative way of casting these 2 - deconstructioning

//no need to create TodoApp database before trying to connect to it. It will be created if not exist.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')

    const db = client.db('TodoApp');

    // db.collection('Users').insertOne({
    //   name: 'Arsalan',
    //   age: 27,
    //   location: 'Sydney, Australia'
    // }, (err, result)=>{
    //   if(err){
    //     return console.log('Unable to insert Users', err)
    //   }
    //   console.log(result.ops)
    // })

    client.close()
})
