const { Router } = require('express');
const router = Router();

const db = require('../db');
// const categoryController = require('../controllers/categoryController');

router.route('/list').get(function (req, res) {
  return res.send(db.categoryList());
});
router.route('/:id').get(function (req, res) {
  return res.send(db.categoryDetails(req.params.id));
});

module.exports = router;
