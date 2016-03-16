var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Property', function(){
  it('creates new property and responds with json success message', function(done){
    request(app)
    .post('/api/property')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"property": {}})
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

describe('GET List of Propertys', function(){
  it('responds with a list of property items in JSON', function(done){
    request(app)
    .get('/api/propertys')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Property by ID', function(){
  it('responds with a single property item in JSON', function(done){
    request(app)
    .get('/api/property/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Property by ID', function(){
  it('updates property item in return JSON', function(done){
    request(app)
    .put('/api/property/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "property": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Property by ID', function(){
  it('should delete property and return 200 status code', function(done){
    request(app)
    .del('/api/property/'+ _id) 
    .expect(204, done);
  });
});