import request from 'supertest';
import { app, server } from '../index';

jest.mock('uuidv4', () => ({
  uuid: () => '0123456789',
}));

afterAll(() => {
  server.close();
});

test('Client middleware works', async () => {
  const response = await request(app.callback()).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

// TODO: figure out why supertest isnt getting cookie 
test.skip('Auth middleware sets a cookie', async () => {
  const response = await request(app.callback())
    .get('/')
    .expect('set-cookie', 'userId=0123456789; Path=/');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});


describe('Items middleware', () => {
  test('gets items', async () => {
    const response = await request(app.callback())
      .get('/items')
      .set('Cookie', ['userId=0123456789']);
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('adds items', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'add',
        items: ['posted-item-0', 'posted-item-1']
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('updates items', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'update',
        items: ['posted-item-0', 'posted-item-1']
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('deletes items', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'delete',
        items: ['posted-item-0', 'posted-item-1']
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });
});
