var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Apimeta', function(){
  it('creates new apimeta and responds with json success message', function(done){
    request(app)
    .post('/api/apimeta')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"apimeta": {&#34;name&#34;:&#34;Wulfhere may have had an interest in the succession, as through his marriage to Eormenhild he was the uncle of Egbert&#39;s two sons, Eadric and Wihtred.&#34;,&#34;layout&#34;:&#34;It is susceptible to a range of parasites including Cryptosporidium, Giardia, tapeworms, blood parasites and external feather lice, and is also affected by other avian diseases.&#34;,&#34;objects&#34;:[&#34;Although heavily resisted, the whole territory of Hong Kong came in Japanese hands on 25 December 1941.&#34;,&#34;The mayor of Miami along with seven other politicians began a fund-raising campaign for medical needs and clothing, and coordinated the distribution of 69 kg (150 lb) of Rexall drugs.&#34;,&#34;\&#34; On 3 June he set off with Olga for the German spa town of Badenweiler in the Black Forest, from where he wrote outwardly jovial letters to his sister Masha describing the food and surroundings and assuring her and his mother that he was getting better.&#34;,&#34;5, but the official measurement was later revised to 6.&#34;,&#34;2 and 3.&#34;]}})
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

describe('GET List of Apimetas', function(){
  it('responds with a list of apimeta items in JSON', function(done){
    request(app)
    .get('/api/apimetas')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Apimeta by ID', function(){
  it('responds with a single apimeta item in JSON', function(done){
    request(app)
    .get('/api/apimeta/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Apimeta by ID', function(){
  it('updates apimeta item in return JSON', function(done){
    request(app)
    .put('/api/apimeta/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "apimeta": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Apimeta by ID', function(){
  it('should delete apimeta and return 200 status code', function(done){
    request(app)
    .del('/api/apimeta/'+ _id) 
    .expect(204, done);
  });
});