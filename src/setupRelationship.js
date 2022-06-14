const setupRelationship = (db) => {
  // ONE CATEGORY  -- MANY PRODUCTS
  db.authors.hasMany(db.books, { onDelete: 'cascade' });
  db.books.belongsTo(db.authors, { onDelete: 'cascade' });
  // ONE BOOK  -- MANY REVIEWS
  db.books.hasMany(db.reviews, { onDelete: 'cascade' });
  db.reviews.belongsTo(db.books, { onDelete: 'cascade' });
};

module.exports = setupRelationship;
