const Course = require('../models/course');
const { error } = require('lint-staged/lib/figures');
const {Promise} = require("mongoose");

class meController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    //Bat dong bo
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, deleteCount]) =>
        res.render('me/storedCourses', {
          deleteCount,
          courses
        })
      )
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deleteCount) =>{
    //     console.log(deleteCount);
    //   })
    //   .catch(() =>{});
    //
    // Course.find({})
    //   .then((courses) => res.render('me/storedCourses', { courses }))
    //   .catch(next);
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => res.render('me/trashCourses', { courses }))
      .catch(next);
  }
}

module.exports = new meController();
