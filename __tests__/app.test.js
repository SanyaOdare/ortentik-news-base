const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const endpointsData = require('../endpoints.json');
const { expect } = require('@jest/globals');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('GET /api/topics', () => {
  test('200 - responds with an array of topic objects', () => {
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
    });
  });
});

describe('GET /api', () => {
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

describe('GET /api/articles/:article_id', () => {
  test('200 - responds with an article object which have selected properties', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({ body: { data }}) => {
      expect(data).toEqual({
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: "mitch",
        author: 'butter_bridge',
        body: "I find this existence challenging",
        votes: 100,
        created_at: '2020-07-09T20:11:00.000Z',
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
      })
    })
  })

  test('400 bad request- responds with an error when article id is not a number', () => {
    return request(app)
    .get('/api/articles/richardB')
    .expect(400)
    .then(({ body }) => {
      const { message } = body      
      expect(message).toBe('Bad request')
    })
  })

  test('404 - responds with an error when article id doesn\'t exist', () => {
    return request(app)    
    .get('/api/articles/9999')
    .expect(404)
    .then(({ body }) => {
      const { message } = body
      expect(message).toBe('article_id not found');
    });
  });  
})
