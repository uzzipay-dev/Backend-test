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

    const createdCategory1 = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test 1'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const createdCategory2 = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test 2'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 1',
        price: 1000,
        categories_ids: [createdCategory1.body.id, createdCategory2.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 2',
        price: 1000,
        categories_ids: [createdCategory1.body.id, createdCategory2.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app).get('/api/v1/products');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(2);
  });
});
