const express = require("express");
const Joi = require("joi");
const { findOneAndUpdate } = require("./../models/project");
const router = express.Router();

// data models
const Project = require("./../models/project");

// fetch all project info
router.get("/projects", function (req, res) {
  Project.find(function (err, projects) {
    if (err) res.send(err);
    console.log(projects);
    res.status(200).send(projects); // return all projects in JSON format
  });
});

// fetch specific project info

// add checkpoints
const createCheckpoints = (startDate) => {
  console.log('startDate: ' + typeof startDate + ' ' + JSON.stringify(startDate));
  const numWeeks = 2;
  const titles = [
    "filming",
    "rough draft 1",
    "rough draft 2",
    "cover photo",
    "final draft",
  ];
  let checkpoints = [];
  titles.forEach((curTitle, i) => {
    const date = new Date(startDate);
    const temp = {
      title: curTitle,
      date: new Date(date.setDate(startDate.getDate() + numWeeks * 7 * i)),
    };
    checkpoints.push(temp);
  });
  return checkpoints;
};

// Create a new project
router.post("/project", async (req, res) => {
  console.log("beggining of post");
  // Schema for project info validation
  const schema = Joi.object({
    pname: Joi.string().required(),
    powner: Joi.string(),
    ptype: Joi.string(),
    startDate: Joi.date().required(),
    checkPoints: Joi.array(),
    description: Joi.string(),
    completed: Joi.string(),
    url: Joi.string(),
  });
  try {
    let data = await schema.validateAsync(req.body);
    // add checkpoints
    const checkpoints = createCheckpoints(data.startDate);
    data = { ...data, checkpoints: checkpoints };
    try {
      const project = new Project(data);
      await project.save();
      console.log(project);
      res.status(201).send({ pname: project.pname });
    } catch (err) {
      console.log(err.message);
      res.status(400).send({ error: err.message });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.details[0].message });
  }
});

// Update project
router.put('/project', function(req, res) {
  let data = req.body;
  console.log(data);
  curProject = Project.findOneAndUpdate({pname: data.pname}, {$set:{url:data.url, completed:'Yes'}}, function(err, doc){
    if(err){
      console.log("Something went wrong");
    }
  });
});

// Actually update a Project
router.put('/update-project', function(req, res) {
  
  const data = req.body;
  console.log('PUT update-project: ' + data);
  
  curProject = Project.findOneAndUpdate({pname: data.pname}, {$set:{
      powner:data.powner, 
      ptype:data.ptype,
      startDate:data.startDate,
      checkpoints:createCheckpoints(new Date(data.startDate)),
      description:data.description,
    }}, function(err, doc){
    if(err){
      console.log("Something went wrong - " + err);
    }
  });

  res.status(201).send({ pname: data.pname });

});

// Delete a Project
router.post('/delete-project', function(req, res) {
  const data = req.body;
  console.log('POST delete-project: ' + JSON.stringify(data));

  Project.deleteOne({pname: data.pname},
    function(err, doc) {
      if (err) {
        console.log('something went wrong - ' + err);
      }
    });
  res.status(201).send({pname: 'test', result: 'success'});
});

// Create a new admin
router.post("/login", async (req, res) => {
  // Schema for admin info validation
  const schema = Joi.object({
    password: Joi.string().required(),
  });
  try {
    let data = await schema.validateAsync(req.body);
    console.log(data);
    if (data.password === "sophia123") {
      return res.status(201).send({ user: "admin" });
    }
    return res.status(400).send({ error: "Password is incorrect" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.details[0].message });
  }
});

module.exports = router;
