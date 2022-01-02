import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Create category controller', () => {
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

  it('should be able to create a new category', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const response = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('category test');
  });

  it('should not be able to create a category without a valid token', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test'
      })
      .set({
        Authorization: `Bearer token`
      });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid token');
  });

  it('should not be able to create a category if name already exist', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const response = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('category already exists');
  });
});
