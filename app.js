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

app.use((req, res, next) => {
  res.status(404).send({message: 'article_id not found'});
});

// middleware handle error here
app.use((req, res, next) => {
  res.status(500).send({message: 'Internal Server Error'});
});

module.exports = app;