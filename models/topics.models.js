const db = require('../db/connection');

function fetchTopics() {
  return db
    .query(`SELECT * FROM topics`)
    .then((data) => {
      const topics = data.rows;
      return topics;
  });
}

module.exports = { fetchTopics };