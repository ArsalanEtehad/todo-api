const {MongoClient, ObjectID} = require('mongodb')  //just the alternative way of casting these 2 - deconstructioning

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')
    const db = client.db('TodoApp');

    // //the find().toArray() return the promise. so we use then...
    // db.collection('Todos').find({
    //   _id: new ObjectID('5bde669017335629aa1066dd')
    // }).toArray().then((docs)=>{
    //   console.log('Todos: ')
    //   console.log(JSON.stringify(docs,undefined,2))
    //
    // }).catch((err)=>{
    //   console.log('Unable to fetch todos',err)
    // })

    // //the find().toArray() return the promise. so we use then...
    // db.collection('Users').find().count().then((count)=>{
    //   console.log(`Users count:${count} `)
    //
    // }).catch((err)=>{
    //   console.log('Unable to fetch todos',err)
    // })


    db.collection('Users').find({name:'Arsalan'}).toArray().then((docs)=>{
      console.log(docs)
    }).catch((err)=>{
      console.log(err)
    });

    // client.close()
})
