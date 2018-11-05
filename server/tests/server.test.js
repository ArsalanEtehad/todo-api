const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {ObjectID} = require('mongodb')

const todo_list_for_test = [
  {
    _id: new ObjectID(),
    text: 'todo text no 1'
  },{
    _id: new ObjectID(),
    text: 'todo text no 2'
  },{
    _id: new ObjectID(),
    text: 'todo text no 3'
  }
];

//to make sure we start with 0 todos in db
//it will be revoked BEFORE EACH it() test
// beforeEach((done)=>{
//   Todo.remove({}).then(()=>done())
// })

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todo_list_for_test)
  }).then(()=>done())
})


describe('Post /todos', ()=>{
  it('shoude create a new todo',(done)=>{ //done because it's async
    var text = "test POST todo text";

    //testing POST request using supertest:
    request(app)
    .post('/todos')
    .send({text: text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.doc.text).toBe(text)
    })
    .end((err, res)=>{
      if (err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(4) //because at line 9 we remove all the documents in db. so it's always 1
        expect(todos[3].text).toBe(text)
        done()
      }).catch((err)=>{
        done(err);
      })
    })
  })

  it('should not create todo with invalid data', (done)=>{
    var text = ""
    request(app)
    .post('/todos')
    .send({text}) //or ({text: text}) I just used ES6 notation to make it simple
    .expect(400)
    .end((err, res)=> {
      if (err) return done(err);
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(3) //because at line 9 we remove all the documents in db. so it's always 1
        done()
      }).catch((err)=>{
        done(err);
      })
    });
  })

  it('should not create todo without data', (done)=>{
    request(app)
    .post('/todos')
    .send({}) //or ({text: text}) I just used ES6 notation to make it simple
    .expect(400)
    .end((err, res)=>{
      if (err) return done(err);
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(3) //because at line 9 we remove all the documents in db. so it's always 1
        done()
      }).catch((err)=>{
        done(err);
      })
    });
  })

});


describe('Get /todos', ()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(3)
    })
    .end(done)
  })
})


describe('GET /todos/:id', ()=>{
  it('should return todo doc', (done)=>{
    request(app)
    .get(`/todos/${todo_list_for_test[2]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todo_list_for_test[2].text)
    })
    .end(done)
  })

  it('should return 404 if TODO not found ', (done)=>{
    var hexId = new ObjectID().toHexString()
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  })

  it('should return 404 for non-Object ID', (done)=>{
    request(app)
      .get(`/todos/${213}`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', ()=>{
  it('should delete todo doc',(done)=>{
    var hexId = todo_list_for_test[0]._id.toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toBeFalsy()
          done();
        }).catch((err)=>{
          done(err);
        })
      })
  })

  it('should return 404 if Todo not found', (done)=>{
    var hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if ObjectID is invalid',(done)=>{
    request(app)
      .delete(`/todos/${213}`)
      .expect(404)
      .end(done)
  })
})
