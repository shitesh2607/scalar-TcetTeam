const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");



//users schema
const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// schema.plugin(passportLocalMongoose);
// schema.plugin(findOrCreate);

const User = mongoose.model("User", schema);

module.exports = User;

