const mongoose = require("mongoose");

//users schema
const schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dept: String,
    doctor: String,
    date: String,
    msg: String
});


const Appoint = mongoose.model("Appointment", schema);

module.exports = Appoint;