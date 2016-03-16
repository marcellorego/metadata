var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Object', function(){
  it('creates new object and responds with json success message', function(done){
    request(app)
    .post('/api/object')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"object": {}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Objects', function(){
  it('responds with a list of object items in JSON', function(done){
    request(app)
    .get('/api/objects')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Object by ID', function(){
  it('responds with a single object item in JSON', function(done){
    request(app)
    .get('/api/object/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Object by ID', function(){
  it('updates object item in return JSON', function(done){
    request(app)
    .put('/api/object/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "object": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Object by ID', function(){
  it('should delete object and return 200 status code', function(done){
    request(app)
    .del('/api/object/'+ _id) 
    .expect(204, done);
  });
});