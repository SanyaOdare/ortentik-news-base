const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const endpointsData = require('../endpoints.json');
const { expect } = require('@jest/globals');
// const { test, expect } = require('@jest/globals');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

xdescribe('GET /api/topics', () => {
  test('200 - responds with an array of topic objects', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body }) => {
      const { topics } = body;
      expect(topics.length).toBe(3);
      topics.forEach((topic) => {
        console.log(topic);        
        expect(typeof topic.description).toBe('string');
        expect(typeof topic.slug).toBe('string');
      })
    });
  });
});

xdescribe('GET /api', () => {
  test('200 - responds with endpoint JSON data', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toEqual(endpointsData);
      });
  });
});

describe.only('GET /api/articles/:article_id', () => {
  test('200 - responds with an article object which have selected properties', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({ body }) => {
      const { data } = body;
      console.log('here in the TEST is--->>>', data);
      expect(typeof data).toBe('object')
      expect(typeof data.author).toBe('string');
      expect(typeof data.title).toBe('string');
      expect(typeof data.article_id).toBe('number');
      expect(typeof data.body).toBe('string');
      expect(typeof data.topic).toBe('string');
      expect(typeof data.created_at).toBe('string');
      expect(typeof data.votes).toBe('number');
      expect(typeof data.article_img_url).toBe('string');
    })
  })

  test('404 - responds with an error when article_id doesn\'t exist', () => {
    return request(app)    
    .get('/api/articles/12/article')
    .expect(404)
    .then(({ body }) => {
      const { message } = body
      expect(message).toBe('article_id not found');
    });
  });
})
