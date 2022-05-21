const app = require("../index");
const chai = require("chai");
var should=chai.should(); 
const chaiHttp = require("chai-http");
const { send } = require("express/lib/response");



const { expect } = chai;
chai.use(chaiHttp);
describe("GET /jobs", () => {
 it("it should get all jobs", done => {
  
chai
 .request(app)
.get("/jobs")
.end((err, res) => {
expect(res).to.have.status(200);

 done();
});
});});
describe("GET /job", () => {
    it("it should get all jobs", done => {
   chai
    .request(app)
   .get("/jobs")
   .end((err, res) => {
   expect(res).to.have.status(200);
   
    done();
   });
   });});

describe("GET /jobs/:id", () => {
    it("it should get a job with the given id", done => {
        const JobID=1
   chai
    .request(app)
   .get("/jobs/"+JobID)
   .end((err, res) => {
    res.body.should.have.property('id');
    res.body.should.have.property('title');
    res.body.should.have.property('type');
    res.body.should.have.property('company');
    res.body.should.have.property('email');
    res.body.should.have.property('phone');
    res.body.should.have.property('address');
    

   expect(res).to.have.status(200);
   
    done();
   });
   });


});

describe("POST /jobs", () => {
    it("it should give an error of validation of post a new job", done => {
        const job={
            

            "title": "front-end",
            "type": "full-time",
            "company": "",
            "email": "comp@gmail.com",
            "phone": "+213254354354",
            "address": "Oran"       
          }
   chai
    .request(app)
   .post("/jobs")
   .send(job)
  
   .end((err, res) => {
   expect(res).to.have.status(422);
   
    done();
   });
   });


});


describe("PUT /jobs/:id", () => {
    
    it("it should update a job with the given id", done => {
        const JobID=1
        const job={
            
            "title": "front-end",
            "type": "full-time",
            "company": "",
            "email": "comp@gmail.com",
            "phone": "+213254354354",
            "address": "Oran" 
          }
   chai
    .request(app)
   .put("/jobs/"+jobID)
   .send({
            
            "title": "front-end",
            "type": "full-time",
            "company": "",
            "email": "comp@gmail.com",
            "phone": "+213254354354",
            "address": "Oran" 
  })
   .end((err, res) => {
   expect(res).to.have.status(200);
   
    done();
   });
   });


});

describe("DELETE /jobs/:id", () => {
    it("it should delete a job with the given id", done => {
        const JobID=1;
   chai
    .request(app)
   .delete("/jobs/"+JobID)
   .end((err, res) => {
   expect(res).to.have.status(200);
   
    done();
   });
   });


});



