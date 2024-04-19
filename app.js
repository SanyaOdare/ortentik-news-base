const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers');
const { getArticles, getArticlesById } = require('./controllers/articles.controllers');
const endpoints = require('./endpoints.json');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get('/api/articles/', getArticles);

app.get('/api/articles/:article_id', getArticlesById);

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ message: 'Bad request' });
  } else if (err.status && err.message) {
    res.status(err.status).send({message: err.message});
  } else {
    next(err);
  }
});

// middleware handle error here
app.use((err, req, res, next) => {
  res.status(500).send({message: 'Internal Server Error'});
});

module.exports = app;