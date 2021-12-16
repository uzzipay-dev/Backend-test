import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('List products controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('123456789', 8);

    await connection.query(`
    INSERT INTO users(id, name, email, password, is_admin, created_at)
    Values('${id}', 'admin', 'admin@test.com', '${password}', true, 'now()' )
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should list all products', async () => {
    const createSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = createSession.body;

    await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 1',
        price: 1000,
        category: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 2',
        price: 1000,
        category: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app).get('/api/v1/products');

    expect(response.body).toHaveLength(2);
    expect(response.status).toEqual(200);
  });
});
