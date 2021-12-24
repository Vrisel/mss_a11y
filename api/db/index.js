const path = require('path');
const Sqlite = require('better-sqlite3');
const db = new Sqlite(path.resolve('./api/db/musinsa.db'), {
  fileMustExist: true,
  verbose: console.log,
});

function categoryList() {
  return db.prepare('SELECT * FROM [Category]').all();
}
function categoryDetails(id) {
  return db.prepare('SELECT * FROM [Category] WHERE id = ?').get(id);
}

function brandList() {
  return db.prepare('SELECT * FROM [Brand]').all();
}
function brandDetails(id) {
  return db.prepare('SELECT * FROM [Brand] WHERE id = ?').get(id);
}

function goodsList(brand = '*', category = '*') {
  if (brand !== '*' && category !== '*') {
    return db
      .prepare('SELECT * FROM [Goods] WHERE Brand = ? AND Category = ?')
      .all(brand, category);
  } else {
    return [];
  }
}
function goodsDetails(id) {
  return db.prepare('SELECT * FROM [Goods] WHERE id = ?').get(id);
}

module.exports = {
  categoryList,
  categoryDetails,
  brandList,
  brandDetails,
  goodsList,
  goodsDetails,
};
