const Course = require('../models/course');
const { error } = require('lint-staged/lib/figures');

class courseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course });
      })
      .catch(next);
  }

  //[GET] /course/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //[POST] /course/store
  store(req, res, next) {
    const formData = req.body;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch((error) => {
        res.send('Failed save');
      });
  }

  //[GET] /course/:id/update
  update(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/update', {
          course,
        }),
      )
      .catch(next);
  }

  //[PUT] /course/:id
  updateCourse(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  //[DELETE] /course/:id
  deleteCourse(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /course/:id/forceDeleteCourse
  forceDeleteCourse(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[GET] /course/:name
  searchCourse(req, res) {
    const { term } = req.query;

  }

  //[PATCH] /courses/:id/restore
  restoreCourse(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[POST] /courses/handle-form-action
  //Doc doc cua mongodb $in
  handleFormActions(req,res,next){
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({
          message: 'Action is invalid'
        })
    }
  }

  //[POST] /courses/trash-form-action
  trashFormActions(req,res,next){
    switch (req.body.action){
      case 'restore':
        Course.restore({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'delete-forever':
        Course.deleteOne({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        req.json({
          message: 'Action is invalid'
        })
    }
  }
}

module.exports = new courseController();
