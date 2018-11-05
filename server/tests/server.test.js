const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

//to make sure we start with 0 todos in db
beforeEach((done)=>{
  Todo.remove({}).then(()=>done())
})

describe('Post /todos', ()=>{
  it('shoude create a new todo',(done)=>{ //done because it's async
    var text = "test todo text"

    //testing POST request using supertest:
    request(app)
    .post('/todos')
    .send({text: text})
    .expect(200)

    .expect((res)=>{
      expect(res.body.text).toBe(text)
    })

    .end((err, res)=>{
      if (err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(1) //because at line 9 we remove all the documents in db. so it's always 1
        expect(todos[0].text).toBe(text)
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
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  })
})
