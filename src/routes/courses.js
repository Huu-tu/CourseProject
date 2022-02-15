const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');

//newsController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/update', courseController.update);
router.post('/handle-form-actions', courseController.handleFormActions)
router.post('/trash-form-action', courseController.trashFormActions)
router.get('/:slug', courseController.show);
router.put('/:id', courseController.updateCourse);
router.patch('/:id/restore', courseController.restoreCourse);
router.delete('/:id', courseController.deleteCourse);
router.delete('/:id/force', courseController.forceDeleteCourse);
router.get('/search/name', courseController.searchCourse);

module.exports = router;
