import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uname: {type: String, required:true},
  passHash: {type: String, required:true},
  courses: {type:[String], default:[]},
  isAdmin: {type:Boolean, default:false}
});

export default mongoose.model('users', userSchema);