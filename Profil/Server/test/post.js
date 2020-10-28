/* eslint-disable quote-props */
/* eslint-disable quotes */

// You must install those dependencies in dev mode : chai,chai-http,mocha,supertest

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// ASSERTION STYLE
chai.should();

chai.use(chaiHttp);

describe('Help recover API', () => {
  /**
     * Test the GET route
     */
  describe("GET /users", () => {
    it("It should Get all the users", (done) => {
      chai.request(server)
        .get('/users')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should not Get all the users", (done) => {
      chai.request(server)
        .get('/user')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
      * Test the GET by id route
      */
  describe("GET /users/:id", () => {
    it("It should Get a user by ID", (done) => {
      const userId = 31;
      chai.request(server)
        .get(`/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });

    it("It should not Get a user by ID", (done) => {
      const userId = 123;
      chai.request(server)
        .get(`/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
  /**
     * Test the put route for updating data
     */
  describe("PUT /updateData", () => {
    it("It should update the data of one user ", (done) => {
      const data = {
        "Nom": "Tchoupe",
        "Prenom": "Patrick",
        "CodePostal": "1000",
        "Adresse": "Bruxelles",
        "userId": 11,
        "Photo": null,
      };
      chai.request(server)
        .put('/updateData')
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
});
