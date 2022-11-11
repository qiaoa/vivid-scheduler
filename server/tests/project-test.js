"use strict";

const should = require("should");
const assert = require("assert");
const request = require("superagent");
// const harness = require("./harness");
const data = require("./data");
// let config = {};
let projects = data.projects;
const envConfig = require("simple-env-config");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "test";

let config = {
  url: `http://localhost:8000/api/`,
};

describe("Project:", () => {
  let primaryAgent = request.agent(),
    anonAgent = request.agent();
  before((done) => {
    // envConfig("./config/config.json", env).then((conf) => {
    //   config = conf;
    //   config.url = `http://localhost:8000/api/`;
    //   harness.setup(config.mongodb, done);
    // });
  });
  after((done) => {
    // harness.shutdown(done);
  });

  describe("Read empty:", () => {
    it("Success - empty", (done) => {
      primaryAgent.get(`${config.url}projects`).end((err, res) => {
        res.status.should.equal(200);
        res.body.should.equal([]);
        done();
      });
    });
  });

  describe("Create:", () => {
    it("Failure - missing required title", (done) => {
      primaryAgent
        .post(`${config.url}project`)
        .send({
          powner: projects.primary.powner,
          ptype: projects.primary.ptype,
          startDate: projects.primary.startDate,
          description: projects.primary.description,
          completed: projects.primary.completed,
          url: projects.primary.url,
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.error.should.equal('"pname" is required');
          done();
        });
    });

    it("Failure - missing required start date", (done) => {
      primaryAgent
        .post(`${config.url}project`)
        .send({
          pname: projects.primary.pname,
          powner: projects.primary.powner,
          ptype: projects.primary.ptype,
          description: projects.primary.description,
          completed: projects.primary.completed,
          url: projects.primary.url,
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.error.should.equal('"startDate" is required');
          done();
        });
    });

    it("Success", (done) => {
      primaryAgent
        .post(`${config.url}project`)
        .send(projects.primary)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.pname.should.equal(projects.primary.pname);
          // Save the project info
          setTimeout(done, 100);
        });
    });

    it("Failure - already used pname", (done) => {
      primaryAgent
        .post(`${config.url}projects`)
        .send(projects.primary)
        .end((err, res) => {
          res.status.should.equal(400);
          done();
        });
    });
  });

  describe("Read:", () => {
    it("Success - empty", (done) => {
      primaryAgent.get("http://localhost:8000/api/projects").end((err, res) => {
        res.status.should.equal(200);
        res.body.pname.should.equal(users.primary.pname);
        res.body.powner.should.equal(users.primary.powner);
        res.body.ptype.should.equal(users.primary.ptype);
        res.body.checkpoints.should.be.instanceof(Array).and.have.lengthOf(5);
        res.body.description.should.equal(users.primary.description);
        res.body.completed.should.equal(users.primary.completed);
        res.body.url.should.equal(users.primary.url);
        done();
      });
    });
  });
});
