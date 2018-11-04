const {MongoClient, ObjectID} = require('mongodb')  //just the alternative way of casting these 2 - deconstructioning

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err){
      return console.log('Unable to connect to MongoDb server') //either return or put the rest of the code in an else block.
    }
    console.log('Connected to MongoDb server.')
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((results)=>{
    //   console.log(results)
    // }).catch((err)=>{
    //   console.log(err)
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //   console.log(result)
    // }).catch((err)=>{
    //   console.log(err)
    // })

    // deleteMany
    // db.collection('Users').deleteMany({name: 'Arsalan'})

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({
      _id: new ObjectID('5bde5ae18196acb56c6dd6b6')
    }).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
    })

    // client.close()
})
