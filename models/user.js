const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  courses: [String],
  permissions: {type: String, default: 'student'}
})

const User = mongoose.model('user', UserSchema)

module.exports = User