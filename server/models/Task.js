const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = Task;
