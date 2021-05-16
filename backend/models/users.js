var mongoose = require('mongoose');


const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  }
});


var Users = mongoose.model('users', usersSchema);
module.exports = Users;
