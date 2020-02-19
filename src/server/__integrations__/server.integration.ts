import request from 'supertest';
import { app, server } from '../index';

jest.mock('uuidv4', () => ({
  uuid: () => '0123456789',
}));

jest.mock('../utils/database');

afterAll(() => {
  server.close();
});

test('Client middleware works', async () => {
  const response = await request(app.callback()).get('/').send();
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

test('Auth middleware sets a cookie', async () => {
  const response = await request(app.callback()).get('/').send();
  expect(response.status).toBe(200);
  expect(response.res.headers['set-cookie']).toMatchSnapshot();
  expect(response.text).toMatchSnapshot();
});

describe('Items middleware', () => {
  // TODO: use configured local database to simulate add, remove & update
  test.skip('gets items', async () => {
    const response = await request(app.callback())
    .get('/items')
    .set('Cookie', ['userId=0123456789'])
    .send();
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('add an item', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'add',
        item: {
          text: 'hello world'
        }
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('update an item', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'update',
        item: {
          id: 'item-id',
          text: 'hello world',
          checked: true,
        }
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('delete an item', async () => {
    const response = await request(app.callback())
      .post('/items')
      .set('Cookie', ['userId=0123456789'])
      .send({
        action: 'delete',
        item: {
          id: 'item-id'
        }
      });
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });
});
