const { fetchTopics } = require('../models/topics-models')

function getTopics(req, res, next) {
  fetchTopics()
  .then((data) => {
    console.log(data);
    res.status(200).send(data);
  })
  .catch((err) => {
    console.log(err);    
  });
}

module.exports = { getTopics };