const db = require('../db/connection');

function fetchArticles() {
  return db
  .query(`SELECT * FROM articles`)
  .then((data) => {  
    const articles = data.rows
    return articles
  });
}

function fetchArticlesById(id) {
  return db
  .query(`SELECT * FROM articles WHERE article_id=$1;`, [id])
  .then(({ rows }) => {    
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: 'article_id not found' })
    }
    return rows[0]
  })
}

module.exports = { fetchArticles, fetchArticlesById };