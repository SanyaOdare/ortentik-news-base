const db = require('../db/connection');

function fetchTopics() {
  return db
    .query(`SELECT * FROM topics`)
    .then((data) => {
      const topics = data.rows;
      // console.log(topics, '<---- in database');
      return topics;
  });
}

module.exports = { fetchTopics };