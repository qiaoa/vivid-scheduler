const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = new Schema({
  pname: { type: String, required: true, index: { unique: true } },
  powner : {type : String, default: ''},
  ptype : {type : String, default: ''},
  startDate: { type: Date, default: new Date() },
  checkpoints: [{title: String, date: Date}],
  description : {type : String, default: ''},
  completed : {type: String, default: ''},
  url: {type: String, default: ''}
});

module.exports = mongoose.model("Project", Project);
