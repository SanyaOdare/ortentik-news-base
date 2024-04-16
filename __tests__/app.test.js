const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const request = require('supertest');

beforeEach(() => {
  // use the setTimeout to resolve tests leaking due to improper teardown
  jest.setTimeout(8000);
  // p = new SUT.PlaywrightFluent();
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('/api/topics', () => {
  test('GET /api/topics that responds with an array of topic objects', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body }) => {

      const { topics } = body;
      expect(topics.length).toBe(3);

      topics.forEach((topic) => {
        expect(typeof topic.description).toBe('string');
        expect(typeof topic.slug).toBe('string');
      })
      console.log(body);      
    })
  })
})