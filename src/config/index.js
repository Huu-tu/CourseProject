const mongoose = require('mongoose');

async function connect(uri, callback) {
  try {
    await mongoose.connect('mongodb://localhost:27017/course_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect successfully');
  } catch (e) {
    console.log('Connect Failed');
  }
}

module.exports = { connect };
