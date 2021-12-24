const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const brand = require('./routes/brand');
const category = require('./routes/category');
const goods = require('./routes/goods');
app.use('/brand', brand);
app.use('/category', category);
app.use('/goods', goods);

module.exports = {
  path: '/api',
  handler: app,
};
