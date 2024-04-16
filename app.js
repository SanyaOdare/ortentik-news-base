const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers');
const endpoints = require('./endpoints.json');

app.get('/api/topics', getTopics);

app.get('/api', (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

// middleware handle error here
app.use((req, res, next) => {
  res.status(500).send({message: 'Internal Server Error'});
});

module.exports = app;
