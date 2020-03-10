const mongoose = require('mongoose');
const crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
  uname: {type: String, required:true},
  email: {type: String, required: true},
  passHash: {type: String, required:true},
  salt: {type: String, required:true},
  courses: {type:[String], default:[]},
  isAdmin: {type:Boolean, default:false},
  joinDate: {type: Date, default:Date.now}
});

userSchema.methods.setPassword = function(password){ 
     this.salt = crypto.randomBytes(16).toString('hex'); 
     this.passHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
 }; 


 userSchema.methods.validPassword = function(password){ 
     let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
     return this.passHash === hash; 
 };

//export default mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);