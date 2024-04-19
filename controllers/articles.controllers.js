const { fetchArticles, fetchArticlesById } = require('../models/articles.models');

function getArticles(req, res, next) {
  fetchArticles(articles).then((articles) => {
    res.status(200).send({ articles })
  }).catch((err) => {
    next(err)
  });
}

function getArticlesById(req, res, next) {
  const { article_id } = req.params;
  fetchArticlesById(article_id).then((data) => { 
    res.status(200).send({ data })
  }).catch((err) => {
    next(err)
  });
}

module.exports = { getArticles, getArticlesById };