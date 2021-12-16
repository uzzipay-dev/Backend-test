import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Create product controller', () => {
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

  it('should be possible to create a new product', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const response = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test',
        price: 1000,
        category: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('product test');
  });

  it('should not be possible to create a product without a valid token', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 2',
        price: 1000,
        category: 'category test'
      })
      .set({
        Authorization: `Bearer token`
      });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid token');
  });
});
