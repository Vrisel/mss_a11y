const { Router } = require('express');
const router = Router();

const db = require('../db');
// const brandController = require('../controllers/brandController');

router.route('/list').get(function (req, res) {
  return res.send(db.brandList());
});
router.route('/:id').get(function (req, res) {
  return res.send(db.brandDetails(req.params.id));
});

module.exports = router;
