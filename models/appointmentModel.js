const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const AppointmentSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  date: {
    type: [Date, 'Date invalid'], 
    required: [true, 'Date required for appointment.'],
    trim: true
  },
  tutor: {
    type: [mongoose.Schema.Types.ObjectId, 'Not object id'], 
    ref: 'User', 
    required: [true, 'Tutor required for appointment.'],
    trim: true
  },
  student: {
    type: [mongoose.Schema.Types.ObjectId, 'Not the right type, not a user'], 
    ref: ['User', 'Not the right type, not a user'],
    trim: true
  },
  course: {
    type: String, 
    required: [true, 'Course name is required for appointment.'],
    trim: true
  },
  attendees: {
    type: Number, 
    default: 1,
    minimum: [1, 'Appointments require at least one attendee slot.'],
    trim: true
  }
})

const Appointment = mongoose.model('appointment', AppointmentSchema)

module.exports = Appointment