
const app = require('../index');
const request = require('supertest');

it('gets the test endpoint', async done => {
    const response = await request(app).get('/test')
    
    expect(response.status).toBe(200)
    expect(response.text).toBe("test message")
    done()
});