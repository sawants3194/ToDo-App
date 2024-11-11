var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  

},
  { 
    timestamps: true
  }
);




module.exports = mongoose.model("User", userSchema);

