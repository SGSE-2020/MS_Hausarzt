
const app = require('../index');
const request = require('supertest');

it('check if test responds', async done => {
    const response = await request(app).get('/test')
    
    expect(response.status).toBe(200)
    done()
});

/*
it('check if krankheitsstatistik responds', async done => {
    const response = await request(app).get('/api/krankheitsstatistik')
    
    expect(response.status).toBe(200)
    done()
});

it('check if patienten/all responds', async done => {
    const response = await request(app).get('/api/patienten/all')
    
    expect(response.status).toBe(200)
    done()
});

it('check if patientenakte with id 3 responds', async done => {
    const response = await request(app).get('/api/patientenakte/3')
    
    expect(response.status).toBe(200)
    done()
});
*/