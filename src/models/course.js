const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Course = new Schema({
    name: { type: String, maxlength: 25 },
    description: { type: String, maxlength: 300 },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String, maxlength: 255 },
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

Course.plugin(mongooseDelete, {
   deletedAt : true,
   overrideMethods: 'all',
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
