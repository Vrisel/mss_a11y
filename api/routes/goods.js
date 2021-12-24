const { Router } = require('express');
const router = Router();

const db = require('../db');
// const goodsController = require('../controllers/goodsController');

router.route('/list').get(function (req, res) {
  return res.send(db.goodsList());
});
router.route('/:id').get(function (req, res) {
  return res.send(db.goodsDetails(req.params.id));
});

module.exports = router;
