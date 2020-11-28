

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;

// Create our test case, we need to inform the description
describe("help recover api test",function(){
  // the it function do the test, in this case, the endpoint /cards, that should return 100 cards max
  it("a room for user 1 and 2 should exist",function(done){
    request.get(
      {
        url : 'http://localhost:3000/chat/1/2'
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        if( _body[0].should.have.property('roomId') ){
          expect(_body[0].roomId).to.have.lengthOf.at.most(3);
        }

        done(); 
      }
    );
  });

  it("Should receive the card 'Heedless One' ",function(done){
    request.get(
      {
        url : 'http://localhost:3000/contacts/garcia@gmail.com' 
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        if( _body[0].should.have.property('Nom') ){
            console.log(_body)
          if(_body[0].should.have.property('Prenom')){
            expect(_body[0].Prenom).to.equal('alex');
          }
         
         
        }
         

        done(); 
      }
    );
  });
});