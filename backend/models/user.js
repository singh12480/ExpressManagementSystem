const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required:true },
    lastName : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type : String, required: true }
 });

 UserSchema.plugin(uniqueValidator);

 module.exports = mongoose.model("User", UserSchema);