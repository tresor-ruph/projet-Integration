// You must install those dependencies in dev mode : chai,chai-http,mocha,supertest

const chai = require('chai');
const request = require("request");
const { get } = require('request');
const expect = chai.expect;


describe("help recover api test",function(){
    
    it("recupere les demandes",function(done){
      request.get(
        {
          url : 'http://localhost:3000/demande/all/4',
          method: get,
        },
        function(error, response, body){  
          expect(response.statusCode).to.equal(200);
          done(); 
        }
      );
    });
});  