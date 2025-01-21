var mongoose = require("mongoose");


var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    enum: ['active', 'completed']
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'  
  },
}, 
  {
    timestamps: true
  }
);




module.exports = mongoose.model("Task", taskSchema);

