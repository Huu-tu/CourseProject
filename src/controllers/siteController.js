const Course = require('../models/course');
const { error } = require('lint-staged/lib/figures');

class siteController {
  //[GET] /HomePage
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        // courses = courses.map(course => course.toObject())
        res.render('home', {
          courses: courses,
        });
      })
      .catch(next);
  }

  //[GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new siteController();
