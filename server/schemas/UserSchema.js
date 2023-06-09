const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  uname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passHash: { type: String, required: true },
  salt: { type: String, required: true },
  courses: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
  isMod: { type: Boolean, default: false },
  joinDate: { type: Date, default: Date.now },
  blacklisted: { type: Boolean, default: false }
});
userSchema.plugin(uniqueValidator);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.passHash === hash;
};

//export default mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);