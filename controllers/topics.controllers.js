const { fetchTopics } = require('../models/topics.models')

function getTopics(req, res, next) {
  // console.log(req.query);
  fetchTopics().then((topics) => {
    res.status(200).send({topics: topics});
  }).catch((err) => {
    // console.log(err);
    next(err)
  });
}

module.exports = { getTopics };