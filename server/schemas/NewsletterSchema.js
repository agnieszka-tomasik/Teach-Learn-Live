const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
});
newsletterSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('newsletter', newsletterSchema);
